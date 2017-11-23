export default class Utility {
  static randomIntFromInterval(min, max) {
    return Math.floor((Math.random() * ((max - min) + 1)) + min)
  }

  static createGuid() {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`)
  }
}
