import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import s from '@/components/ui/radioGroup/RadioGroup/radioGroup.module.scss'
import { ItemRadioGroup } from './itemRadioGroup/itemRadioGroup';

type Props = {
	asChild?: boolean
	variant?: 'primary' | 'secondary' | 'outlined' | 'ghost'
	fullWidth?: boolean
 }
export const RadioGroupUiKit = () => (
  <form>
    <RadioGroup.Root className={s.RadioGroupRoot} defaultValue="default" aria-label="View density">
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={s.RadioGroupItem} value="default" id="r1" disabled>
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.Label} htmlFor="r1">
          Default
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={s.RadioGroupItem} value="comfortable" id="r2" disabled>
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.Label} htmlFor="r2">
          Comfortable
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RadioGroup.Item className={s.RadioGroupItem} value="compact" id="r3">
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.Label} htmlFor="r3">
          Compact
        </label>
      </div> */}
		<ItemRadioGroup/>
		<ItemRadioGroup/>
    </RadioGroup.Root>
  </form>
);

