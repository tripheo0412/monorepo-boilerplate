import {IsEmail, IsString, MinLength, IsBoolean} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import type {RegisterDto as IRegisterDto} from 'types'

/**
 * Data required to register a new user.
 */
export class RegisterDto implements IRegisterDto {
	/** User email */
	@ApiProperty()
	@IsEmail()
	email!: string

	/** User password */
	@ApiProperty()
	@IsString()
	@MinLength(8)
	password!: string

	/** User first name */
	@ApiProperty()
	@IsString()
	firstname!: string

	/** User last name */
	@ApiProperty()
	@IsString()
	lastname!: string

	/** Whether user agreed to terms and conditions */
	@ApiProperty()
	@IsBoolean()
	agreedToTerms!: boolean
}
