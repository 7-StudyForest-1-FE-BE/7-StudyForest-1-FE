import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import styles from "./HabitPage.module.css";
import LiveClock from "../components/LiveClock/LiveClock";
import HabitModal from "../components/Modal/HabitModal";
import { getStudyHabits } from "../api/List_DS.js";

function HabitPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [studyName, setStudyName] = useState("");
  const { studyId } = useParams();

  const getTodayDay = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[new Date().getDay()];
  };

  const toggleItem = async (habitId) => {
    const day = getTodayDay();
    try {
      const res = await fetch(
        `http://localhost:3000/api/habits/${habitId}/toggle`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ day }),
        }
      );
      const updatedHabit = await res.json();

      setHabits((prev) =>
        prev.map((h) => (h._id === updatedHabit._id ? updatedHabit : h))
      );
    } catch (error) {
      console.error("습관 체크 토글 실패:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!studyId) return;
      try {
        const data = await getStudyHabits(studyId);
        setHabits(data.filter((h) => h.endDate === null));

        // 스터디 상세 정보 API 호출해서 이름 가져오기
        const studyResponse = await fetch(
          `http://localhost:3000/api/studies/${studyId}`
        );
        if (!studyResponse.ok) throw new Error("스터디 상세 조회 실패");
        const studyData = await studyResponse.json();
        setStudyName(studyData.title || "");
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    }
    fetchData();
  }, [studyId]);

  return (
    <>
      <main className={styles.inner}>
        <div className={styles.container}>
          <div className={styles.headerline}>
            <h1 className={styles.title}>{studyName || "스터디 이름"}</h1>
            <div className={styles.linkgroup}>
              <Link
                to={`/study/${studyId}/concentration`}
                className={styles.btn}
              >
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
                habits.map((habit, index) => {
                  const today = getTodayDay();
                  const isChecked = habit.checkedDays?.[today] || false;

                  return (
                    <div
                      key={habit._id}
                      className={`${styles.habit__item} ${
                        isChecked ? styles.selected : ""
                      }`}
                      onClick={() => toggleItem(habit._id)}
                    >
                      {habit.title}
                    </div>
                  );
                })
              )}
            </div>

            <HabitModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              habits={habits}
              setHabits={(newHabits) => {
                // 새로 서버에서 다시 받아와서 업데이트
                async function reloadHabits() {
                  if (!studyId) return;
                  const data = await getStudyHabits(studyId);
                  setHabits(data.filter((h) => h.endDate === null));
                }
                reloadHabits();
              }}
            />
          </div>
        </div>

        <div></div>
      </main>
    </>
  );
}

export default HabitPage;
