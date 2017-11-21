export default class Utility {
  static randomIntFromInterval(min, max) {
    return Math.floor((Math.random() * ((max - min) + 1)) + min)
  }
}
