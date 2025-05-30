import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import request from 'supertest'
import {AppModule} from '../app.module'

describe('Rate Limiting (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	afterEach(async () => {
		await app.close()
	})

	it('should rate limit requests to regular endpoints', async () => {
		// Make requests up to the limit
		for (let i = 0; i < 10; i++) {
			const response = await request(app.getHttpServer()).get('/')
			expect(response.status).toBe(200)
			expect(response.headers['x-ratelimit-limit']).toBe('10')
			expect(response.headers['x-ratelimit-remaining']).toBe(String(9 - i))
		}

		// The 11th request should be rate limited
		const response = await request(app.getHttpServer()).get('/')
		expect(response.status).toBe(429)
		expect(response.body.message).toContain('Too Many Requests')
	})

	it('should not rate limit health check endpoint', async () => {
		// Make many requests to health endpoint
		for (let i = 0; i < 20; i++) {
			const response = await request(app.getHttpServer()).get('/health')
			expect(response.status).toBe(200)
			// Health endpoint should not have rate limit headers
			expect(response.headers['x-ratelimit-limit']).toBeUndefined()
		}
	})
})
