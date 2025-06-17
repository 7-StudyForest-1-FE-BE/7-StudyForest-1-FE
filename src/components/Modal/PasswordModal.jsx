import styles from "./PasswordModal.module.css";

function PasswordModal({}) {
  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalbox}>
        <h1 className={styles.modal__header}>습관 목록</h1>

        <div className={styles.modal__list}>
          {tempHabits.map((habit, index) => (
            <div className={styles.modal__row}>
              <input
                key={index}
                type="text"
                value={habit}
                onChange={(e) => ChangeHabit(index, e.target.value)}
                className={styles.modal__input}
                placeholder={"_______________"}
              />
              <img
                src={deleteIcon}
                alt="삭제"
                onClick={() => RemoveHabit(index)}
                className={styles.modal__remove}
              />
            </div>
          ))}
        </div>

        <div className={styles.modal__plus} onClick={AddHabit} />

        <div className={styles.modal__btngroup}>
          <button onClick={HandleCancel} className={styles.modal__cancelbtn} />
          <button
            onClick={HandleComplete}
            className={styles.modal__completedbtn}
          />
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
