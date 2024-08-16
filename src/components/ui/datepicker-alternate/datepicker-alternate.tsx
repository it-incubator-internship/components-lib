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
import { addDays } from 'date-fns'


type SingleDatePickerProps = {
  isRange?: never;
  isMultiple?: never;
}

type RangeDatePickerProps = {
  isRange: true;
  isMultiple?: never;
}

type MultipleDatePickerProps = {
  isRange?: never;
  isMultiple: true;
}

export type DatePickerAlternateProps = {
  placeholder?: string
  startDate?: Date | null
  endDate?: Date | null
  label?: string
  errorMessage?: string
  disabled?: boolean
} & (SingleDatePickerProps | RangeDatePickerProps | MultipleDatePickerProps) & ComponentProps<'div'>

export const DatepickerAlternate = forwardRef<FieldValues, DatePickerAlternateProps>(
  ({
    isRange,
    isMultiple,
    startDate,
    endDate,
    placeholder,
    label,
    errorMessage,
    disabled,
    className,
    ...rest
  }) => {
    const [selectedStartDate, setSelectedStartDate] = useState<Date>(startDate || new Date())
    const [selectedEndDate, setSelectedEndDate] = useState<Date>(endDate || addDays(selectedStartDate, 5))
    const [selectedMultiply, setSelectedMultiply] = useState<Date[]>([selectedStartDate])

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
      setSelectedStartDate(date)
    }

    const rangeHandler = (date: [Date, Date]): void => {
      const [start, end] = date
      setSelectedStartDate(start)
      setSelectedEndDate(end)
    }

    const multipleHandler = (dates: Date[]): void => {
      setSelectedMultiply(dates)
    }

    const getDatepickerModeProp = () => {
      if (isRange) {
        return {
          selectsRange: true as const,
          startDate: selectedStartDate,
          endDate: selectedEndDate,
          shouldCloseOnSelect: false,
          onChange: rangeHandler as (date: [Date | null, Date | null], event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void,
        }
      }
      if (isMultiple) {
        return {
          selectsMultiple: true as const,
          selectedDates: selectedMultiply,
          shouldCloseOnSelect: false,
          disabledKeyboardNavigation: true,
          onChange: multipleHandler as (date: Date[] | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void,
        }
      }
      return {
        selected: selectedStartDate,
        onChange: singleHandler as (date: Date | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void,
      }
    }

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
