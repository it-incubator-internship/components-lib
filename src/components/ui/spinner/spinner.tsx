import clsx from 'clsx'

import s from './spinner.module.scss'

type Props = {
  className?: string
}
export  function Spinner(props: Props) {
  return (
    <div className={clsx(s.spinWrapper, props.className)}>
      <div className={s.spinner}></div>
    </div>
  )
}
