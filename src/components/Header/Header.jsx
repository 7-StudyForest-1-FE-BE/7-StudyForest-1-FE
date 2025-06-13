import logo from "../../assets/img_logo.svg";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router";

function Header() {
  const location = useLocation();
  const hideButtonPaths = ["/view", "/habit", "/concentration"];
  const hideButton = hideButtonPaths.includes(location.pathname);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <h1>
            <span className="sr__only">공부의숲</span>
            <Link to={"/"}>
              <img src={logo} alt="공부의숲" />
            </Link>
          </h1>
        </div>
        <div className={styles.util}>
          <Link
            to={"/registration"}
            className={`${styles.btn} hide__on__mobile`}
          >
            스터디 만들기
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
