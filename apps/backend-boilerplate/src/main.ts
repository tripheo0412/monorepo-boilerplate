import {NestFactory} from '@nestjs/core'
import {AppModule} from './modules/base/app.module'
import {env} from './configs/env.config'
import * as dotenv from 'dotenv'
import {migrate} from './migrate'
import {json} from 'express'
import {ValidationPipe} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {replaceNumberByInteger} from './helpers/json-helper'
import * as fs from 'fs'
import pkgJson from '../package.json'
import * as YAML from 'js-yaml'

async function bootstrap(): Promise<void> {
	dotenv.config()
	await migrate()
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(new ValidationPipe({whitelist: true}))

	const regexVercel = /\.vercel\.app$/
	const corsOrigin: (string | RegExp)[] = ['http://localhost:3000']
	if (env.APP.ENV == 'preview') corsOrigin.push(regexVercel)
	app.enableCors({
		origin: corsOrigin,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
		allowedHeaders: [
			'sentry-trace',
			'baggage',
			'authorization',
			'content-type',
		],
	})
	app.use(json({limit: '10mb'}))

	const config = new DocumentBuilder()
		.setTitle('Backend Boilerplate API')
		.setVersion(pkgJson.version)
		.setDescription(
			'Backend API with rate limiting. Default rate limit: 10 requests per 60 seconds. ' +
				'Rate limit headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset',
		)
		.setContact(
			'Tri Hoang',
			'https://trihoang.xyz/',
			'hoangtri241097@gmail.com',
		)
		.addTag('Authentication', 'Authenticating to API', {
			description: 'Find out more about authentication flow',
			url: 'https://trihoang.xyz/',
		})
		.addTag('Health', 'Health check endpoints')
		.addTag('Application', 'General application endpoints')
		.addServer('http://localhost:3001', 'Local server URL')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	replaceNumberByInteger(document.components.schemas)
	fs.writeFileSync('./backend-boilerplate-api-spec.yaml', YAML.dump(document))
	SwaggerModule.setup('api-document', app, document, {
		customSiteTitle: 'Backend Boilerplate API',
		swaggerOptions: {
			persistAuthorization: true,
		},
	})

	await app.listen(env.APP.PORT)

	const gracefulShutdown = (): void => {
		console.log('Shutting down gracefully...')

		app.close()

		// Force close the server after 5 seconds
		setTimeout(() => {
			console.error(
				'Could not close connections in time, forcefully shutting down',
			)
			process.exit(1)
		}, 2000)
	}

	process.on('SIGTERM', gracefulShutdown)
	process.on('SIGINT', gracefulShutdown)
}
bootstrap()
