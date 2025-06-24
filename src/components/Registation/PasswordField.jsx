// components/Registation/PasswordField.jsx
import React from 'react';
import styles from './PasswordField.module.css';
import eyeOn from '../../assets/ic_visibility_on.png';
import eyeOff from '../../assets/ic_visibility_off.png';

function PasswordField({ label, id, name, value, onChange, onBlur, placeholder, error, touched, show, onToggleShow }) {
  return (
    <div className={styles.password__field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.pass__input__box}>
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${styles.input} ${touched && error ? styles.inputError : ''}`}
        />
        <button type="button" className={styles.eye__btn} onClick={onToggleShow} tabIndex={-1}>
          <img src={show ? eyeOn : eyeOff} alt={show ? '비밀번호 숨기기' : '비밀번호 보이기'} />
        </button>
      </div>
      {touched && error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default PasswordField;
