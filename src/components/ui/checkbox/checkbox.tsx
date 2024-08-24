import {ComponentPropsWithoutRef, ElementRef, forwardRef, useId} from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixLabel from '@radix-ui/react-label'
import CheckmarkOutline from '../../../assets/components/CheckmarkOutline'
import s from './checkbox.module.scss'
import clsx from 'clsx'

type RadixCheckboxProps = typeof RadixCheckbox.Root
export type CheckboxProps = {
    id?: string
    checked?: boolean
    className?: string
    labelText: string
    disabled?: boolean
    errorMsg?: string
    containerClassName?: string
} & ComponentPropsWithoutRef<RadixCheckboxProps>

export const Checkbox = forwardRef<ElementRef<RadixCheckboxProps>, CheckboxProps>(
    ({
         id,
         checked,
         labelText,
         errorMsg,
         className,
         disabled,
         containerClassName,
         ...rest
     },
     ref) => {

        const generatedId = useId()
        const finalId = id ? id : generatedId

        let shadow = s.shadowEnabled
        let noHover = undefined
        let noFocus = undefined
        let labelDisabled = undefined

        switch (true) {
            case disabled:
                shadow = undefined
                noHover = s.checkboxShadowNoHover
                noFocus = s.checkboxShadowNoFocus
                labelDisabled = s.checkboxLabelDisabled
                break
            case checked:
                shadow = s.shadowEnabled
                break
            case !checked:
                shadow = undefined
                break
            default:
                shadow = undefined
        }

        return (
            <div className={clsx(s.CheckboxContainer, s[`${containerClassName}`])}>
                <div className={s.CheckboxBlock}>
                    <div className={clsx(s.checkboxShadow, shadow, noHover, noFocus, className)}>
                        <RadixCheckbox.Root
                            id={finalId}
                            className={clsx(
                                s.checkboxRoot,
                                checked ? '' : s.checkboxUnchecked,
                                errorMsg && s.error
                            )}
                            checked={checked}
                            ref={ref}
                            disabled={disabled}
                            onCheckedChange={rest.onCheckedChange}
                        >
                            <RadixCheckbox.Indicator className={clsx(s.checkboxIndicator)}>
                                <CheckmarkOutline/>
                            </RadixCheckbox.Indicator>
                        </RadixCheckbox.Root>
                    </div>
                    <RadixLabel.Root htmlFor={finalId} className={clsx(s.checkboxLabel, labelDisabled)}>
                        {labelText}
                    </RadixLabel.Root>
                </div>
                <div className={clsx(s.errorMsg, errorMsg && s.show)}>{errorMsg}</div>
            </div>
        )
    }
)
