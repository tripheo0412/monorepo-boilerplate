import {Module} from '@nestjs/common'
import {MikroOrmModule} from '@mikro-orm/nestjs'
import {AuthService} from './services/auth.service'
import {AuthController} from './controllers/auth.controller'
import {AuthGuard} from './guards/auth.guard'
import {UserEntity} from '@/entities/user.entity'
import {JwtModule} from '@nestjs/jwt'
import {ConfigModule, ConfigService} from '@nestjs/config'

/**
 * Module bundling authentication components.
 */
@Module({
	imports: [
		MikroOrmModule.forFeature([UserEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get('JWT_EXPIRES_IN', '7d'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, AuthGuard],
	exports: [AuthService, AuthGuard],
})
export class AuthModule {}
