import TargetTime from '../target-time.mjs'

export default () => ({
  timer: null,
  minutes: null,
  seconds: null,
  targetTime: null,
  passedTargetTime: null,
  updateTimer: () => {
  },
  init() {
    const targetTime = new TargetTime(120);

    this.minutes = targetTime.minutes;
    this.seconds = targetTime.seconds;
    this.passedTargetTime = targetTime.passedTargetTime;
    this.updateTimer();
    this.timer = setInterval(() => {
      this.minutes = targetTime.minutes;
      this.seconds = targetTime.seconds;
      this.passedTargetTime = targetTime.passedTargetTime;
    }, 1000);
  },
  destroy() {
    clearInterval(this.timer);
  },
})