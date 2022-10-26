const inTimeSpan = (start, end) => {
  let currentTime = new Date();
  let startTime = new Date(start);
  let endTime = new Date(end);
  return (
    currentTime.getTime() > startTime.getTime() &&
    currentTime.getTime() < endTime.getTime()
  );
};

export default inTimeSpan;
