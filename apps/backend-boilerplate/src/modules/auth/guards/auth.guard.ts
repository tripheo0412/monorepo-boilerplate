import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import {AuthService} from '../services/auth.service'

/**
 * Guard verifying the Authorization header contains a valid JWT token.
 */
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Determine if the current request is allowed to proceed.
	 * @param context - Execution context containing request data
	 * @returns True if token is valid
	 * @throws UnauthorizedException when token missing or invalid
	 */
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)

		if (!token) {
			throw new UnauthorizedException('No token provided')
		}

		try {
			const payload = await this.authService.validateToken(token)
			// Attach user info to request for use in controllers
			request['user'] = payload
			return true
		} catch {
			throw new UnauthorizedException('Invalid token')
		}
	}

	/**
	 * Extract JWT token from Authorization header.
	 * @param request - HTTP request object
	 * @returns Token string or undefined
	 */
	private extractTokenFromHeader(request: {
		headers: {[key: string]: string}
	}): string | undefined {
		const [type, token] = request.headers['authorization']?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
