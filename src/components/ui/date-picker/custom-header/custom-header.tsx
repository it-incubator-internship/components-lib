import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import s from '../temp.module.scss'
import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import { ArrowBackOutline, ArrowForwardOutline } from '@/assets/components'
import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'

export const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
}: ReactDatePickerCustomHeaderProps) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
  }

  const headerText = capitalizeFirstLetter(format(date, 'LLLL Y', { locale: enUS }))

  return (
    <div className={classNames.header}>
      <div className={s.headerFooter}>
        <span>{headerText}</span>
        <div className={classNames.buttonBox}>
          <button className={classNames.button} type="button" onClick={decreaseMonth}>
            <ArrowBackOutline />
          </button>

          <button className={classNames.button} onClick={increaseMonth}>
            <ArrowForwardOutline />
          </button>
        </div>
      </div>
    </div>
  )
}
