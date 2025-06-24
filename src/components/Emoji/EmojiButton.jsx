import styles from "./EmojiButton.module.css";

function EmojiButton({ reaction, studyId, onRefreshItem }) {
  const { emoji, count } = reaction;
  const handleClick = async () => {
    console.log("이모지 클릭, 스터디 아이디: " + studyId);
    const storage = JSON.parse(localStorage.getItem("emojis")) || {};
    const hasReacted = storage[studyId]?.[emoji] === true;

    await fetch("http://localhost:3000/api/emojis/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studyId,
        emoji,
        action: hasReacted ? "decrease" : "increase",
      }),
    });

    // 업데이트
    storage[studyId] = storage[studyId] || {};
    storage[studyId][emoji] = !hasReacted;
    localStorage.setItem("emojis", JSON.stringify(storage));

    console.log("✅ onRefresh 호출 전");
    if (onRefreshItem) {
      onRefreshItem(studyId); // ✅ 이 부분!
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
