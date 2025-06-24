<<<<<<< HEAD
import styles from './StudyViewPage.module.css';
import smile from '../assets/ic_smile.svg';
import arrowRight from '../assets/ic_arrow_right.svg';
import point from '../assets/ic_point.svg';
import { useState, useEffect } from 'react';
import { Link, Navigate, useParams, useNavigate } from 'react-router';
import mockData from '../mock.json';
import HabitsTable from '../components/Study/HabitsTable';
import EmojiPicker from 'emoji-picker-react';
import PasswordModal from '../components/Modal/PasswordModal';
import EmojiButton from '../components/Emoji/EmojiButton';
import { getStudyItem, checkStudyPassword } from '../api/List_DS.js';
import DeleteStudyModal from '../components/Modal/DeleteStudyModal.jsx';
import { deleteStudy } from '../api/View_JS.js';
=======
import styles from "./StudyViewPage.module.css";
import smile from "../assets/ic_smile.svg";
import arrowRight from "../assets/ic_arrow_right.svg";
import point from "../assets/ic_point.svg";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router";
import mockData from "../mock.json";
import HabitsTable from "../components/Study/HabitsTable";
import EmojiPicker from "emoji-picker-react";
import PasswordModal from "../components/Modal/PasswordModal";
import EmojiButton from "../components/Emoji/EmojiButton";
import { getStudyItem, checkStudyPassword } from "../api/List_DS.js";
n;
>>>>>>> sg-fixed

function saveRecentlyViewedStudy(studyId) {
  const stored = JSON.parse(localStorage.getItem('recentStudyIds')) || [];

  const filtered = stored.filter((id) => id !== studyId); // 중복 제거
  const updated = [studyId, ...filtered].slice(0, 3); // 최대 3개만 저장

  localStorage.setItem('recentStudyIds', JSON.stringify(updated));
}
function StudyViewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [pwError, setPwError] = useState(false);
  const handleEmojiPicker = () => {
    setIsEmojiOpen((prev) => !prev);
  };
  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const { studyId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const handleFetch = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> sg-fixed
    const study = await getStudyItem(studyId + "?populateHabits=true");
    console.log("study:" + study);
=======
    const study = await getStudyItem(studyId);
    console.log('study:' + study);
>>>>>>> 7f00dffdfc71b4a005a89a4219e34c2bc4fe7b52
    if (!item) {
      return <Navigate to={'/'} />;
    }
    setItem(study);
  };

  const handlePasswordCheck = async (password) => {
    try {
      await checkStudyPassword(studyId, password);

      // 성공 시 모달 닫고 이동
      if (isModalOpen === 'modify') {
        navigate(`/study/${studyId}/edit`);
      } else if (isModalOpen === 'habits') {
        navigate(`/study/${studyId}/habits`);
      } else if (isModalOpen === 'concentration') {
        navigate(`/study/${studyId}/concentration`);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('비밀번호 확인 에러:', err);
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
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
      alert('스터디가 삭제되었습니다.');
      navigate('/');
    } catch (err) {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  return (
    <>
      <div className={styles.block__card}>
        <div className={styles.card__header}>
          <div className={styles.util}>
            <div className={styles.emoji__area}>
              {item.emojis?.map((reaction) => {
                return <EmojiButton reaction={reaction} />;
              })}
              <div className={styles.picker__area}>
                <button type="button" onClick={handleEmojiPicker}>
                  <img src={smile} />
                  추가
                </button>
                {isEmojiOpen && <EmojiPicker className={styles.emoji__picker} />}
              </div>
            </div>
            <ul className={styles.study__action__area}>
              <li>
                <button type="button" className={'primary'}>
                  공유하기
                </button>
              </li>
              <li>
                <button type="button" className={'primary'} onClick={() => setIsModalOpen('modify')}>
                  수정하기
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setIsDeleteModalOpen(true)}>
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
                    <button type="button" onClick={() => setIsModalOpen('habits')}>
                      오늘의 습관
                      <img src={arrowRight} />
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => setIsModalOpen('concentration')}>
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
      {isModalOpen !== false && (
        <PasswordModal
          title={item.title}
          pw={item.password}
          onConfirm={handlePasswordCheck}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteStudyModal title={item.title} onConfirm={handleDelete} onClose={() => setIsDeleteModalOpen(false)} />
      )}
      {pwError && (
        <div className={styles.toast}>
          <p>비밀번호가 일치하지 않습니다. 다시 입력해주세요.</p>
        </div>
      )}
    </>
  );
}

export default StudyViewPage;
