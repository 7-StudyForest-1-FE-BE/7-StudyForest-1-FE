import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./HabitModal.module.css";
import deleteIcon from "../../assets/btn_determinate.svg";
import { saveTodayHabits, getStudyHabits } from "../../api/Habit_SG";

function HabitModal({ isOpen, onClose, habits, setHabits }) {
  const { studyId } = useParams();
  const [tempHabits, setTempHabits] = useState(habits);
  const [originalIds, setOriginalIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setTempHabits(
        habits
          .filter((h) => h.endDate === null) // 삭제되지 않은 것만
          .map((h) => (typeof h === "string" ? { _id: null, title: h } : h))
      );
      setOriginalIds(habits.filter((h) => h._id).map((h) => h._id));
    }
  }, [isOpen, habits]);

  if (!isOpen) return null;

  const AddHabit = () => {
    setTempHabits([...tempHabits, { _id: null, title: "" }]);
  };

  const ChangeHabit = (index, value) => {
    setTempHabits((prev) =>
      prev.map((item, i) =>
        i === index
          ? typeof item === "string"
            ? value
            : { ...item, title: value }
          : item
      )
    );
  };

  const RemoveHabit = (indexToRemove) => {
    setTempHabits((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const HandleComplete = async () => {
    console.log("현재 studyId : ", studyId);
    const cleaned = tempHabits.filter(
      (h) =>
        (typeof h === "string" && h.trim() !== "") ||
        (typeof h === "object" && h.title?.trim() !== "")
    );
    console.log("보낼 습관", cleaned);
    try {
      // 새로 생성할 습관만 추리기
      const newTitles = cleaned
        .filter((h) => !h._id)
        .map((h) => h.title.trim());

      // 기존 습관 이름 수정
      const updateRequests = cleaned
        .filter((h) => h._id)
        .map((h) =>
          fetch(`http://localhost:3000/api/habits/${h._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title.trim() }),
          })
        );

      const remainingIds = cleaned.filter((h) => h._id).map((h) => h._id);
      const deletedIds = originalIds.filter((id) => !remainingIds.includes(id));

      const deleteRequests = deletedIds.map((id) =>
        fetch(`http://localhost:3000/api/habits/${id}`, {
          method: "DELETE",
        })
      );

      // 백엔드로 기존 습관들 이름 PATCH 요청 보내기
      await Promise.all([...updateRequests, ...deleteRequests]);

      // 새 습관 저장
      if (newTitles.length > 0) {
        await saveTodayHabits(studyId, newTitles);
      }

      // 최신 습관 목록 다시 가져오기
      const updatedHabits = await getStudyHabits(studyId);
      const visibleHabits = updatedHabits.filter((h) => h.endDate === null);
      setHabits(visibleHabits);
      onClose();
    } catch (error) {
      console.error("습관 저장 실패:", error);
      alert("습관 저장에 실패했습니다.");
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
            <div key={index} className={styles.modal__row}>
              <input
                type="text"
                value={habit.title}
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
