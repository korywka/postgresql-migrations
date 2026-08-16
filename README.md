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

Arguments:
  name                migration name

Options:
  -d, --dir <string>  path to migrations directory (default: migrations)
  -h, --help          display help for command
```

## Run migrations

```
Usage: pg-migrate run [options]

Options:
	--url <string> 				env variable or value of db connection url (default: DATABASE_URL)
	--user <string> 			env variable or value of db user (default: PGUSER)
	--password <string> 	env variable or value of db password (default: PGPASSWORD)
	--host <string> 			env variable or value of db host (default: PGHOST)
	--port <string> 			env variable or value of db port (default: PGPORT)
	--database <string> 	env variable or value of db name (default: PGDATABASE)
  -d, --dir <string>    path to migrations directory (default: migrations)
  -t, --table <string>  migrations history table name (default: migrations)
  -h, --help            display help for command
```
