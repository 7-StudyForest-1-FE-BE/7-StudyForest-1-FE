import styles from "./StudyViewPage.module.css";
import smile from "../assets/ic_smile.svg";
import arrowRight from "../assets/ic_arrow_right.svg";
import point from "../assets/ic_point.svg";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router";
import mockData from "../mock.json";
import HabitsTable from "../components/Study/HabitsTable";
import EmojiPicker from "emoji-picker-react";
import PasswordModal from "../components/Modal/PasswordModal";
import EmojiButton from "../components/Emoji/EmojiButton";

function getStudyItem(studyId) {
  return mockData.find((study) => study.id === studyId);
}

function saveRecentlyViewedStudy(studyId) {
  const stored = JSON.parse(localStorage.getItem("recentStudyIds")) || [];

  const filtered = stored.filter((id) => id !== studyId);
  const updated = [studyId, ...filtered].slice(0, 3); // 최신 3개

  localStorage.setItem("recentStudyIds", JSON.stringify(updated));
}

function StudyViewPage() {
  const { studyId } = useParams();
  console.log(studyId);

  const item = getStudyItem(studyId);
  console.log(item);
  if (!item) {
    return <Navigate to={"/"} />;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [pwError, setPwError] = useState(false);
  const handleEmojiPicker = () => {
    setIsEmojiOpen((prev) => !prev);
  };
  const handleModal = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    if (studyId) {
      saveRecentlyViewedStudy(studyId);
    }
  }, [studyId]);
  return (
    <>
      <div className={styles.block__card}>
        <div className={styles.card__header}>
          <div className={styles.util}>
            <div className={styles.emoji__area}>
              {item.emojiReactions.map((reaction) => {
                return <EmojiButton reaction={reaction} />;
              })}
              <div className={styles.picker__area}>
                <button type="button" onClick={handleEmojiPicker}>
                  <img src={smile} />
                  추가
                </button>
                {isEmojiOpen && (
                  <EmojiPicker className={styles.emoji__picker} />
                )}
              </div>
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
      {isModalOpen && <PasswordModal />}
      {pwError && (
        <div className="toast">
          <p>비밀번호가 일치하지 않습니다. 다시 입력해주세요.</p>
        </div>
      )}
    </>
  );
}

export default StudyViewPage;
