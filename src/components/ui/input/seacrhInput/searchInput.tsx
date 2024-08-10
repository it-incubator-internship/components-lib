import React, { useState } from 'react'
import styles from './searchInput.module.scss'
import Search from '../../../../assets/components/Search'

interface InputProps {
  type: string
  placeholder: string
  state: 'default' | 'error' | 'disabled'
  errorMsg?: string
}

const Input: React.FC<InputProps> = ({ type, placeholder, state, errorMsg }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <div className={`${styles.inputContainer} ${isFocused ? styles.active : ''}`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`${styles[state]} ${styles.inputField}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={state === 'disabled'}
        />
        <Search className={styles.icon} />
      </div>
      {state === 'error' && errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
    </>
  )
}

export default Input
