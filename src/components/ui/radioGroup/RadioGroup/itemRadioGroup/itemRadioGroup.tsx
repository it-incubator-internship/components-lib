import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import s from '@/components/ui/radioGroup/RadioGroup/radioGroup.module.scss'


type Props = {
	asChild?: boolean
	variant?: 'primary' | 'secondary' | 'outlined' | 'ghost'
	fullWidth?: boolean
 }
export const ItemRadioGroup = () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={s.RadioGroupItem} value="compact" id="r3">
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.Label} htmlFor="r3">
          Compact
        </label>
      </div>
);

