import styles from "./EmojiButton.module.css";
import { toggleEmojiReaction } from "../../api/List_DS.js";

function EmojiButton({ reaction, studyId, onRefreshItem }) {
  const { emoji, count } = reaction;
  const handleClick = async () => {
    const storage = JSON.parse(localStorage.getItem("emojis")) || {};
    const hasReacted = storage[studyId]?.[emoji] === true;

    try {
      await toggleEmojiReaction({
        studyId,
        emoji,
        action: hasReacted ? "decrease" : "increase",
      });

      // 업데이트
      storage[studyId] = storage[studyId] || {};
      storage[studyId][emoji] = !hasReacted;
      localStorage.setItem("emojis", JSON.stringify(storage));

      if (onRefreshItem) {
        onRefreshItem(studyId);
      }
    } catch (error) {
      console.error("이모지 반응 실패:", error);
    }
  };
  return (
    <button type="button" className={styles.emoji__label} onClick={handleClick}>
      <span>{emoji}</span>
      <span>{count || 0}</span>
    </button>
  );
}

export default EmojiButton;
