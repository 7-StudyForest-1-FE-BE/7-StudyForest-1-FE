import React, { useState } from 'react';
import styles from './StudyEditPage.module.css';
import TextAreaField from '../components/Registation/TextAreaField';
import InputField from '../components/Registation/InputField';
import PasswordField from '../components/Registation/passwordField';
import BackgroundSelector from '../components/Registation/BackgroundSelector';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UpdateSuccessModal from '../components/Modal/UpdateSuccessModal';

const MIN_PASSWORD_LENGTH = 4;
// const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/;

function StudyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const isPasswordEditing = values.password.trim() || values.passCheck.trim();

  const isFormValid =
    values.nickName.trim() !== '' &&
    values.studyName.trim() !== '' &&
    selectedBgId !== null &&
    !errors.nickName &&
    !errors.studyName &&
    (!isPasswordEditing || // 비밀번호 입력 안 하면 true
      (values.password.trim() !== '' && values.passCheck.trim() !== '' && !errors.password && !errors.passCheck));

  const [showPass, setShowPass] = useState(false);
  const [showPassCheck, setShowPassCheck] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('입력값을 확인해주세요.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/studies/${id}`, {
        method: 'PATCH',
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
      setShowUpdateModal(true);
      // navigate(`/view/${result._id}`);
    } catch (err) {
      alert('스터디 생성 실패: ' + err.message);
    }
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    navigate(`/view/${id}`);
  };

  useEffect(() => {
    async function fetchStudy() {
      try {
        const res = await fetch(`${API_URL}/api/studies/${id}`);
        if (!res.ok) throw new Error('스터디 정보 조회 실패');
        const data = await res.json();
        setValues({
          nickName: data.nickname,
          studyName: data.title,
          introduce: data.description,
          password: '',
          passCheck: '',
        });
        setSelectedBgId(data.bg ?? 0);
      } catch (e) {
        alert(e.message);
        navigate('/');
      }
    }
    fetchStudy();
  }, [id]);

  return (
    <div className={styles.container}>
      <h2>스터디 만들기</h2>
      <form className={styles.study__create} method="POST" onSubmit={handleSubmit}>
        <InputField
          label="닉네임 수정하기"
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
          label="스터디 이름 수정하기"
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
          label="소개 수정하기"
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
          placeholder="비밀번호를 변경하지 않으려면 비워두세요"
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
          placeholder="비밀번호를 변경하지 않으려면 비워두세요"
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
            수정하기
          </button>
        </div>
      </form>
      {showUpdateModal && <UpdateSuccessModal onConfirm={handleCloseModal} />}
    </div>
  );
}

export default StudyEditPage;
