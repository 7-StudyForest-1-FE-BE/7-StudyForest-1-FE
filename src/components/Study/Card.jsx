import styles from "../../pages/HomePage.module.css";
import point from "../../assets/ic_point.svg";
import { Link } from "react-router";
import bgThemes from "../../data/bgThemes.js";
import EmojiArea from "../Emoji/EmojiArea.jsx";

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

function Card({ item, studyId, onRefreshItem }) {
  const theme = bgThemes.find((theme) => theme.id === (item.bg || 1));
  console.log("theme: " + theme);
  let style = {};
  if (theme.type === "image") {
    style = {
      background: `url("${theme.value}")`,
      backgroundSize: "contain",
    };
  } else {
    style = {
      background: theme.value,
    };
  }
  console.log("item.bg:" + item.bg);
  console.log(
    "bgThemes ids:",
    bgThemes.map((t) => t.id)
  );
  return (
    <div
      className={`${styles.item} ${theme.type === "image" ? styles.bg : ""}`}
      style={style}
    >
      <div className={styles.info__area}>
        <div className={styles.top__area}>
          <Link to={`/view/${item._id}`}>
            <div className={styles.card__title_area}>
              <p className={styles.title}>
                <span style={{ color: theme.textColor }}>{item.nickname}</span>
                의 {item.title}
              </p>
              <span className={styles.term}>
                {calculateDaysSince(formatData(item.createdAt))}일째 진행 중
              </span>
            </div>
          </Link>
          <div className={styles.point__label}>
            <img src={point} />
            <p>
              <span>{item.points || 0}</span>P 획득
            </p>
          </div>
        </div>
        <p className={styles.description}>{item.description}</p>
      </div>

      {item.emojis.length > 0 ? (
        <EmojiArea
          emojis={item.emojis}
          studyId={studyId}
          onRefreshItem={onRefreshItem}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
