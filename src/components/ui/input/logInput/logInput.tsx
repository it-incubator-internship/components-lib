import React, { useState } from 'react'
import styles from './logInput.module.css'
import { EyeOutline } from '../../../../assets/components'

interface InputProps {
  state: 'default' | 'error' | 'disabled'
  errorMsg?: string
}

const Input: React.FC<InputProps> = ({ state, errorMsg }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form>
      <div className={`${styles.inputContainer} ${isFocused ? styles.active : ''}`}>
        <div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Epam@epam.com"
              className={`${styles[state]} ${styles.inputField}`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={state === 'disabled'}
              name="email"
              required
            />
            <div
              className={`${styles.errorMsg} ${state === 'error' && errorMsg ? styles.show : ''}`}
            >
              {errorMsg}
            </div>
          </div>
          <label htmlFor="password">Password</label>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <EyeOutline className={styles.icon} type="button" onClick={toggleShowPassword} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`${styles[state]} ${styles.inputField} ${styles.inputFieldWithIcon}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={state === 'disabled'}
                name="password"
                required
              />
            </div>
            <div
              className={`${styles.errorMsg} ${state === 'error' && errorMsg ? styles.show : ''}`}
            >
              {errorMsg}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Input
