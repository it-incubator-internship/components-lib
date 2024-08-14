import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'
import s from './scroll.module.scss'

type ScrollProps = {
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>

export const Scroll = forwardRef<HTMLDivElement, ScrollProps>(({ children, ...rest }, ref) => {
  return (
    <div ref={ref} className={clsx(s.scrollContainer)} {...rest}>
      {children}
    </div>
  )
})
