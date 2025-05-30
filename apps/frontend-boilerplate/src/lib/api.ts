import axios, {AxiosError, AxiosInstance} from 'axios'
import {z} from 'zod'
import {toast} from 'sonner'
import type {
	LoginDto,
	RegisterDto,
	LoginResponseDto,
	RegisterResponseDto,
} from 'types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Token storage keys
const TOKEN_KEY = 'auth_token'

// Validation schemas
export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password is required'),
}) satisfies z.ZodType<LoginDto>

export const registerSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	firstname: z.string().min(1, 'First name is required'),
	lastname: z.string().min(1, 'Last name is required'),
	agreedToTerms: z.boolean().refine(val => val === true, {
		message: 'You must agree to the terms and conditions',
	}),
}) satisfies z.ZodType<RegisterDto>

export type LoginInput = LoginDto
export type RegisterInput = RegisterDto

/**
 * Extract error message from axios error
 * @param error - Axios error object
 * @returns Error message string
 */
function getErrorMessage(error: unknown): string {
	if (error instanceof AxiosError) {
		// API error response
		if (error.response?.data?.message) {
			return error.response.data.message
		}
		// Network or other axios errors
		if (error.message) {
			return error.message
		}
	}
	// Fallback for unknown errors
	return 'Something went wrong'
}

/**
 * API client for making requests to the backend.
 */
class ApiClient {
	private axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: API_BASE_URL,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		// Request interceptor to add auth token
		this.axiosInstance.interceptors.request.use(config => {
			const token = this.getToken()
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		})

		// Response interceptor to handle errors
		this.axiosInstance.interceptors.response.use(
			response => response,
			(error: AxiosError) => {
				// Handle 401 unauthorized
				if (error.response?.status === 401) {
					this.removeToken()
					// Redirect to login if not already there
					if (window.location.pathname !== '/sign-in') {
						window.location.href = '/sign-in'
					}
				}

				// Show error toast
				const message = getErrorMessage(error)
				toast.error(message)

				return Promise.reject(error)
			},
		)
	}

	/**
	 * Get stored auth token.
	 * @returns Stored token or null
	 */
	getToken(): string | null {
		if (typeof window !== 'undefined') {
			return localStorage.getItem(TOKEN_KEY)
		}
		return null
	}

	/**
	 * Store auth token.
	 * @param token - JWT token to store
	 */
	setToken(token: string): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem(TOKEN_KEY, token)
		}
	}

	/**
	 * Remove stored auth token.
	 */
	removeToken(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(TOKEN_KEY)
		}
	}

	/**
	 * Register a new user.
	 * @param data - Registration data
	 * @returns Registration response
	 */
	async register(data: RegisterDto): Promise<RegisterResponseDto> {
		const response = await this.axiosInstance.post<RegisterResponseDto>(
			'/auth/register',
			data,
		)
		return response.data
	}

	/**
	 * Login a user.
	 * @param data - Login credentials
	 * @returns Login response
	 */
	async login(data: LoginDto): Promise<LoginResponseDto> {
		const response = await this.axiosInstance.post<LoginResponseDto>(
			'/auth/login',
			data,
		)

		// Store the token
		if (response.data.access_token) {
			this.setToken(response.data.access_token)
		}

		return response.data
	}

	/**
	 * Logout the current user.
	 */
	logout(): void {
		this.removeToken()
		window.location.href = '/sign-in'
	}

	/**
	 * Check if user is authenticated.
	 * @returns True if token exists
	 */
	isAuthenticated(): boolean {
		return !!this.getToken()
	}

	/**
	 * Make a GET request to a protected endpoint.
	 * @param endpoint - API endpoint
	 * @returns Response data
	 */
	async get<T>(endpoint: string): Promise<T> {
		const response = await this.axiosInstance.get<T>(endpoint)
		return response.data
	}

	/**
	 * Make a POST request to a protected endpoint.
	 * @param endpoint - API endpoint
	 * @param data - Request body
	 * @returns Response data
	 */
	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		const response = await this.axiosInstance.post<T>(endpoint, data)
		return response.data
	}

	/**
	 * Make a PUT request to a protected endpoint.
	 * @param endpoint - API endpoint
	 * @param data - Request body
	 * @returns Response data
	 */
	async put<T>(endpoint: string, data?: unknown): Promise<T> {
		const response = await this.axiosInstance.put<T>(endpoint, data)
		return response.data
	}

	/**
	 * Make a DELETE request to a protected endpoint.
	 * @param endpoint - API endpoint
	 * @returns Response data
	 */
	async delete<T>(endpoint: string): Promise<T> {
		const response = await this.axiosInstance.delete<T>(endpoint)
		return response.data
	}
}

export const api = new ApiClient()
