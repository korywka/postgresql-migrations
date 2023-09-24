# postgresql-migrations

Simple migrations for [node-postgres](https://github.com/brianc/node-postgres)

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
  -d, --dir <string>    path to migrations directory (default: "migrations")
  -t, --table <string>  migrations history table name (default: "migrations")
  -h, --help            display help for command
```
