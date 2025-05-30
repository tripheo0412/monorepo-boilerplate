import type {Meta, StoryObj} from '@storybook/nextjs'
import {Toaster} from './sonner'
import {Button} from '../button'
import {toast} from 'sonner'

const meta = {
	title: 'Components/Sonner',
	component: Toaster,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<div className="space-y-4">
			<Toaster />
			<div className="space-x-2">
				<Button onClick={() => toast('Default toast notification')}>
					Show Toast
				</Button>
				<Button
					variant="outline"
					onClick={() => toast.success('Success! Operation completed.')}
				>
					Success
				</Button>
				<Button
					variant="outline"
					onClick={() => toast.error('Error! Something went wrong.')}
				>
					Error
				</Button>
				<Button
					variant="outline"
					onClick={() => toast.warning('Warning! Please check your input.')}
				>
					Warning
				</Button>
				<Button
					variant="outline"
					onClick={() => toast.info('Info: New update available.')}
				>
					Info
				</Button>
			</div>
		</div>
	),
}

export const WithDescription: Story = {
	render: () => (
		<div>
			<Toaster />
			<Button
				onClick={() =>
					toast('Event Created', {
						description: 'Monday, January 3rd at 6:00pm',
					})
				}
			>
				Toast with Description
			</Button>
		</div>
	),
}

export const WithAction: Story = {
	render: () => (
		<div>
			<Toaster />
			<Button
				onClick={() =>
					toast('File deleted', {
						action: {
							label: 'Undo',
							onClick: () => toast.success('Undo successful'),
						},
					})
				}
			>
				Toast with Action
			</Button>
		</div>
	),
}

export const PromiseToast: Story = {
	render: () => {
		const promise = () =>
			new Promise<{name: string}>(resolve =>
				setTimeout(() => resolve({name: 'Sonner'}), 2000),
			)

		return (
			<div>
				<Toaster />
				<Button
					onClick={() =>
						toast.promise(promise, {
							loading: 'Loading...',
							success: data => `${data.name} has been loaded`,
							error: 'Error loading data',
						})
					}
				>
					Promise Toast
				</Button>
			</div>
		)
	},
}

export const CustomPosition: Story = {
	render: () => (
		<div className="space-y-4">
			<Toaster position="top-center" />
			<p className="text-sm text-muted-foreground">
				The toaster is configured to appear at the top-center position
			</p>
			<Button onClick={() => toast.success('Top center toast!')}>
				Show Toast
			</Button>
		</div>
	),
}
