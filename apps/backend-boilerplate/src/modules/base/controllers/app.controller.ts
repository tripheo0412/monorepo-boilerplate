import {Controller, Get, UseGuards} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiBearerAuth,
} from '@nestjs/swagger'
import type {HelloResponseDto as IHelloResponseDto} from 'types'
import {AppService} from '../services/app.service'
import {AuthGuard} from '../../auth/guards/auth.guard'
import {HelloResponseDto} from '../dto/hello-response.dto'

/**
 * Main application controller.
 */
@ApiTags('Application')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	/**
	 * Get hello message.
	 * @returns Hello response object
	 */
	@UseGuards(AuthGuard)
	@Get()
	@ApiBearerAuth()
	@ApiOperation({summary: 'Get hello message'})
	@ApiResponse({
		status: 200,
		description: 'Returns hello message',
		type: HelloResponseDto,
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized',
	})
	getHello(): IHelloResponseDto {
		return {
			message: this.appService.getHello(),
		}
	}
}
