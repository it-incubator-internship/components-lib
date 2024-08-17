import React, { ComponentProps, forwardRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.min.css'
import ReactDatepicker from 'react-datepicker'
import { clsx } from 'clsx'
import { Calendar as CalendarIcon, CalendarOutline } from '../../../assets/components'
import { FieldValues } from 'react-hook-form'

import textFieldStyles from '../input/input.module.scss'
import s from './datepicker-alternate.module.scss'
import { DatepickerHeader } from './datepicker-header/datepicker-header'
import { formatWeekDay } from '@/lib/formatWeekDay'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'


type SingleDatePickerProps = {
  isRange?: never;
  isMultiple?: never;
  endDate?: never
  setEndDate?: never
  selectedDates?: never
  setSelectedDate?: never

}

type RangeDatePickerProps = {
  isRange: true;
  endDate: Date | undefined
  setEndDate: (date: Date | undefined) => void
  isMultiple?: never;
  selectedDates?: never
  setSelectedDate?: never
}

type MultipleDatePickerProps = {
  isMultiple: true;
  selectedDates: Date[]
  setSelectedDate: (date: Date[]) => void
  isRange?: never;
  endDate?: never
  setEndDate?: never
}

export type DatePickerAlternateProps = {
  startDate: Date | undefined
  setStartDate: (date: Date | undefined) => void
  placeholder?: string
  label?: string
  errorMessage?: string
  disabled?: boolean
} & (SingleDatePickerProps | RangeDatePickerProps | MultipleDatePickerProps) & ComponentProps<'div'>

export const DatepickerAlternate = forwardRef<FieldValues, DatePickerAlternateProps>(
  ({
    isRange,
    isMultiple,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedDates,
    setSelectedDate,
    placeholder,
    label,
    errorMessage,
    disabled,
    className,
    ...rest
  }) => {


    const showError = !!errorMessage && errorMessage.length > 0

    const [isOpened, setIsOpened] = useState(false)

    const classNames = {
      root: clsx(s.root, className),
      inputContainer: s.inputContainer,
      input: clsx(s.input, textFieldStyles.inputField, showError && s.error, isRange && s.range),
      calendar: s.calendar,
      popper: s.popper,
      errorText: s.errorText,
      day: (date: Date) => date ? s.day as string : '',
    }

    const handleCalendarOpen = () => {
      setIsOpened(true)
    }
    const handleCalendarClose = () => {
      setIsOpened(false)
    }

    const singleHandler = (date: Date): void => {
      setStartDate(date)
    }
    const rangeHandler = (date: [Date | undefined, Date | undefined]): void => {
      const [start, end] = date
      setStartDate(start)
      if (setEndDate) {setEndDate(end)}
    }

    const multipleHandler = (dates: Date[]): void => {
      if (setSelectedDate) {setSelectedDate(dates)}
    }

    const getDatepickerModeProp = () => {
      if (isRange) {
        return {
          selected: startDate,
          selectsRange: true as const,
          startDate: startDate,
          endDate: endDate,
          shouldCloseOnSelect: false,
          onChange: rangeHandler as (date: [Date | null, Date | null], event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void,
        }
      }
      if (isMultiple) {
        return {
          selectsMultiple: true as const,
          selectedDates: selectedDates,
          shouldCloseOnSelect: false,
          disabledKeyboardNavigation: true,
          onChange: multipleHandler as (date: Date[] | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void,
        }
      }
      return {
        selected: startDate,
        onChange: singleHandler as (date: Date | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void,
      }
    }
    console.log(startDate)
    return (
      <div className={classNames.root} {...rest}>
        <ReactDatepicker
          {...(getDatepickerModeProp())}
          formatWeekDay={formatWeekDay}
          placeholderText={placeholder}
          renderCustomHeader={params => <DatepickerHeader {...params} />}
          customInput={
            <CustomInput
              isOpened={isOpened}
              error={errorMessage}
              disabled={disabled}
              label={label}
            />
          }
          onCalendarClose={handleCalendarClose}
          onCalendarOpen={handleCalendarOpen}
          calendarClassName={classNames.calendar}
          className={classNames.input}
          popperClassName={classNames.popper}
          dayClassName={classNames.day}
          dateFormat="dd/MM/yyyy"
          showPopperArrow={false}
          calendarStartDay={1}
          disabled={disabled}
          popperModifiers={[
            {
              name: 'offset',
              fn(state) {
                return { ...state, x: 0, y: 400 }
              },
            },
          ]}
        />
        <div className={s.errorContainer}>
          {showError && (
            <div style={{ display: 'flex' }}>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    )
  },
)
type CustomInputProps = {
  disabled?: boolean
  label?: string
  error?: string
  isOpened: boolean
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, disabled, isOpened, ...rest }, ref) => {
    const classNames = {
      inputContainer: clsx(s.inputContainer, error && s.error),
      icon: clsx(s.icon, disabled && s.disabled),
    }

    return (
      <Label className={s.label} label={label}>
        <div className={classNames.inputContainer}>
          <input ref={ref} disabled={disabled} {...rest} />
          <div className={cn(classNames.icon, error && s.errorText)}>
            {isOpened ? <CalendarIcon /> : <CalendarOutline />}
          </div>
        </div>
      </Label>
    )
  },
)
