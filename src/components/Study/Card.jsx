import styles from "../../pages/HomePage.module.css";
import smile from "../../assets/ic_smile.svg";
import point from "../../assets/ic_point.svg";
import EmojiButton from "../Emoji/EmojiButton";

const formatData = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate() + 1}`;
};

function calculateDaysSince(dateString) {
  const today = new Date();
  const writtenDate = new Date(dateString);

  const diffInMs = today - writtenDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}

function Card({ item }) {
  const { type, value, textColor } = item.theme;
  let style = {};
  if (type === "image") {
    style = {
      background: `url("${value}")`,
      backgroundSize: "contain",
    };
  } else {
    style = {
      background: value,
    };
  }

  return (
    <div
      className={`${styles.item} ${type === "image" ? styles.bg : ""}`}
      style={style}
    >
      <div className={styles.info__area}>
        <div className={styles.top__area}>
          <div className={styles.card__title_area}>
            <p className={styles.title}>
              <span style={{ color: textColor }}>{item.nickname}</span>의{" "}
              {item.title}
            </p>
            <span className={styles.term}>
              {calculateDaysSince(formatData(item.createdAt))}일째 진행 중
            </span>
          </div>
          <div className={styles.point__label}>
            <img src={point} />
            <p>
              <span>{item.points}</span>P 획득
            </p>
          </div>
        </div>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.emoji__area}>
        {item.emojiReactions.map((reaction) => {
          return <EmojiButton reaction={reaction} />;
        })}
      </div>
    </div>
  );
}

export default Card;
