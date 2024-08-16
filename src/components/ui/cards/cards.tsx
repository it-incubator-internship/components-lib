import React, { ComponentPropsWithoutRef } from 'react'
import s from './cards.module.scss'
import { clsx } from 'clsx'

export type CardsProps = ComponentPropsWithoutRef<'div'>

export function Cards({ className, ...rest }: CardsProps) {
  return (
    <>
      <div {...rest} className={clsx(s.cardsRoot, className)}></div>
    </>
  )
}
