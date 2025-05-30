import {Controller, Get} from '@nestjs/common'
import {ApiTags, ApiOperation} from '@nestjs/swagger'
import {
	HealthCheckService,
	HealthCheck,
	MikroOrmHealthIndicator,
	HealthCheckResult,
	HealthIndicatorFunction,
} from '@nestjs/terminus'
import {RedisHealthIndicator} from '../indicators/redis.health'
import {SkipThrottle} from '@nestjs/throttler'

/**
 * Controller for health check endpoints
 */
@ApiTags('Health')
@Controller('health')
@SkipThrottle() // Health checks should not be rate limited
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private mikroOrmHealthIndicator: MikroOrmHealthIndicator,
		private redisHealthIndicator: RedisHealthIndicator,
	) {}

	/**
	 * Check overall health status of the application
	 * @returns Health check result including database and Redis status
	 */
	@Get()
	@HealthCheck()
	@ApiOperation({summary: 'Get health status'})
	async check(): Promise<HealthCheckResult> {
		return this.health.check([
			(() =>
				this.mikroOrmHealthIndicator.pingCheck(
					'database',
				)) as HealthIndicatorFunction,
			(() =>
				this.redisHealthIndicator.isHealthy(
					'redis',
				)) as HealthIndicatorFunction,
		])
	}
}
