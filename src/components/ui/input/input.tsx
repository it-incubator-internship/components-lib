import { useState, forwardRef, ComponentPropsWithoutRef } from 'react'
import styles from './input.module.scss'
import { EyeOutline } from '../../../assets/components'
import Search from '../../../assets/components/Search'
import clsx from 'clsx'

type InputProps = {
  state: 'default' | 'error' | 'disabled'
  errorMsg?: string
  type: 'password' | 'search' | 'email' | 'text'
  label?: 'Email' | 'Password'
  placeholder: 'Email' | 'Password' | 'Input search'
  onToggleShowPassword?: () => void
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ state, errorMsg, type, label, placeholder, onToggleShowPassword, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    return (
      <form>
        <div className={`${styles.inputContainer} ${isFocused ? styles.active : ''}`}>
          <div>
            {label && <div className={styles.label}>{label}</div>}
            <div className={clsx(styles.inputContainer, isFocused && styles.active)}>
              <input
                ref={ref}
                type={type === 'password' && showPassword ? 'text' : type}
                placeholder={placeholder}
                className={clsx(
                  styles.inputField,
                  styles[state],
                  type === 'search' && styles.inputSearch
                )}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={state === 'disabled'}
                {...rest}
              />
              {type === 'search' && <Search className={styles.iconSearch} />}
              {label === 'Password' && (
                <EyeOutline
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.iconPass}
                />
              )}
            </div>
            <div
              className={`${styles.errorMsg} ${state === 'error' && errorMsg ? styles.show : ''}`}
            >
              {errorMsg}
            </div>
          </div>
        </div>
      </form>
    )
  }
)

export default Input
