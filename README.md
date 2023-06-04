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
$ docker compose -f docker-compose-development.yml up
```

To stop and remove containers, networks

```bash
$ docker compose -f docker-compose-development.yml down
```

## Database instructions

Every time you run docker compose up, it will create a file pgdata which is the volume for the database. So it doesn't matter if you stop the containers, the data will be saved in the volume, and when you run docker compose up again, it will use the data from the volume. If you delete the pgdata file, it will create a new database from scratch, and you will lose all the data.

## Environment variables

Be sure to create a .env file in the root of the project with the variables shown in the .env.example file. There are some variables already set in the .env.example file to match the docker-compose.yml file. Since docker compose is only used for development, you don't have to worry

## Recommended VSCode extensions

We have a [.prettierrc](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [.eslintrc](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) file in the root of the project. So we strongly recommend you to install Prettier and ESLint extensions in VSCode to format your code automatically on save and to avoid any linting errors.

## CI/CD

We are using Github Actions for CI/CD. You can find the workflow file in the .github/workflows folder. We are using the following actions:

1. [sonar.yml](https://github.com/Odzen/barber_management_backend/blob/main/.github/workflows/sonar.yml) - It runs SonarCloud analysis on every push to the main branch and development branch. This uses SonarCloud to analyze the code and find bugs, vulnerabilities, code smells, etc. SonarCloud is also configured to interact with a Lambda function in a AWS that works as a webhook to process the results of the analysis and send them to a Slack channel.

2. [push.yml](https://github.com/Odzen/barber_management_backend/blob/main/.github/workflows/push.yml) - This workflow runs on every push to all branches in the repository. It has serveral jobs that run in parallel:

   - **prettier** - It runs prettier to check if the code is formatted correctly.
   - **lint** - It runs eslint to check if there are any linting errors.
   - **test** - It runs the unit tests using jest.
   - **build** - It builds the app. To check if it compiles and creates the dist folder without errors.

3. [notifications.yml](https://github.com/Odzen/barber_management_backend/blob/main/.github/workflows/notifications.yml) - This action runs on every push to the main branch. It sends a notification to a Slack channel with the purpose of notifying that the main branch has been updated.

4. [deploy.yml](https://github.com/Odzen/barber_management_backend/blob/main/.github/workflows/deploy.yml) - This action runs on every push to the main branch. First it runs all the same checks from the push worflow, prettier, lint, test and build. If all the checks pass, it deploys the app to AWS Elastic Beanstalk, in order to do this, we use the [Elastic Beanstalk CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) that deploys the app using the [.elasticbeanstalk/config.yml](https://github.com/Odzen/barber_management_backend/blob/main/.elasticbeanstalk/config.yml) file. This file has the configuration for the deployment, like the name of the environment, the name of the application, the name of the S3 bucket, etc. The deployment is done using the eb deploy command. If the deploy is successful, a tag is created in the repository with the sha commit.
