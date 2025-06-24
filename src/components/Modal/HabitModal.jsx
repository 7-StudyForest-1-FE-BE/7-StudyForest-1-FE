import React, { useEffect, useState } from "react";
import styles from "./HabitModal.module.css";
import deleteIcon from "../../assets/btn_determinate.svg";

function HabitModal({ isOpen, onClose, habits, setHabits }) {
  const [tempHabits, setTempHabits] = useState(habits);

  useEffect(() => {
    if (isOpen) {
      setTempHabits(habits);
    }
  }, [isOpen, habits]);

  if (!isOpen) return null;

  const AddHabit = () => {
    setTempHabits([...tempHabits, ""]);
  };

  const ChangeHabit = (index, value) => {
    const updated = [...tempHabits];
    updated[index] = value;
    setTempHabits(updated);
  };

  const RemoveHabit = (indexToRemove) => {
    setTempHabits((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const HandleComplete = async () => {
    console.log("현재 studyId : ", studyId);
    const cleaned = tempHabits.filter(
      (h) => typeof h === "string" && h.trim() !== ""
    );
    try {
      await saveTodayHabits(studyId, cleaned);
      const updatedHabits = await getStudyHabits(studyId);
      setHabits(updatedHabits.map((h) => h.title || h));
      onClose();
    } catch (error) {
      console.error("습관 저장 실패:", error);
      alert("습관 저장에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const HandleCancel = () => {
    onClose();
  };

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
                value={habit || ""}
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

export default HabitModal;
