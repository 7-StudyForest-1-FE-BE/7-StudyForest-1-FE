import styles from './PasswordModal.module.css';
import visibilityOff from '../../assets/ic_visibility_off.png';
import { useState } from 'react';

function DeleteStudyModal({ title, onConfirm, onClose }) {
  const [inputPw, setInputPw] = useState('');
  const handleClose = () => {
    onClose();
    setInputPw('');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__bg}></div>
      <div className={styles.modal__card}>
        <div className={styles.title__area}>
          <h4>{title}</h4>
          <p>
            정말 삭제하시겠습니까? <br />
            삭제하면 되돌릴 수 없습니다.
          </p>
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
                <dt>
                  <label htmlFor="password">비밀번호 확인</label>
                </dt>
                <dd>
                  <div className="input__box">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={inputPw}
                      onChange={(e) => setInputPw(e.target.value)}
                      placeholder="비밀번호를 입력해주세요"
                      autoComplete="off"
                    />
                    <button type="button" className="btn__visible">
                      <img src={visibilityOff} />
                    </button>
                  </div>
                </dd>
              </dl>
            </div>
            <button type="button" onClick={() => onConfirm(inputPw)}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteStudyModal;
