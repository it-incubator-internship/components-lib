import { useState, forwardRef, ComponentPropsWithoutRef, useId } from 'react'
import styles from './input.module.scss'
import { EyeOutline } from '../../../assets/components'
import Search from '../../../assets/components/Search'
import clsx from 'clsx'

export type InputProps = {
  errorMsg?: string
  type?: 'password' | 'search' | 'email' | 'text'
  label?: string
  placeholder?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, errorMsg, type = 'text', label, placeholder, ...rest }, ref) => {
    const generatedId = useId()
    const finalId = id ? id : generatedId
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className={`${styles.inputContainer} ${isFocused ? styles.active : ''}`}>
        <div>
          {label && (
            <label className={styles.label} htmlFor={finalId}>
              {label}
            </label>
          )}
          <div className={clsx(styles.inputContainer, isFocused && styles.active)}>
            <input
              id={finalId}
              ref={ref}
              type={type === 'password' && showPassword ? 'text' : type}
              placeholder={placeholder}
              className={clsx(
                styles.inputField,
                type === 'search' && styles.inputSearch,
                errorMsg && styles.error,
                rest.disabled && styles.disabled
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={rest.disabled}
              {...rest}
            />
            {type === 'search' && <Search className={styles.iconSearch} />}
            {type === 'password' && (
              <EyeOutline
                onClick={() => setShowPassword(!showPassword)}
                className={styles.iconPass}
              />
            )}
          </div>
          <div className={`${styles.errorMsg} ${errorMsg ? styles.show : ''}`}>{errorMsg}</div>
        </div>
      </div>
    )
  }
)
