import { time } from "../App";

const inTimeSpan = (start, end) => {
  const now = new Date(time.time);
  let currentTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds() + 3
  );
  let startTime = new Date(start);
  let endTime = new Date(end);

  return (
    currentTime.getTime() > startTime.getTime() &&
    currentTime.getTime() < endTime.getTime()
  );
};

export default inTimeSpan;
