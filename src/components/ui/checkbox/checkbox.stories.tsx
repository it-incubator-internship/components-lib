import {Meta, StoryObj} from '@storybook/react'
import {Checkbox} from "./checkbox";
import {useRef, useState} from "react";

const meta = {
    component: Checkbox,
    title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Checked: Story = {
    args: {
        label: 'Check-box',
        checked: true,
    },
    render: args => {
        const [checked, setChecked] = useState(true)
        const checkRef = useRef<HTMLButtonElement>(null)
        console.log(' checkRef: ', checkRef);
        const handleCheckbox = () => {
            if (checkRef.current) {
                setChecked(!checked)
            }
        }
        return (
            <div>
                <Checkbox {...args} checked={checked} ref={checkRef} onCheckedChange={handleCheckbox}/>
            </div>
        )
    }
}