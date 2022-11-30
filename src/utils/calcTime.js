function calcTime(time, offset) {
  let nd = new Date(time + 3600000 * offset);
  return nd;
}

export default calcTime;
