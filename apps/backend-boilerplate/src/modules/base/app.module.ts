import {Module} from '@nestjs/common'
import {DatabaseModule} from '@/configs/database.config'
import {AuthModule} from '../auth/auth.module'
import {AppController} from './controllers/app.controller'
import {AppService} from './services/app.service'
import {envSchema} from '@/configs/env-schema'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {HealthModule} from '../health/health.module'
import {CacheModule} from '../cache/cache.module'
import {ThrottlerModule} from '@nestjs/throttler'
import {APP_GUARD} from '@nestjs/core'
import {ThrottlerGuard} from '@nestjs/throttler'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: envSchema,
		}),
		DatabaseModule,
		AuthModule,
		HealthModule,
		CacheModule,
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => [
				{
					ttl: configService.get('THROTTLE_TTL', 60) * 1000, // Convert to milliseconds
					limit: configService.get('THROTTLE_LIMIT', 10),
				},
			],
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
