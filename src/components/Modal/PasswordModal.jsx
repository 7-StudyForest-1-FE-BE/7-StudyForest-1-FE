import styles from "./PasswordModal.module.css";
import visibilityOff from "../../assets/ic_visibility_off.png";
import visibilityOn from "../../assets/ic_visibility_on.png";

function PasswordModal({}) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__bg}></div>
      <div className={styles.modal__card}>
        <div className={styles.title__area}>
          <h4>연우의 개발공장</h4>
          <p>권한이 필요해요!</p>
          <div className={styles.util}>
            <button type="button">나가기</button>
          </div>
        </div>
        <div className={styles.content__area}>
          <form>
            <div className="form__area">
              <div className="input__row">
                <dl>
                  <dt className="">
                    <label for="password">비밀번호 확인</label>
                  </dt>
                  <dd className="">
                    <div className="input__box">
                      <input
                        type="password"
                        id="password"
                        name="password"
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
              <button type="button">수정하러 가기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
