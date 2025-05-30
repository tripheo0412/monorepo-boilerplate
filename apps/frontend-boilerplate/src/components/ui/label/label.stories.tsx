import type {Meta, StoryObj} from '@storybook/nextjs'
import {Label} from './label'
import {Input} from '../input'
import {Checkbox} from '../checkbox'

const meta = {
	title: 'Components/Label',
	component: Label,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: 'Label text',
	},
}

export const WithInput: Story = {
	render: () => (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor="username">Username</Label>
			<Input id="username" placeholder="Enter username" />
		</div>
	),
}

export const WithCheckbox: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Checkbox id="terms2" />
			<Label htmlFor="terms2">I agree to the terms and conditions</Label>
		</div>
	),
}

export const Required: Story = {
	render: () => (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor="required-field">
				Required Field <span className="text-red-500">*</span>
			</Label>
			<Input id="required-field" required />
		</div>
	),
}

export const WithHelperText: Story = {
	render: () => (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor="email-field">Email address</Label>
			<Input type="email" id="email-field" placeholder="you@example.com" />
			<p className="text-sm text-muted-foreground">
				We&apos;ll never share your email with anyone else.
			</p>
		</div>
	),
}
