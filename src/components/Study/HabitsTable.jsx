import styles from "./HabitsTable.module.css";
import empty from "../../assets/sticker/empty.svg";
import lightGreen from "../../assets/sticker/light_green.svg";
import green from "../../assets/sticker/green.svg";
import deepGreen from "../../assets/sticker/deep_green.svg";

const dayLabels = ["월", "화", "수", "목", "금", "토", "일"];

function HabitsTable({ habits }) {
  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <div className={styles.table__row}>
          <div className={`${styles.col} ${styles.col__name}`}></div>
          {dayLabels.map((col, idx) => {
            return (
              <div key={idx} className={`${styles.col} ${styles.col__day}`}>
                {col}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.table__body}>
        {habits.map((habit) => {
          return (
            <div className={styles.table__row}>
              <div className={`${styles.col} ${styles.col__name}`}>
                {habit.title}
              </div>
              {dayLabels.map((day, idx) => {
                return (
                  <div className={`${styles.col} ${styles.col__day}`}>
                    {habit.checkedDays[day] ? (
                      <img src={green} alt="" />
                    ) : (
                      <img src={empty} alt="" />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitsTable;
