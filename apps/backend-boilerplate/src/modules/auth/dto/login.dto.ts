import {IsEmail, IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import type {LoginDto as ILoginDto} from 'types'

/**
 * Data required to log in a user.
 */
export class LoginDto implements ILoginDto {
	/** User email */
	@ApiProperty()
	@IsEmail()
	email!: string

	/** User password */
	@ApiProperty()
	@IsString()
	password!: string
}
