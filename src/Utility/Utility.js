export default class Utility {
  static randomIntFromInterval(min, max) {
    return Math.floor((Math.random() * ((max - min) + 1)) + min)
  }

  static createGuid() {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`)
  }

  static getColorLuminance(hex, lum) {
    let newHex = String(hex).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
      newHex = newHex[0] + newHex[0] + newHex[1] + newHex[1] + newHex[2] + newHex[2]
    }

    const newLum = lum || 0
    let rgb = '#'
    let c
    let i
    for (i = 0; i < 3; i += 1) {
      c = parseInt(newHex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + (c * newLum)), 255)).toString(16)
      rgb += (`00${c}`).substr(c.length)
    }
    return rgb
  }
}
