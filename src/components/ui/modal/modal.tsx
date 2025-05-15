import React, { ReactNode, useEffect, useState } from 'react'
import { Root, Portal, Overlay, Content, Title, Close } from '@radix-ui/react-dialog'
import s from './modal.module.scss'
import { Close as CloseSVG } from '@/assets/components'
import { Button, Checkbox } from '@/components/ui'
import { clsx } from 'clsx'

type ModalProps = {
  title?: string
  buttonTitle?: string
  fullwidthButton?: boolean
  children: ReactNode
  open: boolean
  onClose?: () => void
  //props for modal with confirmation
  withConfirmation?: boolean
  withAgreement?: boolean
  buttonRejectionTitle?: string
  agreementTitle?: string
  onCloseWithApproval?: () => void
  onCloseWithoutApproval?: () => void
}

export const Modal = ({
  withConfirmation,
  agreementTitle,
  withAgreement,
  title,
  children,
  open,
  onClose,
  onCloseWithApproval,
  onCloseWithoutApproval,
  fullwidthButton,
  buttonTitle = 'OK',
  buttonRejectionTitle = 'NO',
}: ModalProps) => {
  const [playAnimation, setPlayAnimation] = useState<'start' | 'end' | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAgreed, setIsAgreed] = useState<boolean>(false)

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

  function handleModalCloseWithApproval() {
    onCloseWithApproval?.()
  }

  function handleModalCloseWithoutApproval() {
    onCloseWithoutApproval?.()
  }

  const handleIsAgreed = (newValue: boolean) => {
    setIsAgreed(newValue)
  }

  return (
    <Root open={isOpen} onOpenChange={handleModalClosed}>
      {isOpen && (
        <Portal>
          <Overlay className={s.overlay} />
          <Content
            className={clsx(
              s.content,
              playAnimation === 'start' && s.startAnimation,
              playAnimation === 'end' && s.endAnimation
            )}
            onOpenAutoFocus={e => e.preventDefault()}
          >
            {title && (
              <header className={s.header}>
                <Title asChild>
                  <h2 className={s.title}>{title}</h2>
                </Title>
                <Close asChild>
                  <CloseSVG />
                </Close>
              </header>
            )}
            <div className={s.contentBox}>{children}</div>
            {withAgreement && (
              <div className={s.withAgreement}>
                <div className={s.withAgreementBlock}>
                  <Checkbox id={'agreement'} checked={isAgreed} onCheckedChange={handleIsAgreed} />
                  <label htmlFor="agreement">{agreementTitle}</label>
                </div>
                <Close asChild>
                  <div className={clsx(s.btnBox)}>
                    <Button
                      onClick={handleModalCloseWithApproval}
                      variant={'primary'}
                      className={clsx(s.btn, s.buttonConfirm)}
                      fullWidth
                      disabled={withAgreement && !isAgreed}
                    >
                      {buttonTitle}
                    </Button>
                  </div>
                </Close>
              </div>
            )}
            {!withAgreement && (
              <Close asChild>
                <div
                  className={clsx(
                    s.btnBox,
                    fullwidthButton && s.fullwidth,
                    withAgreement && s.withAgreement
                  )}
                >
                  <Button
                    onClick={withConfirmation ? handleModalCloseWithApproval : handleModalClosed}
                    variant={withConfirmation ? 'outlined' : 'primary'}
                    className={clsx(s.btn, withConfirmation && s.buttonConfirm)}
                    fullWidth
                    disabled={withAgreement && !isAgreed}
                  >
                    {buttonTitle}
                  </Button>
                  {withConfirmation && (
                    <Button
                      className={clsx(s.btn, withConfirmation && s.buttonConfirm)}
                      onClick={handleModalCloseWithoutApproval}
                      fullWidth
                    >
                      {buttonRejectionTitle}
                    </Button>
                  )}
                </div>
              </Close>
            )}
          </Content>
        </Portal>
      )}
    </Root>
  )
}
