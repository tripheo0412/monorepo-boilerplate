import {Test, TestingModule} from '@nestjs/testing'
import {CacheService} from '../services/cache.service'
import {CACHE_MANAGER} from '@nestjs/cache-manager'

describe('CacheService', () => {
	let service: CacheService

	const mockCacheManager = {
		get: jest.fn(),
		set: jest.fn(),
		del: jest.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CacheService,
				{
					provide: CACHE_MANAGER,
					useValue: mockCacheManager,
				},
			],
		}).compile()

		service = module.get<CacheService>(CacheService)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('get', () => {
		it('should get value from cache', async () => {
			const key = 'test-key'
			const value = {data: 'test'}
			mockCacheManager.get.mockResolvedValue(value)

			const result = await service.get(key)

			expect(result).toEqual(value)
			expect(mockCacheManager.get).toHaveBeenCalledWith(key)
		})

		it('should return undefined for non-existent key', async () => {
			mockCacheManager.get.mockResolvedValue(undefined)

			const result = await service.get('non-existent')

			expect(result).toBeUndefined()
		})
	})

	describe('set', () => {
		it('should set value in cache without TTL', async () => {
			const key = 'test-key'
			const value = {data: 'test'}

			await service.set(key, value)

			expect(mockCacheManager.set).toHaveBeenCalledWith(key, value, undefined)
		})

		it('should set value in cache with TTL', async () => {
			const key = 'test-key'
			const value = {data: 'test'}
			const ttl = 5000

			await service.set(key, value, ttl)

			expect(mockCacheManager.set).toHaveBeenCalledWith(key, value, ttl)
		})
	})

	describe('delete', () => {
		it('should delete value from cache', async () => {
			const key = 'test-key'

			await service.delete(key)

			expect(mockCacheManager.del).toHaveBeenCalledWith(key)
		})
	})

	describe('reset', () => {
		it('should warn about reset limitation', async () => {
			const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

			await service.reset()

			expect(consoleWarnSpy).toHaveBeenCalledWith(
				'Cache reset not fully supported in cache-manager v6',
			)
			consoleWarnSpy.mockRestore()
		})
	})

	describe('getMany', () => {
		it('should get multiple values from cache', async () => {
			const keys = ['key1', 'key2', 'key3']
			const values: Record<string, string | undefined> = {
				key1: 'value1',
				key2: 'value2',
				key3: undefined,
			}

			mockCacheManager.get
				.mockResolvedValueOnce(values.key1)
				.mockResolvedValueOnce(values.key2)
				.mockResolvedValueOnce(values.key3)

			const result = await service.getMany(keys)

			expect(result).toEqual(values)
			expect(mockCacheManager.get).toHaveBeenCalledTimes(3)
		})
	})

	describe('setMany', () => {
		it('should set multiple values in cache', async () => {
			const entries = {
				key1: 'value1',
				key2: 'value2',
			}
			const ttl = 5000

			await service.setMany(entries, ttl)

			expect(mockCacheManager.set).toHaveBeenCalledWith('key1', 'value1', ttl)
			expect(mockCacheManager.set).toHaveBeenCalledWith('key2', 'value2', ttl)
			expect(mockCacheManager.set).toHaveBeenCalledTimes(2)
		})
	})

	describe('deleteMany', () => {
		it('should delete multiple values from cache', async () => {
			const keys = ['key1', 'key2']

			await service.deleteMany(keys)

			expect(mockCacheManager.del).toHaveBeenCalledWith('key1')
			expect(mockCacheManager.del).toHaveBeenCalledWith('key2')
			expect(mockCacheManager.del).toHaveBeenCalledTimes(2)
		})
	})

	describe('has', () => {
		it('should return true if key exists', async () => {
			mockCacheManager.get.mockResolvedValue('value')

			const result = await service.has('key')

			expect(result).toBe(true)
		})

		it('should return false if key does not exist', async () => {
			mockCacheManager.get.mockResolvedValue(undefined)

			const result = await service.has('key')

			expect(result).toBe(false)
		})
	})
})
