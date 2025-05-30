import {Test, TestingModule} from '@nestjs/testing'
import {AuthGuard} from '../guards/auth.guard'
import {AuthService} from '../services/auth.service'
import {ExecutionContext, UnauthorizedException} from '@nestjs/common'

/**
 * Helper to create execution context with authorization header
 */
const createContext = (auth?: string): ExecutionContext => {
	const request = {headers: {authorization: auth}}
	return {
		switchToHttp: () => ({
			getRequest: () => request,
		}),
	} as unknown as ExecutionContext
}

describe('AuthGuard', () => {
	let guard: AuthGuard

	const mockAuthService = {
		validateToken: jest.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthGuard,
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile()

		guard = module.get<AuthGuard>(AuthGuard)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('allows valid token', async () => {
		const mockPayload = {sub: '123', email: 'test@example.com'}
		mockAuthService.validateToken.mockResolvedValue(mockPayload)

		const ctx = createContext('Bearer valid-token')
		const result = await guard.canActivate(ctx)

		expect(result).toBe(true)
		expect(mockAuthService.validateToken).toHaveBeenCalledWith('valid-token')
		expect(ctx.switchToHttp().getRequest()['user']).toEqual(mockPayload)
	})

	it('throws on missing authorization header', async () => {
		const ctx = createContext()

		await expect(guard.canActivate(ctx)).rejects.toThrow(
			new UnauthorizedException('No token provided'),
		)
		expect(mockAuthService.validateToken).not.toHaveBeenCalled()
	})

	it('throws on invalid token format', async () => {
		const ctx = createContext('InvalidFormat token')

		await expect(guard.canActivate(ctx)).rejects.toThrow(
			new UnauthorizedException('No token provided'),
		)
		expect(mockAuthService.validateToken).not.toHaveBeenCalled()
	})

	it('throws on invalid token', async () => {
		mockAuthService.validateToken.mockRejectedValue(new Error('Invalid token'))

		const ctx = createContext('Bearer invalid-token')

		await expect(guard.canActivate(ctx)).rejects.toThrow(
			new UnauthorizedException('Invalid token'),
		)
		expect(mockAuthService.validateToken).toHaveBeenCalledWith('invalid-token')
	})
})
