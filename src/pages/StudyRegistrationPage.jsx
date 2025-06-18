import React, { useState } from 'react';
import styles from './StudyRegistrationPage.module.css';
import bg1 from '../assets/background/bg1.jpg';
import bg2 from '../assets/background/bg2.jpg';
import bg3 from '../assets/background/bg3.jpg';
import bg4 from '../assets/background/bg4.jpg';
import pawIcon from '../assets/sticker/gray_bg_selected.svg';
import eyeOn from '../assets/ic_visibility_on.png';
import eyeOff from '../assets/ic_visibility_off.png';

const MIN_PASSWORD_LENGTH = 4;
// const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/;

function StudyRegistrationPage() {
  //배경선택
  const backgrounds = [
    { id: 1, color: '#d7e8da' },
    { id: 2, color: '#f7e9b7' },
    { id: 3, color: '#ddeef6' },
    { id: 4, color: '#f9e3ea' },
    { id: 5, image: bg1 },
    { id: 6, image: bg2 },
    { id: 7, image: bg3 },
    { id: 8, image: bg4 },
  ];

  const [values, setValues] = useState({
    nickName: '',
    studyName: '',
    introduce: '',
    passInput: '',
    passCheck: '',
  });

  const [errors, setErrors] = useState({
    nickName: '',
    studyName: '',
    introduce: '',
    passInput: '',
    passCheck: '',
  });

  const [touched, setTouched] = useState({
    nickName: false,
    studyName: false,
    introduce: false,
    passInput: false,
    passCheck: false,
  });

  const validateField = (name, value) => {
    if (name === 'nickName') {
      if (!value.trim()) {
        return '*닉네임을 입력해 주세요';
      }
    } else if (name === 'studyName') {
      if (!value.trim()) {
        return '*스터디 이름을 입력해 주세요';
      }
    } else if (name === 'passInput') {
      return validatePassword(value);
    } else if (name === 'passCheck') {
      return validatePassCheck(value, values.passInput);
    }
    return '';
  };

  const validatePassword = (value) => {
    if (value === 'passInput' && !value.trim()) {
      return '*비밀번호를 입력해 주세요';
    } else if (value.length < MIN_PASSWORD_LENGTH) {
      return `*비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다`;
    } //else if (!PASSWORD_REGEX.test(value)) {
    //return '*영문, 숫자, 특수문자를 모두 포함해야 합니다';
    //}
    return '';
  };

  const validatePassCheck = (value, passInput) => {
    if (!value.trim()) {
      return '*비밀번호 확인을 입력해 주세요';
    }
    if (value !== passInput) {
      return '*비밀번호가 일치하지 않습니다';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, values[name]),
    }));
  };

  const [selectedBgId, setSelectedBgId] = useState(null);

  const isFormValid =
    values.nickName.trim() !== '' &&
    values.studyName.trim() !== '' &&
    selectedBgId !== null &&
    values.passInput.trim() !== '' &&
    values.passCheck.trim() !== '' &&
    !errors.nickName &&
    !errors.studyName &&
    !errors.passInput &&
    !errors.passCheck;

  const [showPass, setShowPass] = useState(false);
  const [showPassCheck, setShowPassCheck] = useState(false);

  return (
    <div className={styles.container}>
      <h2>스터디 만들기</h2>
      <form className={styles.study__create} method="POST">
        <div className={styles.nick__name}>
          <label htmlFor="nickName">닉네임</label>
          <input
            id="nickName"
            name="nickName"
            value={values.nickName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="닉네임을 입력해 주세요"
            className={`${styles.input} ${touched.nickName && errors.nickName ? styles.input__error : ''}`}
          />
          {touched.nickName && errors.nickName && <div className={styles.error__msg}>{errors.nickName}</div>}
        </div>

        <div className={styles.study__name}>
          <label htmlFor="studyName">스터디 이름</label>
          <input
            id="studyName"
            name="studyName"
            value={values.studyName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="스터디 이름을 입력해주세요"
            className={`${styles.input} ${touched.studyName && errors.studyName ? styles.input__error : ''}`}
          />
          {touched.studyName && errors.studyName && <div className={styles.error__msg}>{errors.studyName}</div>}
        </div>

        <div className={styles.introduction}>
          <label htmlFor="introduce">소개</label>
          <textarea id="introduce" placeholder="소개 멘트를 작성해 주세요" />
        </div>
        <div className={styles.choice__background}>
          <label>배경을 선택해주세요</label>
          <div className={styles.background__items}>
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                type="button"
                className={`${styles.background__item} ${selectedBgId === bg.id ? styles.selected : ''}`}
                style={bg.color ? { background: bg.color } : bg.image ? { backgroundImage: `url(${bg.image})` } : {}}
                onClick={() => setSelectedBgId(bg.id)}
              >
                {selectedBgId === bg.id && <img src={pawIcon} alt="선택됨" className={styles.paw__icon} />}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.password}>
          <label htmlFor="passInput">비밀번호</label>
          <div className={styles.input__box}>
            <input
              id="passInput"
              name="passInput"
              type={showPass ? 'text' : 'password'}
              value={values.passInput}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="비밀번호를 입력해 주세요"
              className={`${styles.pass__input} ${touched.passInput && errors.passInput ? styles.input__error : ''}`}
            />
            <button
              type="button"
              className={styles.eye__btn}
              onClick={() => setShowPass((prev) => !prev)}
              tabIndex={-1}
            >
              <img src={showPass ? eyeOn : eyeOff} alt={showPass ? '비밀번호 숨기기' : '비밀번호 보이기'} />
            </button>
          </div>
          {touched.passInput && errors.passInput && <div className={styles.error__msg}>{errors.passInput}</div>}
        </div>
        <div className={styles.password__check}>
          <label htmlFor="passCheck">비밀번호 확인</label>
          <div className={styles.input__box}>
            <input
              id="passCheck"
              name="passCheck"
              type={showPassCheck ? 'text' : 'password'}
              value={values.passCheck}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="비밀번호를 입력해 주세요"
              className={`${styles.pass__input} ${touched.passCheck && errors.passCheck ? styles.input__error : ''}`}
            />
            <button
              type="button"
              className={styles.eye__btn}
              onClick={() => setShowPassCheck((prev) => !prev)}
              tabIndex={-1}
            >
              <img src={showPassCheck ? eyeOn : eyeOff} alt={showPassCheck ? '비밀번호 숨기기' : '비밀번호 보이기'} />
            </button>
          </div>
          {touched.passCheck && errors.passCheck && <div className={styles.error__msg}>{errors.passCheck}</div>}
        </div>
        <div className={styles.submit__btn}>
          <button
            className={`${styles.study__create__btn} ${!isFormValid ? styles.disabled : ''} `}
            type="submit"
            disabled={!isFormValid}
          >
            만들기
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudyRegistrationPage;
