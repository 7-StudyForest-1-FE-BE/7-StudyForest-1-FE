import { useState } from "react";
import "./ConcentrationPage.css";

function ConcentrationPage() {
  const [time, setTime] = useState(25 * 60); // 25분을 초로 변환
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="concentration">
      <div className="concentration__container">
        <div className="concentration__header">
          <div className="header__title">
            <h1 className="title__txt">연우의 개발공장</h1>
            <div className="button">
              <button className="habit__btn">오늘의 습관 ›</button>
              <button className="home__btn">홈 ›</button>
            </div>
          </div>
          <div className="header__sub-title">
            <h2 className="point">현재까지 획득한 포인트</h2>
            <div className="point__num">310P 획득</div>
          </div>
        </div>
        <div className="concentration__timer-section">
          <div className="timer__container">
            <div className="timer__title">
              <h2 className="timer__title-text">오늘의 집중</h2>
            </div>
            <div className="concentration__timer">
              <div className="concentration__time">{formatTime(time)}</div>
              <button
                className="concentration__start-btn"
                onClick={handleStart}
              >
                ▶ Start!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcentrationPage;
