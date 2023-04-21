FROM node:16 AS base
USER $user
RUN mkdir -p /usr/src/app
RUN mkdir /usr/src/app/logs
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY --chown=node:node ./prisma/ .

################
# Dependencies #
################
FROM base AS dependencies
RUN yarn install --production=false --frozen-lockfile && yarn cache clean

#######################
# Pruned Dependencies #
#######################
FROM dependencies AS pruned-dependencies
RUN npm prune --omit=dev --legacy-peer-deps

###########
# Builder #
###########
FROM base AS builder
COPY --from=dependencies --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn build

##############
# Production #
##############
FROM base AS production
COPY --from=pruned-dependencies --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist
ENV NODE_ENV production

RUN touch .env
RUN chown node:node .env

USER node
EXPOSE 80
CMD printf "%s" "$ENV_FILE" > .env && yarn start