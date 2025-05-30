'use client'
import React from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

/**
 * Create a new QueryClient instance.
 * @returns QueryClient instance
 */
function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000, // 1 minute
				retry: 1,
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined = undefined

/**
 * Get QueryClient instance, creating one if needed.
 * @returns QueryClient instance
 */
function getQueryClient() {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return makeQueryClient()
	} else {
		// Browser: make a new query client if we don't already have one
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}

export interface QueryProviderProps {
	children: React.ReactNode
}

/**
 * Provider component for TanStack Query.
 * @param props - Component props
 * @returns QueryClientProvider wrapper
 */
export function QueryProvider({children}: QueryProviderProps) {
	const queryClient = getQueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
