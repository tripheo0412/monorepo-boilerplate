'use client'
import React from 'react'
import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {motion} from 'framer-motion'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {Separator} from '@/components/ui/separator'
import {Loader2, Github, CheckCircle} from 'lucide-react'
import {useLogin} from '@/hooks/use-auth'
import {loginSchema, type LoginInput} from '@/lib/api'

/**
 * Sign in page with email/password authentication.
 * @returns React element containing the sign in form
 */
export default function SignInPage(): React.ReactElement {
	const searchParams = useSearchParams()
	const justRegistered = searchParams.get('registered') === 'true'
	const loginMutation = useLogin()
	const [isGithubLoading, setIsGithubLoading] = React.useState(false)

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	})

	/**
	 * Handle form submission.
	 * @param data - Form data
	 */
	const onSubmit = (data: LoginInput) => {
		loginMutation.mutate(data)
	}

	/**
	 * Handle GitHub login (placeholder).
	 */
	const handleGithubLogin = async (): Promise<void> => {
		setIsGithubLoading(true)
		setTimeout(() => {
			setIsGithubLoading(false)
		}, 1000)
	}

	return (
		<div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<motion.div
				initial={{opacity: 0, x: -20}}
				animate={{opacity: 1, x: 0}}
				transition={{duration: 0.5}}
				className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
			>
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="mr-2 h-6 w-6"
					>
						<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
					</svg>
					Acme Inc
				</div>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;This library has saved me countless hours of work and
							helped me deliver stunning designs to my clients faster than ever
							before.&rdquo;
						</p>
						<footer className="text-sm">Sofia Davis</footer>
					</blockquote>
				</div>
			</motion.div>
			<div className="lg:p-8">
				<motion.div
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.5}}
					className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
				>
					{justRegistered && (
						<motion.div
							initial={{opacity: 0, scale: 0.95}}
							animate={{opacity: 1, scale: 1}}
							className="rounded-lg border bg-green-50 p-4 dark:bg-green-950"
						>
							<div className="flex items-center gap-2">
								<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
								<p className="text-sm text-green-800 dark:text-green-200">
									Registration successful! Please sign in.
								</p>
							</div>
						</motion.div>
					)}

					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Welcome back
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your email to sign in to your account
						</p>
					</div>
					<div className="grid gap-6">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid gap-2">
								<div className="grid gap-1">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										placeholder="name@example.com"
										type="email"
										autoCapitalize="none"
										autoComplete="email"
										autoCorrect="off"
										disabled={loginMutation.isPending || isGithubLoading}
										{...register('email')}
									/>
									{errors.email && (
										<p className="text-sm text-destructive">
											{errors.email.message}
										</p>
									)}
								</div>
								<div className="grid gap-1">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										placeholder="Enter your password"
										type="password"
										autoCapitalize="none"
										autoComplete="current-password"
										disabled={loginMutation.isPending || isGithubLoading}
										{...register('password')}
									/>
									{errors.password && (
										<p className="text-sm text-destructive">
											{errors.password.message}
										</p>
									)}
								</div>
								{loginMutation.isError && (
									<p className="text-sm text-destructive">
										{loginMutation.error?.message ||
											'Invalid email or password'}
									</p>
								)}
								<Button
									type="submit"
									disabled={loginMutation.isPending || isGithubLoading}
									className="w-full"
								>
									{loginMutation.isPending && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Sign In
								</Button>
							</div>
						</form>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
						<Button
							variant="outline"
							type="button"
							disabled={loginMutation.isPending || isGithubLoading}
							onClick={handleGithubLogin}
						>
							{isGithubLoading ?
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							:	<Github className="mr-2 h-4 w-4" />}{' '}
							GitHub
						</Button>
					</div>
					<p className="px-8 text-center text-sm text-muted-foreground">
						Don&apos;t have an account?{' '}
						<Link
							href="/sign-up"
							className="underline underline-offset-4 hover:text-primary"
						>
							Sign up
						</Link>
					</p>
					<p className="text-center text-sm text-muted-foreground">
						Demo credentials: admin@example.com / password
					</p>
				</motion.div>
			</div>
		</div>
	)
}
