import type {Meta, StoryObj} from '@storybook/nextjs'
import {Input} from './input'
import {Label} from '../label'

const meta = {
	title: 'Components/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
		},
		placeholder: {
			control: 'text',
		},
		disabled: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		placeholder: 'Enter text...',
	},
}

export const Email: Story = {
	args: {
		type: 'email',
		placeholder: 'email@example.com',
	},
}

export const Password: Story = {
	args: {
		type: 'password',
		placeholder: 'Enter password',
	},
}

export const Disabled: Story = {
	args: {
		placeholder: 'Disabled input',
		disabled: true,
	},
}

export const WithLabel: Story = {
	render: () => (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor="email">Email</Label>
			<Input type="email" id="email" placeholder="Email" />
		</div>
	),
}

export const WithValue: Story = {
	args: {
		defaultValue: 'Default value',
	},
}

export const FormExample: Story = {
	render: () => (
		<div className="space-y-4 w-full max-w-sm">
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="firstname">First name</Label>
				<Input id="firstname" placeholder="John" />
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="lastname">Last name</Label>
				<Input id="lastname" placeholder="Doe" />
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="email-2">Email</Label>
				<Input type="email" id="email-2" placeholder="john.doe@example.com" />
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="password">Password</Label>
				<Input type="password" id="password" />
			</div>
		</div>
	),
}
