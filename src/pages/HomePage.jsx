import styles from "./HomePage.module.css";
import smile from "../assets/ic_smile.svg";
import point from "../assets/ic_point.svg";
import search from "../assets/ic_search.svg";
import toggle from "../assets/ic_toggle.svg";
import { useState } from "react";

function HomePage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className={styles.block__card}>
        <div className={styles.title__area}>
          <h2>최근 조회한 스터디</h2>
        </div>
        <div className={styles.content__area}>
          <div className={`${styles.card__list} ${styles.recent__card__list}`}>
            <div className={`${styles.item} ${styles.bg}`}>
              <div className={styles.info__area}>
                <div className={styles.top__area}>
                  <div className={styles.card__title_area}>
                    <p className={styles.title}>
                      <span>이유디</span>의 UX 스터디
                    </p>
                    <span className={styles.term}>62일째 진행 중</span>
                  </div>
                  <div className={styles.point__label}>
                    <img src={point} />
                    <p>
                      <span>310</span>P 획득
                    </p>
                  </div>
                </div>
                <p className={styles.description}>
                  Slow And Steady Wins The Race!!
                </p>
              </div>
              <div className={styles.emoji__area}>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.info__area}>
                <div className={styles.top__area}>
                  <div className={styles.card__title_area}>
                    <p className={styles.title}>
                      <span>이유디</span>의 UX 스터디
                    </p>
                    <span className={styles.term}>62일째 진행 중</span>
                  </div>
                  <div className={styles.point__label}>
                    <img src={point} />
                    <p>
                      <span>310</span>P 획득
                    </p>
                  </div>
                </div>
                <p className={styles.description}>
                  Slow And Steady Wins The Race!!
                </p>
              </div>
              <div className={styles.emoji__area}>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
              </div>
            </div>
            <div className={`${styles.item} ${styles.yellowed}`}>
              <div className={styles.info__area}>
                <div className={styles.top__area}>
                  <div className={styles.card__title_area}>
                    <p className={styles.title}>
                      <span>이유디</span>의 UX 스터디
                    </p>
                    <span className={styles.term}>62일째 진행 중</span>
                  </div>
                  <div className={styles.point__label}>
                    <img src={point} />
                    <p>
                      <span>310</span>P 획득
                    </p>
                  </div>
                </div>
                <p className={styles.description}>
                  Slow And Steady Wins The Race!!
                </p>
              </div>
              <div className={styles.emoji__area}>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className={styles.block__card}>
        <div className={styles.title__area}>
          <h2>스터디 둘러보기</h2>
          <div className={styles.util}>
            <form>
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
                        />
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </form>
            <div className={styles.select__box}>
              <button type="button" className={`btn`}>
                최신순
                <img src={toggle} />
              </button>
              {open && (
                <ul>
                  <li>
                    <button type="button" className={styles.btn__option}>
                      최신순
                    </button>
                  </li>
                  <li>
                    <button type="button" className={styles.btn__option}>
                      오래된 순
                    </button>
                  </li>
                  <li>
                    <button type="button" className={styles.btn__option}>
                      많은 포인트 순
                    </button>
                  </li>
                  <li>
                    <button type="button" className={styles.btn__option}>
                      적은 포인트 순
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className={styles.content__area}>
          <div className={`${styles.card__list} ${styles.entire__card__list}`}>
            <div className={styles.item}>
              <div className={styles.info__area}>
                <div className={styles.top__area}>
                  <div className={styles.card__title_area}>
                    <p className={styles.title}>
                      <span>이유디</span>의 UX 스터디
                    </p>
                    <span className={styles.term}>62일째 진행 중</span>
                  </div>
                  <div className={styles.point__label}>
                    <img src={point} />
                    <p>
                      <span>310</span>P 획득
                    </p>
                  </div>
                </div>
                <p className={styles.description}>
                  Slow And Steady Wins The Race!!
                </p>
              </div>
              <div className={styles.emoji__area}>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.info__area}>
                <div className={styles.top__area}>
                  <div className={styles.card__title_area}>
                    <p className={styles.title}>
                      <span>이유디</span>의 UX 스터디
                    </p>
                    <span className={styles.term}>62일째 진행 중</span>
                  </div>
                  <div className={styles.point__label}>
                    <img src={point} />
                    <p>
                      <span>310</span>P 획득
                    </p>
                  </div>
                </div>
                <p className={styles.description}>
                  Slow And Steady Wins The Race!!
                </p>
              </div>
              <div className={styles.emoji__area}>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.info__area}>
                <div className={styles.top__area}>
                  <div className={styles.card__title_area}>
                    <p className={styles.title}>
                      <span>이유디</span>의 UX 스터디
                    </p>
                    <span className={styles.term}>62일째 진행 중</span>
                  </div>
                  <div className={styles.point__label}>
                    <img src={point} />
                    <p>
                      <span>310</span>P 획득
                    </p>
                  </div>
                </div>
                <p className={styles.description}>
                  Slow And Steady Wins The Race!!
                </p>
              </div>
              <div className={styles.emoji__area}>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
                <button type="button" className={styles.emoji__label}>
                  <img src={smile} />
                  37
                </button>
              </div>
            </div>
          </div>
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
