import {SetMetadata} from '@nestjs/common'
import {SkipThrottle} from '@nestjs/throttler'

/**
 * Decorator to skip rate limiting on specific endpoints
 * Re-export from @nestjs/throttler for consistency
 */
export {SkipThrottle}

/**
 * Custom decorator to apply different rate limit settings
 * @param ttl Time window in seconds
 * @param limit Number of requests allowed in the time window
 */
export const Throttle = (
	ttl: number,
	limit: number,
): MethodDecorator & ClassDecorator =>
	SetMetadata('throttle', {ttl: ttl * 1000, limit})
