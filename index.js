#! /usr/bin/env node

import path from 'node:path';
import fs from 'node:fs/promises';
import 'dotenv/config';
import { Command } from 'commander';
import pg from 'pg';

const DEFAULT_DIRECTORY = 'migrations';
const DEFAULT_TABLE = 'migrations';
const { version } = await fs.readFile('package.json', 'utf8').then((content) => JSON.parse(content));

const program = new Command();

program.name('pg-migrate').description('Simple migrations for node-postgres').version(version);

program
	.command('new')
	.description('Create empty migration file')
	.argument('[name]', 'migration name')
	.option('-d, --dir <string>', 'path to migrations directory', DEFAULT_DIRECTORY)
	.action(async (name, options) => {
		/**
		 * @param {number} number
		 * @param {number} length
		 */
		const pad = (number, length = 2) => String(number).padStart(length, '0');

		//generate unique name for migration
		const date = new Date();
		const suffix = name ? `_${name}` : '';
		const prefix =
			date.getFullYear() +
			pad(date.getMonth() + 1) +
			pad(date.getDate()) +
			pad(date.getHours()) +
			pad(date.getMinutes()) +
			pad(date.getSeconds());
		const filename = `${prefix}${suffix}.sql`;
		await fs.writeFile(path.join(options.dir, filename), '');
	});

program
	.command('run')
	.description('Run migrations')
	.option('--url <string>', 'connection string url', 'DATABASE_URL')
	.option('--user <string>', 'user', 'PGUSER')
	.option('--password <string>', 'password', 'PGPASSWORD')
	.option('--host <string>', 'host', 'PGHOST')
	.option('--port <string>', 'port', 'PGPORT')
	.option('--database <string>', 'database', 'PGDATABASE')
	.option('-d, --dir <string>', 'path to migrations directory', DEFAULT_DIRECTORY)
	.option('-t, --table <string>', 'migrations history table name', DEFAULT_TABLE)
	.action(async (options) => {
		/** @type {pg.ClientConfig} */
		const config = {};
		if (options.user) {
			config.user = process.env[options.user] ?? options.user;
		}
		if (options.password) {
			config.password = process.env[options.password] ?? options.password;
		}
		if (options.host) {
			config.host = process.env[options.host] ?? options.host;
		}
		if (options.database) {
			config.database = process.env[options.database] ?? options.database;
		}
		if (options.user) {
			config.user = process.env[options.user] ?? options.user;
		}
		if (options.url) {
			config.connectionString = process.env[options.url] ?? options.url;
		}

		const client = new pg.Client(config);
		await client.connect();

		try {
			await client.query('BEGIN');
			// prepare table for migrations
			await client.query(`
				CREATE TABLE IF NOT EXISTS ${options.table} (
					file VARCHAR PRIMARY KEY,
					created_at TIMESTAMP DEFAULT NOW()
				)
			`);

			const all = await fs.readdir(options.dir).then((items) => items.filter((item) => item.endsWith('.sql')));

			/** @type {string[]} */
			const existing = await client
				.query(`SELECT * FROM ${options.table}`)
				.then((result) => result.rows.map((r) => r.file));

			// find migration files to execute
			const files = all.filter((file) => !existing.includes(file));

			for (const file of files) {
				const sql = await fs.readFile(path.join(options.dir, file), 'utf8');
				// run migration
				await client.query(sql);
				// update migrations history
				await client.query(`INSERT INTO ${options.table} (file) VALUES ($1)`, [file]);
			}

			await client.query('COMMIT');

			console.log(`Completed with ${files.length} new migrations.`);
		} catch (error) {
			await client.query('ROLLBACK');
			throw error;
		} finally {
			client.end();
		}
	});

program.parse();
