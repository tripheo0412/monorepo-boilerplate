import {
	Injectable,
	UnauthorizedException,
	ConflictException,
} from '@nestjs/common'
import {EntityManager} from '@mikro-orm/core'
import * as bcrypt from 'bcrypt'
import {UserEntity} from '../../../entities/user.entity'
import {RegisterDto} from '../dto/register.dto'
import {JwtService} from '@nestjs/jwt'

/**
 * Service containing authentication helper methods.
 */
@Injectable()
export class AuthService {
	constructor(
		private readonly em: EntityManager,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * Hash raw password using bcrypt.
	 * @param password - Plain text password
	 * @returns Promise resolving hashed password
	 */
	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt()
		return bcrypt.hash(password, salt)
	}

	/**
	 * Validate password by comparing with stored hash.
	 * @param password - Plain text password
	 * @param hash - Hash to compare against
	 * @returns Promise resolving to comparison result
	 */
	async validatePassword(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash)
	}

	/**
	 * Register a new user.
	 * @param dto - Registration data
	 * @returns Promise resolving to created user
	 */
	async register(dto: RegisterDto): Promise<UserEntity> {
		// Check if user with email already exists
		const existingUser = await this.em.findOne(UserEntity, {email: dto.email})
		if (existingUser) {
			throw new ConflictException('User with this email already exists')
		}

		// Create new user
		const hashedPassword = await this.hashPassword(dto.password)
		const user = this.em.create(UserEntity, {
			email: dto.email,
			firstname: dto.firstname,
			lastname: dto.lastname,
			password: hashedPassword,
			agreedToTerms: dto.agreedToTerms,
		})

		await this.em.persistAndFlush(user)
		return user
	}

	/**
	 * Validate credentials and return auth token when valid.
	 * @param email - User email
	 * @param password - Plain text password
	 * @returns Promise resolving to JWT access token
	 */
	async login(email: string, password: string): Promise<{accessToken: string}> {
		const user = await this.em.findOne(UserEntity, {email})
		if (!user) {
			throw new UnauthorizedException('Invalid credentials')
		}

		const validPassword = await this.validatePassword(password, user.password)
		if (!validPassword) {
			throw new UnauthorizedException('Invalid credentials')
		}

		// Generate JWT token
		const payload = {sub: user.id, email: user.email}
		const accessToken = await this.jwtService.signAsync(payload)

		return {accessToken}
	}

	/**
	 * Validate a JWT token and return the payload.
	 * @param token - JWT token to validate
	 * @returns Promise resolving to token payload
	 * @throws UnauthorizedException if token is invalid
	 */
	async validateToken(token: string): Promise<{sub: string; email: string}> {
		try {
			return await this.jwtService.verifyAsync(token)
		} catch {
			throw new UnauthorizedException('Invalid token')
		}
	}
}
