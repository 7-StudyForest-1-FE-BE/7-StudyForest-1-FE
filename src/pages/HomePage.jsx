import styles from "./HomePage.module.css";
import smile from "../assets/ic_smile.svg";
import point from "../assets/ic_point.svg";
import search from "../assets/ic_search.svg";
import toggle from "../assets/ic_toggle.svg";
import mockData from "../mock.json";
import CardList from "../components/Study/CardList";
import { useState, useMemo, useEffect } from "react";

function HomePage() {
  const [recentStudies, setRecentStudies] = useState([]);
  const [sortOption, setSortOption] = useState({
    key: "latest",
    label: "최신순",
  });
  const [items, setItems] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [items, keyword]);
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      switch (sortOption.key) {
        case "latest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "higher":
          return b.points - a.points;
        case "lower":
          return a.points - b.points;
        default:
          return 0;
      }
    });
  }, [filteredItems, sortOption]);

  const handleFiter = (key, label) => {
    setSortOption({ key, label });
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKeyword(inputValue);
  };

  useEffect(() => {
    const recentIds = JSON.parse(localStorage.getItem("recentStudyIds")) || [];
    const matched = recentIds
      .map((id) => mockData.find((study) => study.id === id))
      .filter(Boolean);
    setRecentStudies(matched);
  }, []);

  return (
    <>
      {recentStudies.length > 0 ? (
        <article className={styles.block__card}>
          <div className={styles.title__area}>
            <h2>최근 조회한 스터디</h2>
          </div>
          <div className={styles.content__area}>
            <CardList
              items={recentStudies}
              className={`${styles.card__list} ${styles.recent__card__list}`}
            />
          </div>
        </article>
      ) : (
        ""
      )}
      <article className={styles.block__card}>
        <div className={styles.title__area}>
          <h2>스터디 둘러보기</h2>
          <div className={styles.util}>
            <form onSubmit={handleSearchSubmit}>
              <div className="form__area">
                <div className="input__row">
                  <dl>
                    <dt className="sr__only">
                      <label for="password">검색어</label>
                    </dt>
                    <dd className="">
                      <div
                        className={`input__box input__box__md ${styles.search__box}`}
                      >
                        <img src={search} />
                        <input
                          type="text"
                          id="keyword"
                          name="keyword"
                          placeholder="검색"
                          autocomplete="off"
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </form>
            <div className={styles.select__box}>
              <button type="button" className={`btn`} onClick={handleOpen}>
                {sortOption.label}
                <img src={toggle} />
              </button>
              {open && (
                <ul>
                  <li>
                    <button
                      type="button"
                      className={styles.btn__option}
                      onClick={() => handleFiter("latest", "최신 순")}
                    >
                      최신순
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={styles.btn__option}
                      onClick={() => handleFiter("oldest", "오래된 순")}
                    >
                      오래된 순
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={styles.btn__option}
                      onClick={() => handleFiter("higher", "많은 포인트 순")}
                    >
                      많은 포인트 순
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={styles.btn__option}
                      onClick={() => handleFiter("lower", "적은 포인트 순")}
                    >
                      적은 포인트 순
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className={styles.content__area}>
          <CardList
            items={sortedItems}
            className={`${styles.card__list} ${styles.entire__card__list}`}
          />
          <div className={styles.block__btns}>
            <button type="button" className={`${styles.btn__more} primary`}>
              더보기
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default HomePage;
