import type {Meta, StoryObj} from '@storybook/nextjs'
import {Checkbox} from './checkbox'
import {Label} from '../label'

const meta = {
	title: 'Components/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		checked: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const Checked: Story = {
	args: {
		checked: true,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}

export const CheckedDisabled: Story = {
	args: {
		checked: true,
		disabled: true,
	},
}

export const WithLabel: Story = {
	render: () => (
		<div className="flex items-center space-x-2">
			<Checkbox id="terms" />
			<Label
				htmlFor="terms"
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Accept terms and conditions
			</Label>
		</div>
	),
}

export const MultipleCheckboxes: Story = {
	render: () => (
		<div className="space-y-4">
			<div className="flex items-center space-x-2">
				<Checkbox id="option1" defaultChecked />
				<Label htmlFor="option1">Option 1 (default checked)</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox id="option2" />
				<Label htmlFor="option2">Option 2</Label>
			</div>
			<div className="flex items-center space-x-2">
				<Checkbox id="option3" disabled />
				<Label htmlFor="option3" className="opacity-50">
					Option 3 (disabled)
				</Label>
			</div>
		</div>
	),
}
