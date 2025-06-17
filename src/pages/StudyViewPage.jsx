import styles from "./StudyViewPage.module.css";
import empty from "../assets/sticker/empty.svg";
import lightGreen from "../assets/sticker/light_green.svg";
import green from "../assets/sticker/green.svg";
import deepGreen from "../assets/sticker/deep_green.svg";
import smile from "../assets/ic_smile.svg";
import arrowRight from "../assets/ic_arrow_right.svg";
import point from "../assets/ic_point.svg";
import visibilityOff from "../assets/ic_visibility_off.png";
import visibilityOn from "../assets/ic_visibility_on.png";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import mockData from "../mock.json";
import HabitsTable from "../components/Study/HabitsTable";

function getStudyItem(studyId) {
  return mockData.find((study) => study.id === studyId);
}

function StudyViewPage() {
  const { studyId } = useParams();
  console.log(studyId);

  const item = getStudyItem(studyId);
  console.log(item);
  if (!item) {
    return <Navigate to={"/"} />;
  }

  const [open, setOpen] = useState(false);
  const [pwError, setPwError] = useState(false);
  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.block__card}>
        <div className={styles.card__header}>
          <div className={styles.util}>
            <div className={styles.emoji__area}>
              <button type="button">
                <img src={smile} />
                추가
              </button>
            </div>
            <ul className={styles.study__action__area}>
              <li>
                <button type="button" className={"primary"}>
                  공유하기
                </button>
              </li>
              <li>
                <button type="button" className={"primary"}>
                  수정하기
                </button>
              </li>
              <li>
                <button type="button">스터디 삭제하기</button>
              </li>
            </ul>
          </div>
          <div className={styles.study__info__area}>
            <div className={styles.title__area}>
              <h2>{item.title}</h2>
              <div>
                <ul className={styles.study__detail__area}>
                  <li>
                    <button type="button" onClick={handleModal}>
                      오늘의 습관
                      <img src={arrowRight} />
                    </button>
                  </li>
                  <li>
                    <Link to="/concentration/:id">
                      오늘의 집중
                      <img src={arrowRight} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.content__area}>
              <dl>
                <dt>소개</dt>
                <dd>{item.description}</dd>
              </dl>
              <dl>
                <dt>현재까지 획득한 포인트</dt>
                <dd>
                  <div className={styles.point__label}>
                    <img src={point} />
                    <p>
                      <span>{item.points}</span>P 획득
                    </p>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className={styles.card__bottom__area}>
          <h3>습관 기록표</h3>
          {item.habits ? (
            <HabitsTable habits={item.habits} />
          ) : (
            <div className={styles.block_no__data}>
              <p>
                아직 습관이 없어요.
                <br />
                오늘의 습관에서 습관을 생성해보세요.
              </p>
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="modal">
          <div className="modal__bg"></div>
          <div className="modal__card">
            <div className="title__area">
              <h4>연우의 개발공장</h4>
              <p>권한이 필요해요!</p>
              <div className="util">
                <button type="button">나가기</button>
              </div>
            </div>
            <div className="content__area">
              <form>
                <div className="form__area">
                  <div className="input__row">
                    <dl>
                      <dt className="">
                        <label for="password">비밀번호 확인</label>
                      </dt>
                      <dd className="">
                        <div className="input__box">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호를 입력해주세요"
                            autocomplete="off"
                          />
                          <button type="button" className="btn__visible">
                            <img src={visibilityOff} />
                          </button>
                        </div>
                      </dd>
                    </dl>
                  </div>
                  <button type="button">수정하러 가기</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {pwError && (
        <div className="toast">
          <p>비밀번호가 일치하지 않습니다. 다시 입력해주세요.</p>
        </div>
      )}
    </>
  );
}

export default StudyViewPage;
