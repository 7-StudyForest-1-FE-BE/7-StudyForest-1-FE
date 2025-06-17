import { useState } from 'react';
import styles from './StudyRegistrationPage.module.css';

function StudyRegistrationPage({ onCreate }) {
  // 입력값 state로 관리
  const [nickName, setNickName] = useState('');
  const [studyName, setStudyName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  // 배경색 선택 로직 추가(선택된 color 저장)
  const [selectedColor, setSelectedColor] = useState(null);

  const backgrounds = [
    { id: 1, color: '#d7e8da' },
    { id: 2, color: '#f7e9b7' },
    { id: 3, color: '#ddeef6' },
    { id: 4, color: '#f9e3ea' },
    { id: 5, color: '#b8d7f8' },
    { id: 6, color: '#e9e0fa' },
    { id: 7, color: '#fbe3c9' },
    { id: 8, color: '#f6cfd4' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 체크
    if (!nickName || !studyName || !introduce || !password || password !== passwordCheck || !selectedColor) {
      alert('필수 입력값을 모두 채워주세요.');
      return;
    }
    // 새로운 스터디 객체 생성
    const newStudy = {
      id: `study_${Date.now()}`,
      title: studyName,
      description: introduce,
      createdBy: nickName,
      theme: {
        type: 'color',
        value: selectedColor,
        textColor: '#414141',
      },
      habits: [],
      emojiReactions: [],
      createdAt: new Date().toISOString(),
    };
    // 상위로 전달
    onCreate(newStudy);
    // 입력값 초기화
    setNickName('');
    setStudyName('');
    setIntroduce('');
    setPassword('');
    setPasswordCheck('');
    setSelectedColor(null);
  };

  return (
    <div className={styles.container}>
      <h2>스터디 만들기</h2>
      <form className={styles.study__create} onSubmit={handleSubmit}>
        <div className={styles.nick__name}>
          <label htmlFor="nickName">닉네임</label>
          <input id="nickName" placeholder="닉네임을 입력해 주세요" value={nickName} onChange={(e) => setNickName(e.target.value)} />
        </div>
        <div className={styles.study__name}>
          <label htmlFor="studyName">스터디 이름</label>
          <input id="studyName" value={studyName} onChange={(e) => setStudyName(e.target.value)} />
        </div>
        <div className={styles.introduction}>
          <label htmlFor="introduce">소개</label>
          <textarea id="introduce" value={introduce} onChange={(e) => setIntroduce(e.target.value)} />
        </div>
        <div className={styles.choice__background}>
          <label>배경을 선택해주세요</label>
          <div className={styles.background__items}>
            {backgrounds.map((bg) => (
              <button
                key={bg.id}
                type="button"
                className={styles.background__item}
                style={{
                  background: bg.color,
                  border: selectedColor === bg.color ? '2px solid #000' : undefined,
                }}
                onClick={() => setSelectedColor(bg.color)}
              />
            ))}
          </div>
        </div>
        <div className={styles.password}>
          <label htmlFor="passInput">비밀번호</label>
          <input id="passInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={styles.password__check}>
          <label htmlFor="passCheck">비밀번호 확인</label>
          <input id="passCheck" type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
        </div>
        <div className={styles.submit__btn}>
          <button className={styles.study__create__btn} type="submit">
            만들기
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudyRegistrationPage;
