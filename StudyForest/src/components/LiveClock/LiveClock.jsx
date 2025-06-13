import { useEffect, useState } from "react";

function LiveClock({ className }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={className}>
      {time
        .toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .replace(/^(\d{4})\.\s?(\d{2})\.\s?(\d{2})\./, "$1-$2-$3")}
    </div>
  );
}

export default LiveClock;
