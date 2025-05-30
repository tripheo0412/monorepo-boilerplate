import {render, screen} from '@testing-library/react'
import SignInPage from '../app/sign-in/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
	useSearchParams: () => ({
		get: jest.fn(),
	}),
}))

// Mock Link component
jest.mock('next/link', () => ({
	__esModule: true,
	default: ({children, href}: {children: React.ReactNode; href: string}) => (
		<a href={href}>{children}</a>
	),
}))

// Mock TanStack Query
jest.mock('@tanstack/react-query', () => ({
	useMutation: () => ({
		mutate: jest.fn(),
		isPending: false,
		isError: false,
		error: null,
	}),
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
	motion: {
		div: ({
			children,
			...props
		}: {
			children: React.ReactNode
			[key: string]: unknown
		}) => <div {...props}>{children}</div>,
	},
}))

describe('SignInPage', () => {
	it('renders sign in form', () => {
		render(<SignInPage />)

		expect(screen.getByText('Welcome back')).toBeInTheDocument()
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
		expect(screen.getByRole('button', {name: /sign in/i})).toBeInTheDocument()
		expect(screen.getByText(/don't have an account/i)).toBeInTheDocument()
	})
})
