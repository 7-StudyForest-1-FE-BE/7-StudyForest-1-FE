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
        {/* 상단 헤더 섹션 */}
        <div className="concentration__header">
          <div className="concentration__header-left">
            <h1 className="concentration__site-title">연우의 개발공장</h1>
            <p className="concentration__site-subtitle">
              현재까지 획득한 포인트
            </p>
            <div className="concentration__site-tag">310P 획득</div>
          </div>
          <div className="concentration__header-right">
            <button className="concentration__header-btn">오늘의 습관 ›</button>
            <button className="concentration__header-btn">홈 ›</button>
          </div>
        </div>

        {/* 타이머 섹션 */}
        <div className="concentration__timer-section">
          <h2 className="concentration__timer-title">오늘의 집중</h2>

          <div className="concentration__timer">
            <div className="concentration__time">{formatTime(time)}</div>

            <button className="concentration__start-btn" onClick={handleStart}>
              ▶ Start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcentrationPage;
