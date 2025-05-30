'use client'
import React from 'react'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {motion} from 'framer-motion'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {Checkbox} from '@/components/ui/checkbox'
import {Separator} from '@/components/ui/separator'
import {Loader2, Github} from 'lucide-react'
import {useRegister} from '@/hooks/use-auth'
import {registerSchema, type RegisterInput} from '@/lib/api'

/**
 * Sign up page with registration form.
 * @returns React element containing the sign up form
 */
export default function SignUpPage(): React.ReactElement {
	const registerMutation = useRegister()
	const [isGithubLoading, setIsGithubLoading] = React.useState(false)

	const {
		register,
		handleSubmit,
		formState: {errors},
		setValue,
		watch,
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
	})

	const agreedToTerms = watch('agreedToTerms')

	/**
	 * Handle form submission.
	 * @param data - Form data
	 */
	const onSubmit = (data: RegisterInput) => {
		registerMutation.mutate(data)
	}

	/**
	 * Handle GitHub signup (placeholder).
	 */
	const handleGithubSignup = async (): Promise<void> => {
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
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Create an account
						</h1>
						<p className="text-sm text-muted-foreground">
							Enter your information to create your account
						</p>
					</div>
					<div className="grid gap-6">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="grid gap-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-1">
										<Label htmlFor="firstname">First name</Label>
										<Input
											id="firstname"
											placeholder="John"
											autoCapitalize="none"
											autoCorrect="off"
											disabled={registerMutation.isPending || isGithubLoading}
											{...register('firstname')}
										/>
										{errors.firstname && (
											<p className="text-sm text-destructive">
												{errors.firstname.message}
											</p>
										)}
									</div>
									<div className="grid gap-1">
										<Label htmlFor="lastname">Last name</Label>
										<Input
											id="lastname"
											placeholder="Doe"
											autoCapitalize="none"
											autoCorrect="off"
											disabled={registerMutation.isPending || isGithubLoading}
											{...register('lastname')}
										/>
										{errors.lastname && (
											<p className="text-sm text-destructive">
												{errors.lastname.message}
											</p>
										)}
									</div>
								</div>
								<div className="grid gap-1">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										placeholder="name@example.com"
										type="email"
										autoCapitalize="none"
										autoComplete="email"
										autoCorrect="off"
										disabled={registerMutation.isPending || isGithubLoading}
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
										placeholder="Create a password"
										type="password"
										autoCapitalize="none"
										autoComplete="new-password"
										disabled={registerMutation.isPending || isGithubLoading}
										{...register('password')}
									/>
									{errors.password && (
										<p className="text-sm text-destructive">
											{errors.password.message}
										</p>
									)}
								</div>
								<motion.div
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									transition={{delay: 0.2}}
									className="flex items-center space-x-2"
								>
									<Checkbox
										id="terms"
										checked={agreedToTerms === true}
										onCheckedChange={checked => {
											if (checked === true) {
												setValue('agreedToTerms', true, {shouldValidate: true})
											}
										}}
										disabled={registerMutation.isPending || isGithubLoading}
									/>
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										I agree to the{' '}
										<Link
											href="/terms"
											className="underline underline-offset-4 hover:text-primary"
										>
											Terms of Service
										</Link>{' '}
										and{' '}
										<Link
											href="/privacy"
											className="underline underline-offset-4 hover:text-primary"
										>
											Privacy Policy
										</Link>
									</label>
								</motion.div>
								{errors.agreedToTerms && (
									<p className="text-sm text-destructive">
										{errors.agreedToTerms.message}
									</p>
								)}
								{registerMutation.isError && (
									<p className="text-sm text-destructive">
										{registerMutation.error?.message || 'Registration failed'}
									</p>
								)}
								<Button
									type="submit"
									disabled={registerMutation.isPending || isGithubLoading}
									className="w-full"
								>
									{registerMutation.isPending && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Create Account
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
							disabled={registerMutation.isPending || isGithubLoading}
							onClick={handleGithubSignup}
						>
							{isGithubLoading ?
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							:	<Github className="mr-2 h-4 w-4" />}{' '}
							GitHub
						</Button>
					</div>
					<p className="px-8 text-center text-sm text-muted-foreground">
						Already have an account?{' '}
						<Link
							href="/sign-in"
							className="underline underline-offset-4 hover:text-primary"
						>
							Sign in
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	)
}
