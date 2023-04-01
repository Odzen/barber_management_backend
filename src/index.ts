import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import app from './server'
import { __prod__ } from './constants'

const httpServer = http.createServer(app)
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
const orm = new PrismaClient()

const port = parseInt(process.env.PORT) || 4000

console.log('Connection to DB: ', process.env.DATABASE_URI)
console.log('Production: ', __prod__)

export default async function start() {
	// Same ApolloServer initialization as before, plus the drain plugin.
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => ({ orm, user: req.user }),
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		// cache: 'bounded',
	})

	// More required logic for integrating with Express
	await server.start()
	server.applyMiddleware({
		app,
		path: '/graphql',
		cors: false,
	})

	// Modified server startup
	await new Promise<void>((resolve) =>
		httpServer.listen({ port: port }, resolve)
	)
	console.log(
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
	)
}