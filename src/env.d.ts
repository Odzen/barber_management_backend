declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string
			JWT_SECRET_KEY: string
			PORT: string
			CORS_ORIGIN: string
		}
	}
}

export {}
