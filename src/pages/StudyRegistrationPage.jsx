import React, { useState } from 'react';
import styles from './StudyRegistrationPage.module.css';
import TextAreaField from '../components/Registation/TextAreaField';
import InputField from '../components/Registation/InputField';
import PasswordField from '../components/Registation/passwordField';
import BackgroundSelector from '../components/Registation/BackgroundSelector';
import { useNavigate } from 'react-router-dom';

const MIN_PASSWORD_LENGTH = 4;
// const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/;

function StudyRegistrationPage() {
  const [values, setValues] = useState({
    nickName: '',
    studyName: '',
    introduce: '',
    password: '',
    passCheck: '',
  });

  const [errors, setErrors] = useState({
    nickName: '',
    studyName: '',
    introduce: '',
    password: '',
    passCheck: '',
  });

  const [touched, setTouched] = useState({
    nickName: false,
    studyName: false,
    introduce: false,
    password: false,
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
    } else if (name === 'password') {
      return validatePassword(value);
    } else if (name === 'passCheck') {
      return validatePassCheck(value, values.password);
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return '*비밀번호를 입력해 주세요';
    } else if (value.length < MIN_PASSWORD_LENGTH) {
      return `*비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다`;
    } //else if (!PASSWORD_REGEX.test(value)) {
    //return '*영문, 숫자, 특수문자를 모두 포함해야 합니다';
    //}
    return '';
  };

  const validatePassCheck = (value, password) => {
    if (!value.trim()) {
      return '*비밀번호 확인란을 입력해 주세요';
    }
    if (value !== password) {
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
    values.password.trim() !== '' &&
    values.passCheck.trim() !== '' &&
    !errors.nickName &&
    !errors.studyName &&
    !errors.password &&
    !errors.passCheck;

  const [showPass, setShowPass] = useState(false);
  const [showPassCheck, setShowPassCheck] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('입력값을 확인해주세요.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/studies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.studyName,
          nickname: values.nickName,
          description: values.introduce,
          password: values.password,
          bg: selectedBgId ?? 0,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '서버 오류');
      }
      const result = await res.json();
      alert('스터디가 생성되었습니다!');
      // console.log(result);
      navigate(`/view/${result._id}`);
    } catch (err) {
      alert('스터디 생성 실패: ' + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>스터디 만들기</h2>
      <form className={styles.study__create} method="POST" onSubmit={handleSubmit}>
        <InputField
          label="닉네임"
          id="nickName"
          name="nickName"
          value={values.nickName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="닉네임을 입력해주세요"
          error={errors.nickName}
          touched={touched.nickName}
        />

        <InputField
          label="스터디 이름"
          id="studyName"
          name="studyName"
          value={values.studyName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="스터디 이름을 입력해주세요"
          error={errors.studyName}
          touched={touched.studyName}
        />

        <TextAreaField
          label="소개"
          id="introduce"
          name="introduce"
          value={values.introduce}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="소개 멘트를 작성해 주세요"
          error={errors.introduce}
          touched={touched.introduce}
        />

        <BackgroundSelector selectedBgId={selectedBgId} onSelect={setSelectedBgId} />

        <PasswordField
          label="비밀번호"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 입력해 주세요"
          error={errors.password}
          touched={touched.password}
          show={showPass}
          onToggleShow={() => setShowPass((prev) => !prev)}
        />

        <PasswordField
          label="비밀번호 확인"
          id="passCheck"
          name="passCheck"
          value={values.passCheck}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 입력해 주세요"
          error={errors.passCheck}
          touched={touched.passCheck}
          show={showPassCheck}
          onToggleShow={() => setShowPassCheck((prev) => !prev)}
        />

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
