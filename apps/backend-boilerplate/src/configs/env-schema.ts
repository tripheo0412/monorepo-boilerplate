import * as Joi from 'joi'

/**
 * Schema for environment variables validation.
 */
export const envSchema: Joi.ObjectSchema = Joi.object({
	NODE_ENV: Joi.string().required(),
	APP_PORT: Joi.number().required(),
	POSTGRES_SHOULD_SSL: Joi.string().required(),
	POSTGRES_DEBUG: Joi.string().required(),
	POSTGRES_HOST: Joi.string().required(),
	POSTGRES_PORT: Joi.number().required(),
	POSTGRES_USER: Joi.string().required(),
	POSTGRES_PASSWORD: Joi.string().required(),
	DATABASE_NAME: Joi.string().required(),
	REDIS_HOST: Joi.string().required(),
	REDIS_PORT: Joi.number().required(),
	REDIS_PASSWORD: Joi.string().required(),
	REDIS_SHOULD_SSL: Joi.string().required(),
	// Rate limiting configuration
	THROTTLE_TTL: Joi.number().default(60), // Time window in seconds
	THROTTLE_LIMIT: Joi.number().default(10), // Number of requests per time window
	// JWT configuration
	JWT_SECRET: Joi.string().required(),
	JWT_EXPIRES_IN: Joi.string().default('7d'),
})
