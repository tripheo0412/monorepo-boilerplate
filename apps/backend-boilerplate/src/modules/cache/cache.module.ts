import {Module, Global} from '@nestjs/common'
import {CacheModule as NestCacheModule} from '@nestjs/cache-manager'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {CacheService} from './services/cache.service'

/**
 * Global cache module providing Redis-based caching
 */
@Global()
@Module({
	imports: [
		NestCacheModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const redisHost = configService.get('REDIS_HOST', 'localhost')
				const redisPort = configService.get('REDIS_PORT', 6379)

				// Dynamic imports for ESM compatibility
				const {default: Keyv} = await import('keyv')
				const {default: KeyvRedis} = await import('@keyv/redis')

				const keyvRedis = new KeyvRedis(`redis://${redisHost}:${redisPort}`)
				const keyv = new Keyv({store: keyvRedis})

				return {
					store: keyv as unknown,
					ttl: 60 * 60 * 1000, // 1 hour default TTL in milliseconds
				}
			},
			inject: [ConfigService],
		}),
	],
	providers: [CacheService],
	exports: [CacheService, NestCacheModule],
})
export class CacheModule {}
