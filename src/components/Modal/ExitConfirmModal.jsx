import styles from "./ExitConfirmModal.module.css";

const ExitConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal__bg}></div>
      <div className={styles.modal__card}>
        <div className={styles.title__area}>
          <h4>⚠️ 잠깐!</h4>
          <p>
            지금 나가면 포인트를 획득하지 못합니다!
            <br />
            그래도 나가시겠습니까?
          </p>
          <div className={styles.util}>
            <button type="button" onClick={onCancel}>
              ✕
            </button>
          </div>
        </div>
        <div className={styles.content__area}>
          <div className={styles.button__area}>
            <button
              type="button"
              className={styles.btn__cancel}
              onClick={onCancel}
            >
              계속 집중하기
            </button>
            <button
              type="button"
              className={styles.btn__confirm}
              onClick={onConfirm}
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmModal;
