import type {Meta, StoryObj} from '@storybook/nextjs'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	CardAction,
} from './card'
import {Button} from '../button'

const meta = {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card description goes here</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card content with some text and information.</p>
			</CardContent>
			<CardFooter>
				<Button variant="outline" className="mr-2">
					Cancel
				</Button>
				<Button>Save</Button>
			</CardFooter>
		</Card>
	),
}

export const WithAction: Story = {
	render: () => (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>Manage your notification preferences</CardDescription>
				<CardAction>
					<Button variant="ghost" size="sm">
						Settings
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p>You have 3 unread messages.</p>
			</CardContent>
		</Card>
	),
}

export const SimpleCard: Story = {
	render: () => (
		<Card className="w-[350px]">
			<CardContent className="pt-6">
				<p className="text-center">Simple card with just content</p>
			</CardContent>
		</Card>
	),
}

export const ComplexCard: Story = {
	render: () => (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>Create New Project</CardTitle>
				<CardDescription>
					Deploy your new project in one-click. Choose from our templates.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium">Project Name</label>
						<input
							type="text"
							className="w-full mt-1 px-3 py-2 border rounded-md"
							placeholder="my-awesome-project"
						/>
					</div>
					<div>
						<label className="text-sm font-medium">Framework</label>
						<select className="w-full mt-1 px-3 py-2 border rounded-md">
							<option>Next.js</option>
							<option>Vite</option>
							<option>Astro</option>
						</select>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="ghost">Back</Button>
				<Button>Deploy</Button>
			</CardFooter>
		</Card>
	),
}
