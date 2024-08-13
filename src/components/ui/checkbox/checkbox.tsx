import {ComponentPropsWithoutRef, ElementRef, forwardRef} from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixLabel from '@radix-ui/react-label'
import {CheckIcon} from "@radix-ui/react-icons";
import s from './checkbox.module.scss'
import clsx from 'clsx';


type RadixCheckboxProps = typeof RadixCheckbox.Root;
type Props = {
    checked: boolean,
    label: string,
} & ComponentPropsWithoutRef<RadixCheckboxProps>

export const Checkbox = forwardRef<ElementRef<RadixCheckboxProps>, Props>(
    ({checked, label, ...rest}, ref) => {
        return (
            <div className={clsx(s.CheckboxContainer)}>
                <RadixCheckbox.Root
                    className={clsx(s.CheckboxRoot)}
                    checked={checked}
                    ref={ref}
                    disabled={rest.disabled}
                    onCheckedChange={rest.onCheckedChange}
                >
                    <RadixCheckbox.Indicator className={clsx(s.CheckboxIndicator)}>
                        <CheckIcon/>
                    </RadixCheckbox.Indicator>
                </RadixCheckbox.Root>
                <RadixLabel.Root className={clsx(s.Label)}>
                    {label}
                </RadixLabel.Root>
            </div>
        )
    }
)
