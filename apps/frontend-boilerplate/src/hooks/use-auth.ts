import {useMutation} from '@tanstack/react-query'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {api, type LoginInput, type RegisterInput} from '@/lib/api'

/**
 * Hook for user login with TanStack Query.
 * @returns Mutation object for login
 */
export function useLogin() {
	const router = useRouter()

	return useMutation({
		mutationFn: (data: LoginInput) => api.login(data),
		onSuccess: () => {
			toast.success('Successfully logged in!')
			router.push('/')
		},
	})
}

/**
 * Hook for user registration with TanStack Query.
 * @returns Mutation object for registration
 */
export function useRegister() {
	const router = useRouter()

	return useMutation({
		mutationFn: (data: RegisterInput) => api.register(data),
		onSuccess: () => {
			toast.success('Registration successful! Please sign in.')
			router.push('/sign-in?registered=true')
		},
	})
}

/**
 * Custom hook for authentication operations.
 * @returns Authentication utilities
 */
export function useAuth() {
	const logout = () => {
		api.logout()
		toast.success('Successfully logged out')
	}

	return {
		logout,
		isAuthenticated: api.isAuthenticated(),
	}
}
