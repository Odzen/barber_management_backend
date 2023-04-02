# Barber Managment Backend

## Description

Backend for Barber Managment using:

- Typescript
- Express
- Prisma ORM
- Postgres
- Docker - docker compose
- Jest
- GraphQL

## Installation of dependencies

First, you have to enter to the app folder

```bash
$ yarn install
```

## Running the app

You don't have to install Postgres, Prisma or anything else. Just run the following command and you are good to go.
The first time you run the command, it will take a while to download the docker images.
The `docker compose` up command creates a postgres database, runs the migrations and saves the data in a volume to make it persistent.

```bash
# run backend in development mode
$ docker compose up
```

To stop and remove containers, networks

```bash
$ docker compose down
```

## Database instructions

Every time you run docker compose up, it will create a file pgdata which is the volume for the database. So it doesn't matter if you stop the containers, the data will be saved in the volume, and when you run docker compose up again, it will use the data from the volume. If you delete the pgdata file, it will create a new database from scratch, and you will lose all the data.

## Environment variables

Be sure to create a .env file in the root of the project with the variables shown in the .env.example file. There are some variables already set in the .env.example file to match the docker-compose.yml file. Since docker compose is only used for development, you don't have to worry

## Recommended VSCode extensions

We have a [.prettierrc](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [.eslintrc](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) file in the root of the project. So we strongly recommend you to install Prettier and ESLint extensions in VSCode to format your code automatically on save and to avoid any linting errors.
