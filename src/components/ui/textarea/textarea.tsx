import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import s from '@/components/ui/textarea/textarea.module.scss'
import clsx from 'clsx'

type Props = {
  titleLabel?: string
  error?: string
} & ComponentPropsWithoutRef<'textarea'>
//message: string
export const Textarea = forwardRef<ElementRef<'textarea'>, Props>(
  ({ error, titleLabel, ...rest }, ref) => {
    const htmlForMessage = 'message'
    return (
      <div className={s.textareaRoot}>
        <label className={s.textAreaLabel} htmlFor={htmlForMessage}>
          {titleLabel}
        </label>
        <textarea
          className={clsx(s.textArea, error && s.errorBorder)}
          placeholder={titleLabel}
          id={htmlForMessage}
          ref={ref}
          disabled={rest.disabled}
        />
        {error && <span className={s.textAreaError}>{error}</span>}
      </div>
    )
  }
)
