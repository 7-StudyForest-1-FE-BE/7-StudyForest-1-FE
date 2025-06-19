import React from 'react';
import styles from './InputField.module.css';

function InputField({ label, id, name, value, onChange, onBlur, placeholder, error, touched, className, ...props }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${styles.input} ${className || ''} ${touched && error ? styles.inputError : ''}`}
        {...props}
      />
      {touched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default InputField;
