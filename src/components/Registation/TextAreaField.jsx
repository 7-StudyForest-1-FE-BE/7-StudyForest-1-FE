import React from 'react';
import styles from './TextAreaField.module.css';

function TextAreaField({ label, id, name, value, onChange, onBlur, placeholder, error, touched, ...props }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={styles.textarea}
        {...props}
      />
    </div>
  );
}

export default TextAreaField;
