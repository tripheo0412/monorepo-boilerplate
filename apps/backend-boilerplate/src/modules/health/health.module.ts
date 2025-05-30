import {Module} from '@nestjs/common'
import {TerminusModule} from '@nestjs/terminus'
import {HealthController} from './controllers/health.controller'
import {RedisHealthIndicator} from './indicators/redis.health'

/**
 * Health check module for monitoring application status
 */
@Module({
	imports: [TerminusModule],
	controllers: [HealthController],
	providers: [RedisHealthIndicator],
})
export class HealthModule {}
