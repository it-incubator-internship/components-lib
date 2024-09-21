import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import s from './textarea.module.scss'
import clsx from 'clsx'

export type Props = {
  titleLabel?: string
  error?: string
  className?: string
} & ComponentPropsWithoutRef<'textarea'>
//message: string
export const Textarea = forwardRef<ElementRef<'textarea'>, Props>(
  ({ error, titleLabel, ...rest }, ref) => {
    const htmlForMessage = 'message'
    return (
      <div className={clsx(s.textareaRoot, rest.className)}>
        <label className={s.textAreaLabel} htmlFor={htmlForMessage}>
          {titleLabel}
        </label>
        <textarea
          className={clsx(s.textArea, error && s.errorBorder)}
          placeholder={rest.placeholder}
          id={htmlForMessage}
          ref={ref}
          disabled={rest.disabled}
        />
        {error && <span className={s.textAreaError}>{error}</span>}
      </div>
    )
  }
)
