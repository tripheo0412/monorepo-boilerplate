import {Injectable, Inject} from '@nestjs/common'
import {CACHE_MANAGER, Cache} from '@nestjs/cache-manager'

/**
 * Service for managing cache operations
 */
@Injectable()
export class CacheService {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	/**
	 * Get a value from cache
	 * @param key Cache key
	 * @returns Cached value or undefined
	 */
	async get<T>(key: string): Promise<T | undefined> {
		return await this.cacheManager.get<T>(key)
	}

	/**
	 * Set a value in cache
	 * @param key Cache key
	 * @param value Value to cache
	 * @param ttl Time to live in milliseconds (optional)
	 */
	async set<T>(key: string, value: T, ttl?: number): Promise<void> {
		await this.cacheManager.set(key, value, ttl)
	}

	/**
	 * Delete a value from cache
	 * @param key Cache key
	 */
	async delete(key: string): Promise<void> {
		await this.cacheManager.del(key)
	}

	/**
	 * Clear all cache entries
	 * Note: cache-manager v6 doesn't have a built-in reset method
	 * This is a workaround that may not clear all keys in Redis
	 */
	async reset(): Promise<void> {
		// cache-manager v6 doesn't expose a reset method
		// Individual keys need to be deleted manually
		console.warn('Cache reset not fully supported in cache-manager v6')
	}

	/**
	 * Get multiple values from cache
	 * @param keys Array of cache keys
	 * @returns Object with keys and their values
	 */
	async getMany<T>(keys: string[]): Promise<Record<string, T | undefined>> {
		const result: Record<string, T | undefined> = {}

		// 1. Process each key individually
		for (const key of keys) {
			result[key] = await this.get<T>(key)
		}

		return result
	}

	/**
	 * Set multiple values in cache
	 * @param entries Object with keys and values
	 * @param ttl Time to live in milliseconds (optional)
	 */
	async setMany<T>(entries: Record<string, T>, ttl?: number): Promise<void> {
		// 1. Process each entry individually
		for (const [key, value] of Object.entries(entries)) {
			await this.set(key, value, ttl)
		}
	}

	/**
	 * Delete multiple values from cache
	 * @param keys Array of cache keys to delete
	 */
	async deleteMany(keys: string[]): Promise<void> {
		// 1. Process each key individually
		for (const key of keys) {
			await this.delete(key)
		}
	}

	/**
	 * Check if a key exists in cache
	 * @param key Cache key
	 * @returns True if key exists
	 */
	async has(key: string): Promise<boolean> {
		const value = await this.get(key)
		return value !== undefined
	}
}
