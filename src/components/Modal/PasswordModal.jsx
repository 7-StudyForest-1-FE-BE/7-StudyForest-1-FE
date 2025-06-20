import styles from "./PasswordModal.module.css";
import visibilityOff from "../../assets/ic_visibility_off.png";
import visibilityOn from "../../assets/ic_visibility_on.png";
import { useState } from "react";

function PasswordModal({ title, pw, onConfirm, onClose }) {
  const [inputPw, setInputPw] = useState("");
  const handleClose = () => {
    onClose();
    setInputPw("");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__bg}></div>
      <div className={styles.modal__card}>
        <div className={styles.title__area}>
          <h4>{title}</h4>
          <p>권한이 필요해요!</p>
          <div className={styles.util}>
            <button type="button" onClick={handleClose}>
              나가기
            </button>
          </div>
        </div>
        <div className={styles.content__area}>
          <div className="form__area">
            <div className="input__row">
              <dl>
                <dt className="">
                  <label htmlFor="password">비밀번호 확인</label>
                </dt>
                <dd className="">
                  <div className="input__box">
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={pw}
                      onChange={(e) => setInputPw(e.target.value)}
                      placeholder="비밀번호를 입력해주세요"
                      autocomplete="off"
                    />
                    <button type="button" className="btn__visible">
                      <img src={visibilityOff} />
                    </button>
                  </div>
                </dd>
              </dl>
            </div>
            <button type="button" onClick={() => onConfirm(inputPw)}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
