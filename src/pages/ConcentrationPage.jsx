import leaf from "../assets/ic_leaf.svg";
import arrow from "../assets/ic_arrow_right.svg";
import play from "../assets/ic_play.svg";
import timer from "../assets/ic_timer.svg";
import pauseBtn from "../assets/ic_pause_btn.svg";
import restartBtn from "../assets/ic_restart_btn.svg";
import stop from "../assets/ic_stop.svg";
import { useState, useEffect, useRef } from "react";
import "./ConcentrationPage.css";

function ConcentrationPage() {
  const [time, setTime] = useState(25 * 60); // 25분을 초로 변환
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // 타이머가 한 번이라도 시작했는지 확인
  const [isEditing, setIsEditing] = useState(false); // 시간 편집 모드
  const [editTime, setEditTime] = useState("25:00"); // 편집 중인 시간
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const [showPointMessage, setShowPointMessage] = useState(false); // 포인트 획득 메시지 표시
  const intervalRef = useRef(null);

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

  const handleStart = () => {
    if (time <= 0) {
      handleStop();
      return;
    }
    setIsRunning(true);
    setHasStarted(true);
    setIsEditing(false); // 시작 시 편집 모드 종료
    setIsPaused(false);
    setShowPointMessage(false); // 메시지 숨기기
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    // 포인트 획득 메시지 표시
    setShowPointMessage(true);
    // 3초 후 메시지 자동 숨김
    setTimeout(() => {
      setShowPointMessage(false);
    }, 3000);

    // 초기 상태로 리셋
    setIsRunning(false);
    setTime(25 * 60);
    setHasStarted(false);
    setIsEditing(false);
    setEditTime("25:00");
    setIsPaused(false);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTime(25 * 60); // 25분으로 리셋
    setHasStarted(false); // 리셋 시 시작 상태도 초기화
    setIsEditing(false);
    setEditTime("25:00");
    setIsPaused(false);
    setShowPointMessage(false);
  };

  const handleTimeClick = () => {
    if (!isRunning && !hasStarted) {
      // 실행 중이 아니고 시작하지 않은 상태에서만 편집 가능
      setIsEditing(true);
      setEditTime(formatTime(time));
    }
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    // MM:SS 형식 검증
    if (/^\d{0,2}:\d{0,2}$/.test(value) || /^\d{0,2}$/.test(value)) {
      setEditTime(value);
    }
  };

  const handleTimeSubmit = () => {
    const parts = editTime.split(":");
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10) || 0;
      const seconds = parseInt(parts[1], 10) || 0;

      // 0:00 ~ 60:00 범위 체크
      if (minutes >= 0 && minutes <= 60 && seconds >= 0 && seconds <= 59) {
        const totalSeconds = minutes * 60 + seconds;
        setTime(totalSeconds);
        setIsEditing(false);
      } else {
        // 범위 벗어나면 기본값으로 되돌리기
        setEditTime(formatTime(time));
        setIsEditing(false);
      }
    } else {
      // 형식이 잘못되면 기본값으로 되돌리기
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
            <h1 className="title__txt">연우의 개발공장</h1>
            <div className="button">
              <button className="habit__btn">
                오늘의 습관
                <img src={arrow} alt="arrow" className="arrow__icon" />
              </button>
              <button className="home__btn">
                홈
                <img src={arrow} alt="arrow" className="arrow__icon" />
              </button>
            </div>
          </div>
          <div className="header__sub-title">
            <h2 className="point">현재까지 획득한 포인트</h2>
            <div className="point__tag">
              <img src={leaf} alt="leaf" className="point__icon" />
              <span className="point__text">310P 획득</span>
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
                  className="concentration__time"
                  onClick={handleTimeClick}
                  style={{
                    cursor: !isRunning && !hasStarted ? "pointer" : "default",
                    userSelect: "none",
                  }}
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
                  className="concentration__start-btn"
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

        {/* 상태 메시지 */}
        <div className="status__container">
          {isPaused && time > 0 && (
            <div className="status__message status__message--paused">
              <span className="status__icon">⚠️</span>
              <span className="status__text">집중이 중단되었습니다.</span>
            </div>
          )}

          {showPointMessage && (
            <div className="status__message status__message--point">
              <span className="status__text">50포인트를 획득했습니다!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConcentrationPage;
