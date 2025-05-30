import {Injectable} from '@nestjs/common'
import {
	HealthIndicator,
	HealthIndicatorResult,
	HealthCheckError,
} from '@nestjs/terminus'
import {ConfigService} from '@nestjs/config'
import Redis from 'ioredis'

/**
 * Health indicator for Redis connection
 */
@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
	private redis: Redis

	constructor(private configService: ConfigService) {
		super()

		const redisHost = this.configService.get('REDIS_HOST', 'localhost')
		const redisPort = this.configService.get('REDIS_PORT', 6379)

		this.redis = new Redis({
			host: redisHost,
			port: redisPort,
			lazyConnect: true,
			retryStrategy: (): null => null, // Disable auto-retry for health checks
		})
	}

	/**
	 * Check Redis connection health
	 * @param key Health check key
	 * @returns Health check result
	 */
	async isHealthy(key: string): Promise<HealthIndicatorResult> {
		try {
			// 1. Connect to Redis if not connected
			if (this.redis.status !== 'ready') {
				await this.redis.connect()
			}

			// 2. Ping Redis to check connection
			const response = await this.redis.ping()

			// 3. Verify response
			if (response !== 'PONG') {
				throw new Error('Invalid Redis response')
			}

			return this.getStatus(key, true, {status: 'connected'})
		} catch (error) {
			throw new HealthCheckError(
				'Redis health check failed',
				this.getStatus(key, false, {
					status: 'disconnected',
					error: error.message,
				}),
			)
		}
	}

	/**
	 * Clean up Redis connection on module destroy
	 */
	async onModuleDestroy(): Promise<void> {
		if (this.redis) {
			await this.redis.quit()
		}
	}
}
