import { clearInterval, setInterval } from "worker-timers";

export class Test {
  constructor(time) {
    this.time = time;
    setInterval(() => {
      this.time += 1000;
    }, 1000);
  }
  setTime(time) {
    this.time = time;
  }
}
