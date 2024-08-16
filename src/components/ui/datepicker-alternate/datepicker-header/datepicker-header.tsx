import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import s from './../datepicker-alternate.module.scss'
import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import { ArrowIosBack, ArrowIosForward } from '@/assets/components'
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'

export const DatepickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
}: ReactDatePickerCustomHeaderProps) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
  }

  const headerText = capitalizeFirstLetter(format(date, 'LLLL y', { locale: enUS }))

  return (
    <div className={classNames.header}>
      <div className={s.headerFooter}>
        <span>{headerText}</span>
        <div className={classNames.buttonBox}>
          <button className={classNames.button} type="button" onClick={decreaseMonth}>
            <ArrowIosBack />
          </button>

          <button className={classNames.button} onClick={increaseMonth}>
            <ArrowIosForward />
          </button>
        </div>
      </div>
    </div>
  )
}
