import type {Meta, StoryObj} from '@storybook/nextjs'
import {Separator} from './separator'

const meta = {
	title: 'Components/Separator',
	component: Separator,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		orientation: {
			control: 'radio',
			options: ['horizontal', 'vertical'],
		},
	},
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
	render: () => (
		<div className="w-96">
			<div className="space-y-1">
				<h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
				<p className="text-sm text-muted-foreground">
					An open-source UI component library.
				</p>
			</div>
			<Separator className="my-4" />
			<div className="flex h-5 items-center space-x-4 text-sm">
				<div>Blog</div>
				<Separator orientation="vertical" />
				<div>Docs</div>
				<Separator orientation="vertical" />
				<div>Source</div>
			</div>
		</div>
	),
}

export const Vertical: Story = {
	render: () => (
		<div className="flex h-20 items-center">
			<div className="px-4">Item 1</div>
			<Separator orientation="vertical" />
			<div className="px-4">Item 2</div>
			<Separator orientation="vertical" />
			<div className="px-4">Item 3</div>
		</div>
	),
}

export const InCard: Story = {
	render: () => (
		<div className="w-96 rounded-lg border p-6">
			<h3 className="font-semibold">Account Settings</h3>
			<p className="text-sm text-muted-foreground">
				Manage your account preferences
			</p>
			<Separator className="my-4" />
			<div className="space-y-4">
				<div>
					<h4 className="text-sm font-medium">Email</h4>
					<p className="text-sm text-muted-foreground">user@example.com</p>
				</div>
				<Separator />
				<div>
					<h4 className="text-sm font-medium">Password</h4>
					<p className="text-sm text-muted-foreground">
						Last changed 3 months ago
					</p>
				</div>
			</div>
		</div>
	),
}
