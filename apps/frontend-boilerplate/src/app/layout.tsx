import React, {type ReactNode} from 'react'
import {QueryProvider} from '@/providers/query-provider'
import {Toaster} from '@/components/ui/sonner'
import './globals.css'

/**
 * Root layout wraps all pages in the app router.
 *
 * @param {object} props - Component properties.
 * @param {ReactNode} props.children - Nested pages to render.
 * @returns {React.ReactElement} The rendered HTML layout.
 */
export default function RootLayout({
	children,
}: {
	children: ReactNode
}): React.ReactElement {
	return (
		<html lang="en">
			<body>
				<QueryProvider>{children}</QueryProvider>
				<Toaster />
			</body>
		</html>
	)
}
