/* Full copyright to the author. No use allowed */
import TargetTime from './src/target-time.mjs';

window.document.addEventListener('alpine:init', () => {
  const initialValues = {
    exerciseLengthInMinutes: 120,
    targetCount: 500,
  }
  const MODES = {
    PAUSED: 'PAUSED',
    RUNNING: 'RUNNING',
    SETUP: 'SETUP'
  };

  Alpine.data('main', () => ({
    MODES,
    targetTime: null,
    interval: null,
    init() {
      this.reset()
      // this.start()
    },

    // interval
    stopInterval() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    startInterval() {
      this.stopInterval();
      this.interval = setInterval(() => {
        this.refreshTimer()
      }, 1000);
    },

    // timer
    minutes: null,
    seconds: null,
    passedTargetTime: null,
    refreshTimer() {
      this.minutes = this.targetTime?.minutes
      this.seconds = this.targetTime?.seconds
      this.passedTargetTime = this.targetTime?.passedTargetTime
    },

    // actions
    togglePlay() {
      if (this.mode === MODES.SETUP) return;
      if (this.mode === MODES.PAUSED) {
        this.mode = MODES.RUNNING;
        this.startInterval()
      }
      if (this.mode === MODES.RUNNING) {
        this.stopInterval();
        this.mode = MODES.PAUSED;
      }
    },
    start() {
      this.targetTime = new TargetTime(parseInt(this.exerciseLengthInMinutes))
      this.refreshTimer()
      this.mode = MODES.RUNNING
      this.startInterval()
    },
    uiReset() {
      const confirmed = confirm('Are you sure?');
      if (!confirmed) return;
      this.reset()
    },
    reset() {
      this.stopInterval();
      this.targetTime = null
      this.exerciseLengthInMinutes = initialValues.exerciseLengthInMinutes;
      this.targetCount = initialValues.targetCount
      this.count = 0;
      this.mode = MODES.SETUP
    },
    increaseCounter(by) {
      this.count += by
    },
    mode: MODES.SETUP,
    targetCount: null,
  }))
})