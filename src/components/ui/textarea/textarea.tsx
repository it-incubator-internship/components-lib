import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import s from '@/components/ui/textarea/textarea.module.scss'
import clsx from 'clsx'


type Props = {
  message?: string
  error?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<'textarea'>

export const Textarea = forwardRef<ElementRef<'textarea'>, Props>(
  ({ message, error, disabled,  ...rest }, ref) => {
	const htmlForMessage ='message'
    return (
		<div className={ s.textareaRoot }>
			<label className={ s.textAreaLabel } htmlFor={ htmlForMessage }>{ message }</label>
			<textarea className={ clsx(s.textArea, error && s.errorBorder)  } placeholder={ message } id={ htmlForMessage } ref={ref} disabled={ disabled }/>
			{error &&  <span className={ s.textAreaError } >{ error }</span>}
    </div>
    )
  }
)