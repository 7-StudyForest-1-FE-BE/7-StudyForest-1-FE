import leaf from "../assets/ic_leaf.svg";
import arrow from "../assets/ic_arrow_right.svg";
import play from "../assets/ic_play.svg";
import timer from "../assets/ic_timer.svg";
import pauseBtn from "../assets/ic_pause_btn.svg";
import restartBtn from "../assets/ic_restart_btn.svg";
import stop from "../assets/ic_stop.svg";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import "./ConcentrationPage.css";

function ConcentrationPage() {
  const { studyId } = useParams(); // URL에서 studyId 가져오기
  const [time, setTime] = useState(25 * 60);
  const [originalTime, setOriginalTime] = useState(25 * 60); // 원래 설정 시간 저장
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTime, setEditTime] = useState("25:00");
  const [isPaused, setIsPaused] = useState(false);
  const [showPointMessage, setShowPointMessage] = useState(false);
  const [pointMessage, setPointMessage] = useState("");
  const [studyPoints, setStudyPoints] = useState(0); // 현재 스터디 포인트
  const [studyInfo, setStudyInfo] = useState({ nickname: "", title: "" }); // 스터디 정보 추가
  const intervalRef = useRef(null);

  // 스터디 정보 로드
  useEffect(() => {
    if (studyId) {
      fetchStudyInfo();
    }
  }, [studyId]);

  const fetchStudyInfo = async () => {
    try {
      const response = await fetch(`/api/studies/${studyId}`);
      if (response.ok) {
        const study = await response.json();
        console.log("스터디 정보:", study); // 디버깅용
        setStudyPoints(study.points);
        setStudyInfo({
          nickname: study.nickname || "",
          title: study.title || "",
        }); // nickname과 title 저장
      }
    } catch (error) {
      console.error("스터디 정보 로드 실패:", error);
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

  // 포인트 계산 함수
  const calculatePoints = (completedSeconds) => {
    const basePoints = 3;
    const bonusPoints = Math.floor(completedSeconds / (10 * 60));
    return basePoints + bonusPoints;
  };

  // 타이머 완료 시 포인트 저장
  const saveTimerResult = async (duration) => {
    if (!studyId) {
      console.error("studyId가 없습니다.");
      return;
    }

    try {
      const response = await fetch("/api/timers", {
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

        // 포인트 업데이트
        setStudyPoints((prev) => prev + earnedPoints);

        setPointMessage(`${earnedPoints}포인트를 획득했습니다!`);
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
                : "스터디 로딩 중..."}
            </h1>
            <div className="button">
              <button className="habit__btn">
                <Link to={"/habit"}>
                  오늘의 습관
                  <img src={arrow} alt="arrow" className="arrow__icon" />
                </Link>
              </button>
              <button className="home__btn">
                <Link to={""}>
                  홈
                  <img src={arrow} alt="arrow" className="arrow__icon" />
                </Link>
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
      </div>
    </div>
  );
}

export default ConcentrationPage;
