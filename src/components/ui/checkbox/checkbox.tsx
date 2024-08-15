import {ComponentPropsWithoutRef, ElementRef, forwardRef} from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixLabel from '@radix-ui/react-label'
import CheckmarkOutline from "../../../assets/components/CheckmarkOutline";
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
            <div className={clsx(s.checkboxContainer)}>
                <div className={clsx(s.checkboxShadow, checked ? s.shadowEnabled : '')}>
                    <RadixCheckbox.Root
                        className={clsx(s.checkboxRoot, checked ? "" : s.checkboxUnchecked)}
                        checked={checked}
                        ref={ref}
                        disabled={rest.disabled}
                        onCheckedChange={rest.onCheckedChange}>
                        <RadixCheckbox.Indicator className={clsx(s.checkboxIndicator)}>
                            <CheckmarkOutline/>
                        </RadixCheckbox.Indicator>
                    </RadixCheckbox.Root>
                </div>
                <RadixLabel.Root className={clsx(s.checkboxLabel)}>
                    {label}
                </RadixLabel.Root>
            </div>
        )
    }
)