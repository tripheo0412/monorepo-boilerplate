import {Test, TestingModule} from '@nestjs/testing'
import {EntityManager} from '@mikro-orm/core'
import {ConflictException, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {AuthService} from '../services/auth.service'
import {UserEntity} from '@/entities/user.entity'
import {RegisterDto} from '../dto/register.dto'

describe('AuthService', () => {
	let service: AuthService

	const mockEntityManager = {
		findOne: jest.fn(),
		create: jest.fn(),
		persistAndFlush: jest.fn(),
	}

	const mockJwtService = {
		signAsync: jest.fn(),
		verifyAsync: jest.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: EntityManager,
					useValue: mockEntityManager,
				},
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
			],
		}).compile()
		service = module.get<AuthService>(AuthService)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('hashPassword should hash password', async () => {
		const hash = await service.hashPassword('password')
		expect(hash).toBeDefined()
		expect(hash).not.toEqual('password')
	})

	it('validatePassword should return true for valid password', async () => {
		const hash = await service.hashPassword('secret')
		const result = await service.validatePassword('secret', hash)
		expect(result).toBe(true)
	})

	it('validatePassword should return false for invalid password', async () => {
		const hash = await service.hashPassword('secret')
		const result = await service.validatePassword('wrong', hash)
		expect(result).toBe(false)
	})

	describe('register', () => {
		const registerDto: RegisterDto = {
			email: 'test@example.com',
			password: 'password123',
			firstname: 'John',
			lastname: 'Doe',
			agreedToTerms: true,
		}

		it('should register a new user', async () => {
			const mockUser = {id: '123', ...registerDto} as UserEntity
			mockEntityManager.findOne.mockResolvedValue(null)
			mockEntityManager.create.mockReturnValue(mockUser)
			mockEntityManager.persistAndFlush.mockResolvedValue(undefined)

			const result = await service.register(registerDto)

			expect(mockEntityManager.findOne).toHaveBeenCalledWith(UserEntity, {
				email: registerDto.email,
			})
			expect(mockEntityManager.create).toHaveBeenCalledWith(
				UserEntity,
				expect.objectContaining({
					email: registerDto.email,
					firstname: registerDto.firstname,
					lastname: registerDto.lastname,
					agreedToTerms: registerDto.agreedToTerms,
				}),
			)
			expect(mockEntityManager.persistAndFlush).toHaveBeenCalledWith(mockUser)
			expect(result).toEqual(mockUser)
		})

		it('should throw ConflictException if user already exists', async () => {
			mockEntityManager.findOne.mockResolvedValue({id: '123'} as UserEntity)

			await expect(service.register(registerDto)).rejects.toThrow(
				ConflictException,
			)
			expect(mockEntityManager.create).not.toHaveBeenCalled()
			expect(mockEntityManager.persistAndFlush).not.toHaveBeenCalled()
		})
	})

	describe('login', () => {
		it('should return access token for valid credentials', async () => {
			const mockUser = {
				id: '123',
				email: 'test@example.com',
				password: await service.hashPassword('password123'),
			} as UserEntity
			mockEntityManager.findOne.mockResolvedValue(mockUser)
			mockJwtService.signAsync.mockResolvedValue('mock-jwt-token')

			const result = await service.login('test@example.com', 'password123')

			expect(result).toEqual({accessToken: 'mock-jwt-token'})
			expect(mockEntityManager.findOne).toHaveBeenCalledWith(UserEntity, {
				email: 'test@example.com',
			})
			expect(mockJwtService.signAsync).toHaveBeenCalledWith({
				sub: '123',
				email: 'test@example.com',
			})
		})

		it('should throw UnauthorizedException for non-existent user', async () => {
			mockEntityManager.findOne.mockResolvedValue(null)

			await expect(
				service.login('test@example.com', 'password123'),
			).rejects.toThrow(UnauthorizedException)
		})

		it('should throw UnauthorizedException for invalid password', async () => {
			const mockUser = {
				id: '123',
				email: 'test@example.com',
				password: await service.hashPassword('password123'),
			} as UserEntity
			mockEntityManager.findOne.mockResolvedValue(mockUser)

			await expect(
				service.login('test@example.com', 'wrongpassword'),
			).rejects.toThrow(UnauthorizedException)
		})
	})

	describe('validateToken', () => {
		it('should return payload for valid token', async () => {
			const mockPayload = {sub: '123', email: 'test@example.com'}
			mockJwtService.verifyAsync.mockResolvedValue(mockPayload)

			const result = await service.validateToken('valid-token')

			expect(result).toEqual(mockPayload)
			expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('valid-token')
		})

		it('should throw UnauthorizedException for invalid token', async () => {
			mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'))

			await expect(service.validateToken('invalid-token')).rejects.toThrow(
				UnauthorizedException,
			)
		})
	})
})
