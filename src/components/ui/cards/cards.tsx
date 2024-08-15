import React, { ComponentPropsWithoutRef } from 'react'
import s from './cards.module.scss'
import { clsx } from 'clsx'

export type CardsProps = {
  variant?: 'default'
} & ComponentPropsWithoutRef<'div'>

export function Cards({ variant = 'default', className, ...rest }: CardsProps) {
  return (
    <>
      <div {...rest} className={clsx(s.cardsRoot, s[variant], className)}></div>
    </>
  )
}
