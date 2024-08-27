import { ComponentPropsWithoutRef } from 'react'
import s from './recaptcha.module.scss'
import { clsx } from 'clsx'

import Recaptchalogo1 from '@/assets/components/Recaptchalogo1'
import CheckmarkOutline from '@/assets/components/CheckmarkOutline'

export type RecaptchaProps = {
  errorMsg?: string
  isError?: boolean
  expiredMsg?: string
  isExpired?: boolean
  type?: 'default' | 'checked' | 'loading'
  label?: string
} & ComponentPropsWithoutRef<'div'>

export const Recaptcha = ({
  className,
  label,
  type = 'default',
  isExpired,
  expiredMsg,
  isError,
  errorMsg,
  ...rest
}: RecaptchaProps) => {
  return (
    <div {...rest} className={clsx(isError && s.error)}>
      <div className={clsx(s.recaptchaRoot, className)}>
        {isExpired && <div className={expiredMsg ? s.expiredMsg : ''}>{expiredMsg}</div>}
        <div className={clsx(s[type], className)}>
          <label className={s.containerLeft}>
            {type === 'default' && (
              <input className={s.checkbox} type="checkbox" name="checkbox" id="checkbox" />
            )}
            {type === 'checked' && (
              <div className={s.checkedIcon}>
                <CheckmarkOutline />
              </div>
            )}
            {type === 'loading' && (
              <div className={s.loadingIcon}>
                <span className={s.loader}></span>
              </div>
            )}
            {label && <div className={s.label}>{label}</div>}
          </label>

          <div className={s.containerRight}>
            <Recaptchalogo1 className={s.logo} />
            <p className={s.privacy}>
              <a href="#">Privacy</a> - Terms
            </p>
          </div>
        </div>
      </div>
      {isError && <div className={s.errorMsg}>{errorMsg}</div>}
    </div>
  )
}
