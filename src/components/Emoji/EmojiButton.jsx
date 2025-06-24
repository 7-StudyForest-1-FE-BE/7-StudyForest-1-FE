import styles from "./EmojiButton.module.css";

function EmojiButton({ reaction }) {
  const { emoji, count } = reaction;
  const handleCount = () => {};
  return (
    <button type="button" className={styles.emoji__label}>
      <span>{emoji}</span>
      <span>{count || 0}</span>
    </button>
  );
}

export default EmojiButton;
