import Card from "./Card";
import styles from "../../pages/HomePage.module.css";

function CardList({ items, className }) {
  console.log("items" + items);
  return (
    <>
      {items.length > 0 ? (
        <div className={className}>
          {items.map((item) => {
            return <Card key={item.id} item={item} />;
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
