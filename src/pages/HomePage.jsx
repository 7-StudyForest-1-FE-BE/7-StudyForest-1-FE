import styles from "./HomePage.module.css";
import search from "../assets/ic_search.svg";
import toggle from "../assets/ic_toggle.svg";
import mockData from "../mock.json";
import CardList from "../components/Study/CardList";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  getStudyList,
  getStudyItem,
  getRecentStudies,
} from "../api/List_DS.js";

function HomePage() {
  const [recentStudies, setRecentStudies] = useState([]);
  const [sortOption, setSortOption] = useState({
    key: "latest",
    label: "최신순",
  });
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleFetch = async () => {
    try {
      const studyList = await getStudyList({ offset, limit });
      console.log("📦 받은 studyList.length:", studyList.length); // ← 이거 확인
      console.log("🔢 현재 offset:", offset);
      setItems((prev) => [...prev, ...studyList]);

      if (studyList.length < limit) {
        setHasMore(false);
      }
      // 현재까지 얼마나 받아왔는지
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error(error);
    }
  };
  const refreshStudyItem = async (studyId) => {
    try {
      const updated = await getStudyItem(studyId);
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === studyId ? updated : item))
      );
    } catch (err) {
      console.error("🔁 개별 스터디 갱신 실패", err);
    }
  };
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
  const isFetchedRef = useRef(false);
  useEffect(() => {
    const fetchAll = async () => {
      if (!isFetchedRef.current) {
        handleFetch();
        isFetchedRef.current = true;
      }

      const recentIds =
        JSON.parse(localStorage.getItem("recentStudyIds")) || [];
      console.log("📦 최근 IDs 불러옴:", recentIds);
      if (recentIds.length === 0) return;

      try {
        const studies = await getRecentStudies(recentIds);
        console.log("📬 서버 응답:", studies);
        const sorted = recentIds
          .map((id) => studies.find((study) => study._id === id))
          .filter(Boolean);

        setRecentStudies(sorted);
      } catch (err) {
        console.error("최근 스터디 불러오기 실패:", err);
      }
    };

    fetchAll();
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
        <p>최근 조회한 스터디가 없습니다.</p>
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
                      <label htmlFor="keyword">검색어</label>
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
                          autoComplete="off"
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
            onRefreshItem={refreshStudyItem}
          />
          {hasMore && (
            <div className={styles.block__btns}>
              <button
                type="button"
                className={`${styles.btn__more} primary`}
                onClick={handleFetch}
              >
                더보기
              </button>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

export default HomePage;
