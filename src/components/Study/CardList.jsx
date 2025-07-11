import Card from "./Card";
import styles from "../../pages/HomePage.module.css";

function CardList({ items, className, onRefreshItem }) {
  console.log("items" + items);
  return (
    <>
      {items.length > 0 ? (
        <div className={className}>
          {items.map((item) => {
            return (
              <Card
                key={item._id}
                item={item}
                studyId={item._id}
                onRefreshItem={onRefreshItem}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.no__data}>
          <p>찾으시는 스터디 결과가 없습니다.</p>
        </div>
      )}
    </>
  );
}

export default CardList;
