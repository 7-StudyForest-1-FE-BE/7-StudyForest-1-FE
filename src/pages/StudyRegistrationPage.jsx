import styles from "./StudyRegistrationPage.module.css";

function StudyRegistrationPage() {
  //배경선택 더미용
  const backgrounds = [
    { id: 1, color: "#d7e8da" },
    { id: 2, color: "#f7e9b7" },
    { id: 3, color: "#ddeef6" },
    { id: 4, color: "#f9e3ea" },
    { id: 5, color: "#b8d7f8" },
    { id: 6, color: "#e9e0fa" },
    { id: 7, color: "#fbe3c9" },
    { id: 8, color: "#f6cfd4" },
  ];

  return (
    <div className={styles.container}>
      <h2>스터디 만들기</h2>
      <form className={styles.study__create}>
        <div className={styles.nick__name}>
          <label htmlFor="nickName">닉네임</label>
          <input id="nickName" placeholder="닉네임을 입력해 주세요" />
        </div>
        <div className={styles.study__name}>
          <label htmlFor="studyName">스터디 이름</label>
          <input id="studyName" placeholder="스터디 이름을 입력해주세요" />
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
                className={styles.background__item}
                style={{ background: bg.color }}
              />
            ))}
          </div>
        </div>
        <div className={styles.password}>
          <label htmlFor="passInput">비밀번호</label>
          <input
            id="passInput"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
        <div className={styles.password__check}>
          <label htmlFor="passCheck">비밀번호 확인</label>
          <input
            id="passCheck"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
          />
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
