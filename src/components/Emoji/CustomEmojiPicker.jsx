import styles from "./CustomEmojiPicker.module.css";
import EmojiPicker from "emoji-picker-react";

function CustomEmojiPicker({ onSelect }) {
  const handleEmojiClick = (emojiData) => {
    onSelect(emojiData.emoji);
  };

  return (
    <div className={styles.emoji__picker}>
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>
  );
}

export default CustomEmojiPicker;
