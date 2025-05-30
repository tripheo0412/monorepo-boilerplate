import {Test, TestingModule} from '@nestjs/testing'
import {APP_GUARD} from '@nestjs/core'
import {AppController} from '../controllers/app.controller'
import {AppService} from '../services/app.service'
import {AuthGuard} from '../../auth/guards/auth.guard'

describe('AppController', () => {
	let appController: AppController

	beforeEach(async () => {
		const mockAuthGuard = {
			canActivate: jest.fn(() => true),
		}

		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				AppService,
				{
					provide: APP_GUARD,
					useValue: mockAuthGuard,
				},
			],
		})
			.overrideGuard(AuthGuard)
			.useValue(mockAuthGuard)
			.compile()

		appController = app.get<AppController>(AppController)
	})

	describe('root', () => {
		it('should return "Hello World!" message', () => {
			expect(appController.getHello()).toEqual({
				message: 'Hello World!',
			})
		})
	})
})
