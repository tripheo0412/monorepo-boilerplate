import {Body, Controller, Post} from '@nestjs/common'
import {ApiOperation, ApiTags, ApiResponse} from '@nestjs/swagger'
import type {LoginResponseDto, RegisterResponseDto} from 'types'
import {AuthService} from '../services/auth.service'
import {LoginDto} from '../dto/login.dto'
import {RegisterDto} from '../dto/register.dto'

/**
 * Controller providing authentication endpoints.
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Register a new user.
	 * @param dto - Registration data
	 * @returns Object containing user info and success message
	 */
	@Post('register')
	@ApiOperation({summary: 'Register a new user'})
	@ApiResponse({status: 201, description: 'User successfully registered'})
	@ApiResponse({
		status: 409,
		description: 'User with this email already exists',
	})
	async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
		const user = await this.authService.register(dto)
		return {
			message: 'User successfully registered',
			user: {
				id: user.id,
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
			},
		}
	}

	/**
	 * Validate credentials and return authentication token.
	 * @param dto - Login data containing email and password
	 * @returns Object containing auth token
	 */
	@Post('login')
	@ApiOperation({summary: 'Login user'})
	@ApiResponse({status: 200, description: 'Successfully logged in'})
	@ApiResponse({status: 401, description: 'Invalid credentials'})
	async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
		const {accessToken} = await this.authService.login(dto.email, dto.password)
		return {access_token: accessToken}
	}
}
