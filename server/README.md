# Server

You can also read in [portuguese](./README-pt-BR.md).

## Initial Steps

There are a few steps to be able to setup the database for this API, first, make sure you have installed:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Then, create a file called `.env`, it will store some settings for the database and the API, using the following command:

```bash
cp .env.example .env
```

After that, use the following command to initialize the database:

```bash
docker-compose up -d postgres
```

Now, your Postgres database will be working and you can
start the API using the `yarn dev' command.

## Managing the database

There are some basic commands in `package.json` that will help you manage the database, they are:

- `yarn typeorm`: This is the basic command, you can use it to perform more complex operations with Typeorm.
- `yarn migration`: Run the pending migrations.
- `yarn add-migration NAME_OF_THE_MIGRATION`: Can be used to create new migrations by detecting the difference between what's in the entities and what's in the database that is connected to the API.
