import { useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import styles from './searchInput.module.scss'
import Search from '../../../../assets/components/Search'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  state: 'default' | 'error' | 'disabled'
  errorMsg?: string
}

const Input = forwardRef<ElementRef<'input'>, InputProps>(
  ({ type, placeholder, state, errorMsg, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <>
        <div className={clsx(styles.inputContainer, isFocused && styles.active)}>
          <input
            type={type}
            placeholder={placeholder}
            className={clsx(styles.inputField, styles[state])}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={state === 'disabled'}
            ref={ref}
            {...rest}
          />
          <Search className={styles.icon} />
        </div>
        {state === 'error' && errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
      </>
    )
  }
)

export default Input
