import React, { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import s from './modal.module.scss'
import { Close } from '@/assets/components'
import { Button } from '@/components/ui'
import { clsx } from 'clsx'

type ModalProps = {
  title?: string
  fullwidthButton?: boolean
  children: ReactNode
  open: boolean
  onClose?: () => void
}

export const Modal = ({ title, children, open, onClose, fullwidthButton }: ModalProps) => {

  function handleModalClosed() {
    onClose?.()
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleModalClosed}>
      {open && (
        <Dialog.Portal>
          <Dialog.Overlay className={s.overlay} />
          <Dialog.Content className={s.content} onOpenAutoFocus={(e) => e.preventDefault()}>
            <header className={s.header}>
              <Dialog.Title asChild>
                <h2 className={s.title}>{title}</h2>
              </Dialog.Title>
              <Dialog.Close asChild><Close /></Dialog.Close>
            </header>
            <div className={s.contentBox}>{children}</div>
            <Dialog.Close asChild>
              <div className={clsx(s.btnBox, fullwidthButton && s.fullwidth)}>
                <Button className={s.btn} fullWidth>OK</Button>
              </div>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}