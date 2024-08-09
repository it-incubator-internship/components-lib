import { Meta, StoryObj } from '@storybook/react'
import { Textarea} from './textarea'
import React from 'react'

const meta = {
  component: Textarea,
  title: 'Components/Textarea',
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {

  },
}

export const Active: Story = {
  args: {
	message: "Active text"
  },
    render: args => {
    return (
      <div style = {{ width: "400px", margin: "0 auto" }}>
        <Textarea message={args.message} />
      </div>
    )
  },
}

export const Error: Story = {
  args: {
	error: "Error text"
  },
  render: args => {
	return (
	<div style = {{ width: "400px", margin: "0 auto" }}>
		<Textarea message={args.message} error={ args.error } />
	</div>
	)
 },
}

export const Disabled: Story = {
  args: {
	disabled: true
  },
  render: args => {
	const myRef = useRef(null);
	return (
	<div style = {{ width: "400px", margin: "0 auto" }}>		
		<Textarea message={args.message} disabled={ args.disabled } ref = {myRef}/>
	</div>
	)
 },
}

// export const Focus: Story = {
//   args: {
//     ...Primary.args,
//     fullWidth: true,
//     children: 'Full Width',
//   },
//   render: args => {
//     return (
//       <Button {...args} onClick={() => alert('clicked nice button')}>
//         Nice button
//       </Button>
//     )
//   },
// }

// export const Disabled: Story = {
//   args: {
//     ...Primary.args,
//     asChild: true,
//     children: <a href={'#'}>Link</a>,
//   },
// }

// export const WithIcone: Story = {
//   args: {
//     children: (
//       <>
//         <FlagRussia /> Delete
//       </>
//     ),
//     disabled: false,
//     variant: 'primary',
//   },
// }
