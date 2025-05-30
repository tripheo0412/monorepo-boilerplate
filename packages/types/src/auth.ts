/**
 * Shared authentication DTOs for frontend and backend.
 */

import {BaseEntityDto} from './base'

/**
 * Login request DTO.
 */
export interface LoginDto {
	email: string
	password: string
}

/**
 * Registration request DTO.
 */
export interface RegisterDto {
	email: string
	password: string
	firstname: string
	lastname: string
	agreedToTerms: boolean
}

/**
 * Login response DTO.
 */
export interface LoginResponseDto {
	access_token: string
}

/**
 * User information DTO (without sensitive data).
 */
export interface UserDto {
	id: string
	email: string
	firstname: string
	lastname: string
}

/**
 * Registration response DTO.
 */
export interface RegisterResponseDto {
	message: string
	user: UserDto
}

/**
 * User entity DTO (includes all non-sensitive fields from UserEntity).
 */
export interface UserEntityDto extends BaseEntityDto {
	email: string
	firstname: string
	lastname: string
	agreedToTerms: boolean
}
