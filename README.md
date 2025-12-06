# postgresql-migrations

Simple migration tool for [node-postgres](https://github.com/brianc/node-postgres)

```shell
npm i postgresql-migrations
mkdir migrations
npx pg-migrate new
npx pg-migrate run
```

## Create new migration file

```
Usage: pg-migrate new [options] [name]

Create empty migration file

Arguments:
  name                migration name

Options:
  -d, --dir <string>  path to migrations directory (default: "migrations")
  -h, --help          display help for command
```

## Run migrations

```
Usage: pg-migrate run [options] <connection_url>

Run migrations

Arguments:
  connection_url        database connection url (e.g.: postgres://user:password@host:5432/database)

Options:
	--url <string> 				env name or value of database connection url (default env.DATABASE_URL)
	--user <string> 			env name or value of database user (default env.PGUSER)
	--password <string> 	env name or value of database password (default env.PGPASSWORD)
	--host <string> 			env name or value of database host (default env.PGHOST)
	--port <string> 			env name or value of database port (default env.PGPORT)
	--database <string> 	env name or value of name (default env.PGDATABASE)
  -d, --dir <string>    path to migrations directory (default: "migrations")
  -t, --table <string>  migrations history table name (default: "migrations")
  -h, --help            display help for command
```
