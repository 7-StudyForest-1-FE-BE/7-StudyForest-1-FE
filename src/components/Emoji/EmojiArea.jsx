import { useState } from "react";
import EmojiButton from "./EmojiButton";
import styles from "./EmojiArea.module.css";

function EmojiArea({
  emojis = [],
  studyId,
  onRefreshItem,
  max = 3,
  expandable = false,
}) {
  const [showAll, setShowAll] = useState(false);

  const visibleEmojis = expandable
    ? showAll
      ? emojis
      : emojis.slice(0, max)
    : emojis.slice(0, max);

  return (
    <div className={styles.emoji__area}>
      {visibleEmojis
        ?.filter((reaction) => reaction.count > 0)
        .map((reaction) => (
          <EmojiButton
            key={reaction.emoji}
            reaction={reaction}
            studyId={studyId}
            onRefreshItem={onRefreshItem}
            expandable={expandable}
          />
        ))}

      {expandable && emojis.length > max && (
        <button
          type="button"
          className={styles.btn__view__controll}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "접기" : "..."}
        </button>
      )}
    </div>
  );
}

export default EmojiArea;
