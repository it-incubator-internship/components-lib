import React, { ReactNode, useEffect, useState } from 'react'
import { Root, Portal, Overlay, Content, Title, Close } from '@radix-ui/react-dialog'
import s from './modal.module.scss'
import { Close as CloseSVG } from '@/assets/components'
import { Button } from '@/components/ui'
import { clsx } from 'clsx'

type ModalProps = {
  title?: string
  buttonTitle?: string
  fullwidthButton?: boolean
  children: ReactNode
  open: boolean
  onClose?: () => void
}

export const Modal = ({ title, children, open, onClose, fullwidthButton, buttonTitle = 'OK' }: ModalProps) => {
  const [playAnimation, setPlayAnimation] = useState<'start' | 'end' | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (open) {
      setPlayAnimation('start')
      setIsOpen(true)
    }
    if (!open) {
      setPlayAnimation('end')
      setTimeout(() => {
        setIsOpen(false)
      }, 200)
    }
  }, [open])


  function handleModalClosed() {
    onClose?.()
  }

  return (
    <Root open={isOpen} onOpenChange={handleModalClosed}>
      {isOpen && (
        <Portal>
          <Overlay className={s.overlay} />
          <Content className={clsx(s.content, playAnimation === 'start' && s.startAnimation, playAnimation === 'end' && s.endAnimation)} onOpenAutoFocus={(e) => e.preventDefault()}>
            {title && (
              <header className={s.header}>
                <Title asChild>
                  <h2 className={s.title}>{title}</h2>
                </Title>
                <Close asChild><CloseSVG /></Close>
              </header>
            )}
            <div className={s.contentBox}>{children}</div>
            <Close asChild>
              <div className={clsx(s.btnBox, fullwidthButton && s.fullwidth)}>
                <Button className={s.btn} fullWidth>{buttonTitle}</Button>
              </div>
            </Close>
          </Content>
        </Portal>
      )}
    </Root>
  )
}