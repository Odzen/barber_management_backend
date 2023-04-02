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

## Installation

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

## Recommended VSCode extensions

We have a .prettierrc, .eslintrc file in the root of the project. So we strongly recommend you to install Prettier and ESLint extensions in VSCode to format your code automatically on save and to avoid any linting errors.
