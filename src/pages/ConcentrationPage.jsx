import leaf from "../assets/ic_leaf.svg";
import arrow from "../assets/ic_arrow_right.svg";
import play from "../assets/ic_play.svg";
import timer from "../assets/ic_timer.svg";
import pauseBtn from "../assets/ic_pause_btn.svg";
import restartBtn from "../assets/ic_restart_btn.svg";
import stop from "../assets/ic_stop.svg";
import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getStudyItem } from "../api/List_DS";
import ExitConfirmModal from "../components/Modal/ExitConfirmModal";
import "./ConcentrationPage.css";

function ConcentrationPage() {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [time, setTime] = useState(25 * 60);
  const [originalTime, setOriginalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTime, setEditTime] = useState("25:00");
  const [isPaused, setIsPaused] = useState(false);
  const [showPointMessage, setShowPointMessage] = useState(false);
  const [pointMessage, setPointMessage] = useState("");
  const [studyPoints, setStudyPoints] = useState(0);
  const [studyInfo, setStudyInfo] = useState({ nickname: "", title: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const intervalRef = useRef(null);

  // 스터디 정보 로드
  useEffect(() => {
    if (studyId) {
      fetchStudyInfo();
    }
  }, [studyId]);

  // 페이지 이탈 방지
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isTimerActive()) {
        e.preventDefault();
        e.returnValue =
          "지금 나가면 포인트를 획득하지 못합니다! 그래도 나가시겠습니까?";
        return e.returnValue;
      }
    };

    const handlePopState = (e) => {
      if (isTimerActive()) {
        e.preventDefault();
        setShowExitModal(true);
        setPendingNavigation("back");
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isRunning, hasStarted, time]);

  const isTimerActive = () => {
    return (isRunning || isPaused) && hasStarted && time > 0;
  };

  const fetchStudyInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      const study = await getStudyItem(studyId);

      console.log("스터디 정보:", study);

      if (!study) {
        setError("스터디를 찾을 수 없습니다.");
        return;
      }

      setStudyPoints(study.points || 0);
      setStudyInfo({
        nickname: study.nickname || "",
        title: study.title || "",
      });
    } catch (error) {
      console.error("스터디 정보 로드 실패:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const minutes = Math.floor(absSeconds / 60);
    const remainingSeconds = absSeconds % 60;
    const timeString = `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    return isNegative ? `-${timeString}` : timeString;
  };

  const calculatePoints = (completedSeconds) => {
    const minRequiredTime = 10 * 60; // 10분

    if (completedSeconds < minRequiredTime) {
      return 0;
    }

    const basePoints = 3;
    const bonusPoints = Math.floor(completedSeconds / (10 * 60));
    return basePoints + bonusPoints;
  };

  const saveTimerResult = async (duration) => {
    if (!studyId) {
      console.error("studyId가 없습니다.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/timers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          duration: duration,
          studyId: studyId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const earnedPoints = result.earnedPoints;

        setStudyPoints((prev) => prev + earnedPoints);

        if (earnedPoints > 0) {
          setPointMessage(`${earnedPoints}포인트를 획득했습니다!`);
        } else {
          setPointMessage("최소 10분 완료해야 포인트를 획득할 수 있습니다!");
        }
        setShowPointMessage(true);

        setTimeout(() => {
          setShowPointMessage(false);
        }, 3000);
      } else {
        console.error("타이머 결과 저장 실패");
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  const getTimerColor = () => {
    if (time < 0) {
      return "#818181";
    } else if (time <= 10 && time >= 0) {
      return "#F50E0E";
    }
    return "#414141";
  };

  const handleStart = () => {
    if (time <= 0) {
      handleStop();
      return;
    }
    setIsRunning(true);
    setHasStarted(true);
    setIsEditing(false);
    setIsPaused(false);
    setShowPointMessage(false);

    if (!hasStarted) {
      setOriginalTime(time);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    const completedTime = Math.max(0, originalTime - Math.max(0, time));
    if (hasStarted && completedTime > 0) {
      saveTimerResult(completedTime);
    }

    setIsRunning(false);
    setTime(25 * 60);
    setOriginalTime(25 * 60);
    setHasStarted(false);
    setIsEditing(false);
    setEditTime("25:00");
    setIsPaused(false);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTime(25 * 60);
    setOriginalTime(25 * 60);
    setHasStarted(false);
    setIsEditing(false);
    setEditTime("25:00");
    setIsPaused(false);
    setShowPointMessage(false);
  };

  const handleTimeClick = () => {
    if (!isRunning && !hasStarted) {
      setIsEditing(true);
      setEditTime(formatTime(time));
    }
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,2}:\d{0,2}$/.test(value) || /^\d{0,2}$/.test(value)) {
      setEditTime(value);
    }
  };

  const handleTimeSubmit = () => {
    const parts = editTime.split(":");
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10) || 0;
      const seconds = parseInt(parts[1], 10) || 0;

      if (minutes >= 0 && minutes <= 60 && seconds >= 0 && seconds <= 59) {
        const totalSeconds = minutes * 60 + seconds;
        setTime(totalSeconds);
        setOriginalTime(totalSeconds);
        setIsEditing(false);
      } else {
        setEditTime(formatTime(time));
        setIsEditing(false);
      }
    } else {
      setEditTime(formatTime(time));
      setIsEditing(false);
    }
  };

  const handleTimeKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTimeSubmit();
    } else if (e.key === "Escape") {
      setEditTime(formatTime(time));
      setIsEditing(false);
    }
  };

  const handleNavigation = (path) => {
    if (isTimerActive()) {
      setShowExitModal(true);
      setPendingNavigation(path);
    } else {
      navigate(path);
    }
  };

  // 모달 확인 시 실행
  const confirmExit = () => {
    setShowExitModal(false);
    // 타이머 정리
    handleStop();

    if (pendingNavigation === "back") {
      window.history.back();
    } else if (pendingNavigation) {
      navigate(pendingNavigation);
    }
    setPendingNavigation(null);
  };

  // 모달 취소 시 실행
  const cancelExit = () => {
    setShowExitModal(false);
    setPendingNavigation(null);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // studyId가 없는 경우 처리
  if (!studyId) {
    return (
      <div className="concentration">
        <div className="concentration__container">
          <div className="error-message">스터디 ID가 없습니다.</div>
        </div>
      </div>
    );
  }

  // 로딩 상태 처리
  if (loading) {
    return (
      <div className="concentration">
        <div className="concentration__container">
          <div className="loading-message">스터디 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="concentration">
        <div className="concentration__container">
          <div className="error-message">
            스터디 정보를 불러오는데 실패했습니다: {error}
            <br />
            <Link to="/">홈으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="concentration">
      <div className="concentration__container">
        <div className="concentration__header">
          <div className="header__title">
            <h1 className="title__txt">
              {studyInfo.nickname || studyInfo.title
                ? `${studyInfo.nickname || "사용자"}의 ${
                    studyInfo.title || "스터디"
                  }`
                : "스터디"}
            </h1>
            <div className="button">
              <button className="habit__btn">
                <div
                  onClick={() =>
                    handleNavigation(
                      studyId ? `/study/${studyId}/habits` : "/habit"
                    )
                  }
                >
                  오늘의 습관
                  <img src={arrow} alt="arrow" className="arrow__icon" />
                </div>
              </button>
              <button className="home__btn">
                <div onClick={() => handleNavigation("/")}>
                  홈
                  <img src={arrow} alt="arrow" className="arrow__icon" />
                </div>
              </button>
            </div>
          </div>
          <div className="header__sub-title">
            <h2 className="point">현재까지 획득한 포인트</h2>
            <div className="point__tag">
              <img src={leaf} alt="leaf" className="point__icon" />
              <span className="point__text">{studyPoints}P 획득</span>
            </div>
          </div>
        </div>
        <div className="concentration__timer-section">
          <div className="timer__container">
            <div className="timer__title">
              <h2 className="timer__title-text">오늘의 집중</h2>
              {hasStarted && (
                <div className="timer__status">
                  <img src={timer} alt="timer" className="timer__icon" />
                  <span className="timer__status-text">{formatTime(time)}</span>
                </div>
              )}
            </div>
            <div className="concentration__timer">
              {isEditing ? (
                <input
                  type="text"
                  value={editTime}
                  onChange={handleTimeChange}
                  onBlur={handleTimeSubmit}
                  onKeyDown={handleTimeKeyDown}
                  className="concentration__time-input"
                  placeholder="MM:SS"
                  maxLength="5"
                  autoFocus
                />
              ) : (
                <div
                  className={`concentration__time ${
                    !isRunning && !hasStarted
                      ? "concentration__time--clickable"
                      : ""
                  }`}
                  onClick={handleTimeClick}
                  style={{ color: getTimerColor() }}
                >
                  {formatTime(time)}
                </div>
              )}
              <div className="concentration__controls">
                {hasStarted && time > 0 && (
                  <button
                    className="concentration__control-btn"
                    onClick={handlePause}
                  >
                    <img src={pauseBtn} alt="pause" className="control__icon" />
                  </button>
                )}
                <button
                  className={`concentration__start-btn ${
                    (isRunning || isPaused) && time > 0
                      ? "concentration__start-btn--running"
                      : ""
                  }`}
                  onClick={handleStart}
                >
                  <img
                    src={time <= 0 ? stop : play}
                    alt={time <= 0 ? "stop" : "play"}
                    className="play__icon"
                  />
                  {time <= 0 ? "Stop!" : "Start!"}
                </button>
                {hasStarted && time > 0 && (
                  <button
                    className="concentration__control-btn"
                    onClick={handleRestart}
                  >
                    <img
                      src={restartBtn}
                      alt="restart"
                      className="control__icon"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="status__container">
          {isPaused && time > 0 && (
            <div className="status__message status__message--paused">
              <span className="status__icon">🚨</span>
              <span className="status__text">집중이 중단되었습니다.</span>
            </div>
          )}

          {showPointMessage && (
            <div className="status__message status__message--point">
              <span className="status__icon">🎉</span>
              <span className="status__text">{pointMessage}</span>
            </div>
          )}
        </div>

        {/* 이탈 확인 모달 */}
        <ExitConfirmModal
          isOpen={showExitModal}
          onConfirm={confirmExit}
          onCancel={cancelExit}
        />
      </div>
    </div>
  );
}

export default ConcentrationPage;
