import styles from './PasswordModal.module.css';

function UpdateSuccessModal({ title, onConfirm, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__bg}></div>
      <div className={styles.modal__card}>
        <div className={styles.title__area}>
          <h4>{title}</h4>
          <p>수정이 완료되었습니다!</p>
        </div>
        <div className={styles.content__area}>
          <div className="form__area">
            <button type="button" onClick={onConfirm}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateSuccessModal;
