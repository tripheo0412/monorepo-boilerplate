'use client'
import React from 'react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Home, AlertCircle, ArrowLeft} from 'lucide-react'

/**
 * Custom 404 page displayed for invalid routes.
 * @returns Not found page component
 */
export default function NotFound(): React.ReactElement {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
			<Card className="w-full max-w-lg shadow-xl">
				<CardContent className="p-8 text-center">
					<div className="mb-6 flex justify-center">
						<div className="rounded-full bg-destructive/10 p-4">
							<AlertCircle className="h-16 w-16 text-destructive" />
						</div>
					</div>

					<h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
					<h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
					<p className="mb-8 text-muted-foreground">
						Oops! The page you&apos;re looking for doesn&apos;t exist. It might
						have been moved or deleted.
					</p>

					<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
						<Button asChild variant="default" size="lg">
							<Link href="/">
								<Home className="mr-2 h-4 w-4" />
								Back to Home
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							onClick={() => window.history.back()}
						>
							<button>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Go Back
							</button>
						</Button>
					</div>

					<div className="mt-8 text-sm text-muted-foreground">
						If you believe this is a mistake, please contact support.
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
