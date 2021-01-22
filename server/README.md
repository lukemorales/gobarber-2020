# Server

You can also read in [portuguese](./README-pt-BR.md).

## Initial Steps

There are a few steps to be able to configure the database in this API, first make sure you have installed it:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

First, create a file called `.env` with the following command:

```bash
cp .env.example .env
```

After that, use the following command to initialize the database:

```bash
docker-compose up -d postgres
```

After that, your Postgres database will be working, and you can
start the API using the `yarn dev' command.

## Managing the database

There are some basic commands in `package.json` that help you to manage the database, they are:

- `yarn typeorm`: This is the basic command, you can use it to perform more complex operations with Typeorm.
- `yarn migration`: Run the pending migrations.
- `yarn add-migration NAME_OF_THE_MIGRATION`: Can be used to create new migrations by detecting the difference between what's in the entities and what's in the database that is connected to the API.
