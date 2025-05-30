import {Test, TestingModule} from '@nestjs/testing'
import {AuthController} from '../controllers/auth.controller'
import {AuthService} from '../services/auth.service'
import {LoginDto} from '../dto/login.dto'
import {RegisterDto} from '../dto/register.dto'

describe('AuthController', () => {
	let controller: AuthController
	let authService: AuthService

	const mockUser = {
		id: '123',
		email: 'test@example.com',
		firstname: 'John',
		lastname: 'Doe',
		password: 'hashedPassword',
		isDeleted: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	}

	const mockAuthService = {
		register: jest.fn(),
		login: jest.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile()

		controller = module.get<AuthController>(AuthController)
		authService = module.get<AuthService>(AuthService)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('register', () => {
		/**
		 * Test successful user registration
		 */
		it('should register a new user successfully', async () => {
			const registerDto: RegisterDto = {
				email: 'test@example.com',
				password: 'Password123!',
				firstname: 'John',
				lastname: 'Doe',
				agreedToTerms: true,
			}

			mockAuthService.register.mockResolvedValue(mockUser)

			const result = await controller.register(registerDto)

			expect(authService.register).toHaveBeenCalledWith(registerDto)
			expect(result).toEqual({
				message: 'User successfully registered',
				user: {
					id: mockUser.id,
					email: mockUser.email,
					firstname: mockUser.firstname,
					lastname: mockUser.lastname,
				},
			})
		})

		/**
		 * Test registration failure
		 */
		it('should handle registration errors', async () => {
			const registerDto: RegisterDto = {
				email: 'test@example.com',
				password: 'Password123!',
				firstname: 'John',
				lastname: 'Doe',
				agreedToTerms: true,
			}

			mockAuthService.register.mockRejectedValue(
				new Error('User already exists'),
			)

			await expect(controller.register(registerDto)).rejects.toThrow(
				'User already exists',
			)
		})
	})

	describe('login', () => {
		/**
		 * Test successful login
		 */
		it('should login user successfully', async () => {
			const loginDto: LoginDto = {
				email: 'test@example.com',
				password: 'Password123!',
			}

			const mockToken = 'mock-jwt-token'
			mockAuthService.login.mockResolvedValue({accessToken: mockToken})

			const result = await controller.login(loginDto)

			expect(authService.login).toHaveBeenCalledWith(
				loginDto.email,
				loginDto.password,
			)
			expect(result).toEqual({
				access_token: mockToken,
			})
		})

		/**
		 * Test login failure with invalid credentials
		 */
		it('should handle login errors', async () => {
			const loginDto: LoginDto = {
				email: 'test@example.com',
				password: 'wrongpassword',
			}

			mockAuthService.login.mockRejectedValue(new Error('Invalid credentials'))

			await expect(controller.login(loginDto)).rejects.toThrow(
				'Invalid credentials',
			)
		})
	})

	/**
	 * Test controller instantiation
	 */
	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
