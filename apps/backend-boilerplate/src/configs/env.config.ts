import * as dotenv from 'dotenv'

dotenv.config()
/**
 * Global environment configuration used across the application.
 */
export const env = {
	APP: {
		ENV: process.env['NODE_ENV'] || 'local',
		PORT: process.env['APP_PORT'] || 3001,
	},
	DATABASE: {
		POSTGRES: {
			SHOULD_SSL: process.env['POSTGRES_SHOULD_SSL'] || 'false',
			DEBUG: process.env['POSTGRES_DEBUG'] || 'false',
			HOST: process.env['POSTGRES_HOST'] || 'localhost',
			PORT: +process.env['POSTGRES_PORT'] || 5432,
			USER: process.env['POSTGRES_USER'] || 'admin',
			PASSWORD: process.env['POSTGRES_PASSWORD'] || 'admin',
			NAME: process.env['DATABASE_NAME'] || 'app_db',
		},
		REDIS: {
			HOST: process.env['REDIS_HOST'] || 'localhost',
			PORT: +process.env['REDIS_PORT'] || 6379,
			PASSWORD: process.env['REDIS_PASSWORD'] || 'local',
			SHOULD_SSL: process.env['REDIS_SHOULD_SSL'] || 'false',
		},
	},
} as const
