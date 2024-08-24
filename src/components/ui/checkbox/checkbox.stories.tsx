import {Meta, StoryObj} from '@storybook/react'
import {Checkbox} from './checkbox'
import {useRef, useState} from 'react'

const meta = {
    component: Checkbox,
    title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        labelText: 'Check-box',
        containerClassName: 'SignUpContainer',
        // errorMsg: 'errro!!!!'
    },
    render: args => {
        const [checked, setChecked] = useState(false)
        const checkRef = useRef<HTMLButtonElement>(null)

        const handleCheckbox = () => {
            if (checkRef.current) {
                setChecked(!checked)
            }
        }
        return (
            <Checkbox {...args} checked={checked} ref={checkRef} onCheckedChange={handleCheckbox}/>
        )
    },
}

export const Checked: Story = {
    args: {
        labelText: 'Check-box',
    },
    render: args => {
        const [checked, setChecked] = useState(true)
        const checkRef = useRef<HTMLButtonElement>(null)

        const handleCheckbox = () => {
            if (checkRef.current) {
                setChecked(!checked)
            }
        }
        return (
            <Checkbox {...args} checked={checked} ref={checkRef} onCheckedChange={handleCheckbox}/>
        )
    },
}

export const Disabled: Story = {
    args: {
        labelText: 'Check-box',
        disabled: true,
    },
    render: args => {
        const [checked, setChecked] = useState(true)
        const checkRef = useRef<HTMLButtonElement>(null)
        const handleCheckbox = () => {
            if (checkRef.current) {
                setChecked(!checked)
            }
        }
        return (
            <Checkbox {...args} checked={checked} ref={checkRef} onCheckedChange={handleCheckbox}/>
        )
    },
}
