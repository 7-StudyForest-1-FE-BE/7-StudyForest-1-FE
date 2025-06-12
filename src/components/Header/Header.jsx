import logo from "../../assets/img_logo.svg";
import styles from "./Header.module.css";
import { Link } from "react-router";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <h1>
            <span className="sr-only">공부의숲</span>
            <Link to={"/"}>
              <img src={logo} alt="공부의숲" />
            </Link>
          </h1>
        </div>
        {/*<div className={styles.util}>
          <Link to={"/registration"} className={styles.btn}>
            스터디 만들기
          </Link>
        </div>*/}
      </div>
    </header>
  );
}

export default Header;
