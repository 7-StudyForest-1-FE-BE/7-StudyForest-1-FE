import Card from "./Card";
import styles from "../../pages/HomePage.module.css";

function CardList({ items, className }) {
  return (
    <div className={className}>
      {items.map((item) => {
        return <Card item={item} />;
      })}
    </div>
  );
}

export default CardList;
