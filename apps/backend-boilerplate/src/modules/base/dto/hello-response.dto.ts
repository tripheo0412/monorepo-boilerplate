import {ApiProperty} from '@nestjs/swagger'
import type {HelloResponseDto as IHelloResponseDto} from 'types'

/**
 * DTO for hello endpoint response.
 */
export class HelloResponseDto implements IHelloResponseDto {
	/**
	 * Response message
	 */
	@ApiProperty({
		description: 'Hello message',
		example: 'Hello World!',
	})
	message: string
}
