import React, { ComponentPropsWithoutRef } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import s from '@/components/ui/radioGroup/RadioGroup/radioGroup.module.scss'
import clsx from 'clsx'

type Props = {
  title: string
  id?: string
  className?: string
  disabled?: boolean
} & Omit<ComponentPropsWithoutRef<typeof RadioGroup.Item>, 'value' | 'id'>
export const ItemRadioGroup = ({ title, id, className, ...rest }: Props) => {
  const idItemRadioGroup = id ? id : `id-${Date.now()}`
  const classesLabelDisabled = rest.disabled ? s.LabelColorDisabled : ''
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label className={clsx(s.Label, classesLabelDisabled)}>
        <RadioGroup.Item
          className={clsx(s.RadioGroupItem, className)}
          value={title}
          id={idItemRadioGroup}
          {...rest}
        >
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        {title}
      </label>
    </div>
  )
}
