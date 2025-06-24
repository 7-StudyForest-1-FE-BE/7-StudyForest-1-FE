import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import styles from "./HabitPage.module.css";
import LiveClock from "../components/LiveClock/LiveClock";
import HabitModal from "../components/Modal/HabitModal";
import { getStudyHabits } from "../api/List_DS.js";

function HabitPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { studyId } = useParams();

  const toggleItem = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    async function fetchHabits() {
      try {
        const data = await getStudyHabits(studyId);
        console.log("📤 서버에서 불러온 습관 목록", data);
        setHabits(
          data.map((habit) => (typeof habit === "string" ? habit : habit.title))
        );
      } catch (error) {
        console.error("습관 데이터 불러오기 실패:", error);
      }
    }
    if (studyId) {
      fetchHabits();
    }
  }, [studyId]);

  return (
    <>
      <main className={styles.inner}>
        <div className={styles.container}>
          <div className={styles.headerline}>
            <h1 className={styles.title}>연우의 개발공장</h1>
            <div className={styles.linkgroup}>
              <Link to={"/concentration"} className={styles.btn}>
                오늘의 집중 &gt;
              </Link>
              <Link to={"/"} className={`${styles.btn} ${styles.homebtn}`}>
                홈 &gt;
              </Link>
            </div>
          </div>

          <div className={styles.time__display}>
            <div className={styles.current__time}>현재 시간</div>
            <LiveClock className={styles.liveclock} />
          </div>
        </div>

        <div className={styles.habit__section}>
          <div className={styles.habit__box}>
            <div className={styles.habit__title}>
              <div className={styles.habit__text}>오늘의 습관</div>
              <div
                className={styles.habit__modal}
                onClick={() => setModalOpen(true)}
              >
                목록 수정
              </div>
            </div>

            <div className={styles.habit__list}>
              {habits.length === 0 ? (
                <div className={styles.habit__empty}>
                  아직 습관이 없어요
                  <br /> 목록 수정을 눌러 습관을 생성해보세요
                </div>
              ) : (
                habits.map((habit, index) => (
                  <div
                    key={index}
                    className={`${styles.habit__item} ${
                      selectedItems.includes(index) ? styles.selected : ""
                    }`}
                    onClick={() => toggleItem(index)}
                  >
                    {habit}
                  </div>
                ))
              )}
            </div>

            <HabitModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              habits={habits}
              setHabits={setHabits}
            />
          </div>
        </div>

        <div></div>
      </main>
    </>
  );
}

export default HabitPage;
