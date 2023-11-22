/* Full copyright to the author. No use allowed */

/**
 * 
 * @param {number} number The number to pad with zero
 * @returns string
 */
function padNumberWithZero(number) {
  return number <= 9 ? `0${number}` : number + ''
}

export default class TargetTime {
  /**
   * 
   * @param {number} targetTimeInMinutes Number of minutes to target
   */
  constructor(targetTimeInMinutes) {
    if (targetTimeInMinutes > 60 * 24) throw new Error('Maximum target reached')
    this.targetTimeInMinutes = targetTimeInMinutes;

    this.targetDateTime = new Date();
    this.targetDateTime.setSeconds(this.targetDateTime.getSeconds());
    this.targetDateTime.setMinutes(this.targetDateTime.getMinutes() + targetTimeInMinutes);
  }

  _diffInMilliseconds() {
    return Math.abs(this.targetDateTime - new Date())
  }

  get passedTargetTime() {
    return this.targetDateTime < new Date()
  }

  get signal() {
    return this.passedTargetTime ? '+' : ''
  }

  get minutes() {
    const minutes = Math.floor(this._diffInMilliseconds() / 1000 / 60)
    return padNumberWithZero(minutes)
  }

  get seconds() {
    let seconds = Math.floor(this._diffInMilliseconds() / 1000 % 60)
    return padNumberWithZero(seconds)
  }

  toString() {
    return `${this.signal}${this.minutes}:${this.seconds}`
  }
}