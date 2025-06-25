import styles from "./StudyViewPage.module.css";
import smile from "../assets/ic_smile.svg";
import arrowRight from "../assets/ic_arrow_right.svg";
import point from "../assets/ic_point.svg";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router";
import HabitsTable from "../components/Study/HabitsTable";
import PasswordModal from "../components/Modal/PasswordModal";
import EmojiArea from "../components/Emoji/EmojiArea.jsx";
import { getStudyItem, checkStudyPassword } from "../api/List_DS.js";
import DeleteStudyModal from "../components/Modal/DeleteStudyModal.jsx";
import { deleteStudy } from "../api/View_JS.js";
import CustomEmojiPicker from "../components/Emoji/CustomEmojiPicker.jsx";

function saveRecentlyViewedStudy(studyId) {
  const stored = JSON.parse(localStorage.getItem("recentStudyIds")) || [];

  const filtered = stored.filter((id) => id !== studyId); // 중복 제거
  const updated = [studyId, ...filtered].slice(0, 3); // 최대 3개만 저장

  localStorage.setItem("recentStudyIds", JSON.stringify(updated));
}
function StudyViewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [pwError, setPwError] = useState(false);
  const handleEmojiPicker = () => {
    setIsEmojiOpen((prev) => !prev);
  };
  const [item, setItem] = useState({});
  const targetDate = new Date();

  const filteredHabits = item.habits
    ? item.habits.filter((habit) => {
        const createdAt = new Date(habit.createdAt);
        const endDate = habit.endDate ? new Date(habit.endDate) : null;
        const hasChecked = Object.values(habit.checkedDays || {}).some(Boolean);

        return createdAt <= targetDate && (!endDate || endDate > targetDate);
      })
    : [];

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const { studyId } = useParams();
  const navigate = useNavigate();
  const handleFetch = async () => {
    const study = await getStudyItem(studyId + "?populateHabits=true");
    console.log("study:" + study);
    if (!item) {
      return <Navigate to={"/"} />;
    }
    setItem(study);
  };

  const handlePasswordCheck = async (password) => {
    try {
      await checkStudyPassword(studyId, password);

      // 성공 시 모달 닫고 이동
      if (isModalOpen === "modify") {
        navigate(`/study/${studyId}/edit`);
      } else if (isModalOpen === "habits") {
        navigate(`/study/${studyId}/habits`);
      } else if (isModalOpen === "concentration") {
        navigate(`/study/${studyId}/concentration`);
      }
      setIsModalOpen(false);
    } catch (err) {
      showToast("비밀번호가 일치하지 않습니다.", true);
    }
  };

  const refreshStudyItem = async () => {
    const study = await getStudyItem(studyId);
    setItem(study);
  };

  const handleEmojiSelect = async (emoji) => {
    console.log("😃 선택된 이모지:", emoji);
    const safeEmoji = emoji.native || emoji;

    // 로컬스토리지에서 해당 이모지를 이미 눌렀는지 확인
    const storage = JSON.parse(localStorage.getItem("emojis")) || {};
    const hasReacted = storage[studyId]?.[emoji] === true;

    if (hasReacted) {
      showToast("이미 반응한 이모지입니다.", true);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/emojis/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studyId,
          emoji: safeEmoji,
          action: "increase", // 항상 처음은 증가
        }),
      });

      const result = await res.json();
      console.log("✅ 등록 성공:", result);

      // 로컬스토리지 업데이트
      storage[studyId] = storage[studyId] || {};
      storage[studyId][emoji] = true;
      localStorage.setItem("emojis", JSON.stringify(storage));

      // 새로고침
      if (refreshStudyItem) {
        refreshStudyItem?.(studyId);
      }
    } catch (error) {
      console.error("이모지 등록 실패:", error);
    }
  };

  useEffect(() => {
    if (studyId) {
      saveRecentlyViewedStudy(studyId);
      handleFetch();
    }
  }, [studyId]);

  if (item === undefined) return <p>로딩 중...</p>;
  if (item === null) return <Navigate to="/" />;

  // 스터디 삭제
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = async (password) => {
    try {
      await checkStudyPassword(studyId, password);
      await deleteStudy(studyId);
      alert("스터디가 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      showToast("비밀번호가 일치하지 않습니다.", "error");
    }
  };

  const [toastMessage, setToastMessage] = useState("");
  const [err, setErr] = useState(false);

  const showToast = (message, isError = false) => {
    setToastMessage(message);
    setErr(isError);
    setTimeout(() => {
      setToastMessage("");
      setErr(false);
    }, 2000);
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("링크가 복사되었습니다.");
    } catch (err) {
      showToast("링크 복사에 실패했습니다.", true);
    }
  };
  return (
    <>
      <div className={styles.block__card}>
        <div className={styles.card__header}>
          <div className={styles.util}>
            <div className={styles.emoji__block}>
              {item.emojis?.length > 0 ? (
                <EmojiArea
                  emojis={item.emojis}
                  studyId={studyId}
                  onRefreshItem={refreshStudyItem}
                  expandable={true}
                />
              ) : (
                ""
              )}
              <div className={styles.picker__area}>
                <button type="button" onClick={handleEmojiPicker}>
                  <img src={smile} />
                  추가
                </button>
                {isEmojiOpen && (
                  <CustomEmojiPicker onSelect={handleEmojiSelect} />
                )}
              </div>
            </div>
            <ul className={styles.study__action__area}>
              <li>
                <button
                  type="button"
                  className={"primary"}
                  onClick={handleCopyLink}
                >
                  공유하기
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={"primary"}
                  onClick={() => setIsModalOpen("modify")}
                >
                  수정하기
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  스터디 삭제하기
                </button>
              </li>
            </ul>
          </div>
          <div className={styles.study__info__area}>
            <div className={styles.title__area}>
              <h2>{item.title}</h2>
              <div>
                <ul className={styles.study__detail__area}>
                  <li>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen("habits")}
                    >
                      오늘의 습관
                      <img src={arrowRight} />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen("concentration")}
                    >
                      오늘의 집중
                      <img src={arrowRight} />
                    </button>
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
          {filteredHabits.length > 0 ? (
            <HabitsTable habits={filteredHabits} />
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
      {isModalOpen !== false && (
        <PasswordModal
          title={item.title}
          pw={item.password}
          onConfirm={handlePasswordCheck}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteStudyModal
          title={item.title}
          onConfirm={handleDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      {toastMessage && (
        <div className={`${styles.toast} ${err ? styles.toast__err : ""}`}>
          <p>{toastMessage}</p>
        </div>
      )}
    </>
  );
}

export default StudyViewPage;
