import PowerUp, { PowerUpType } from '../Item/PowerUp'
import Helper from '../Utility/Utility'
import Brick from '../Item/Brick'

export const LevelDifficulty = {
  BEGINNER: 'beginnerDifficulty',
  EASY: 'easyDifficulty',
  NORMAL: 'normalDifficulty',
  HARD: 'hardDifficulty',
  EXTREME: 'extremeDifficulty',
}

export default class LevelLoader {
  static getProceduralLevelBricks(difficulty) {
    const brickColors = ['#ff5050', '#1236f1']
    const powerUps = [
      { power: PowerUpType.INCREASE_SIZE, color: '#4286f4' },
      { power: PowerUpType.INCREASE_SPEED, color: '#4286f4' },
    ]

    let brickAmount = 10
    let brickLifeInterval = ['1']

    switch (difficulty) {
      case LevelDifficulty.BEGINNER:
        brickAmount = 20
        brickLifeInterval = [1, 1]
        break
      case LevelDifficulty.EASY:
        brickAmount = 25
        brickLifeInterval = [1, 2]
        break
      case LevelDifficulty.NORMAL:
        brickAmount = 30
        brickLifeInterval = [1, 3]
        break
      case LevelDifficulty.HARD:
        brickAmount = 40
        brickLifeInterval = [2, 4]
        break
      case LevelDifficulty.EXTREME:
        brickAmount = 55
        brickLifeInterval = [3, 5]
        break
      default:
        throw new TypeError('Unknown level difficulty.')
    }

    const offset = 10
    let offsetX = offset
    let offsetY = offset
    const margin = 3
    const bricksInRow = 12
    const canvasWidth = 1000
    const brickWidth = (canvasWidth / bricksInRow).toFixed() - margin - (bricksInRow / offsetX)
    const brickHeight = 40
    const maxBricksAmount = 72

    const bricks = [new Brick(
      [offsetX, offsetY],
      [brickWidth, brickHeight],
      Helper.getRandomObjectFromArray(brickColors),
      1,
    )]
    let brickAlreadyExists = false

    while (bricks.length < brickAmount) {
      offsetX = offset
      offsetY = offset
      for (let i = 0; i < maxBricksAmount; i += 1) {
        if (Helper.randomIntFromInterval(1, 10) === 2) {
          const levelBrick = new Brick(
            [offsetX, offsetY],
            [brickWidth, brickHeight],
            Helper.getRandomObjectFromArray(brickColors),
            Helper.randomIntFromInterval(brickLifeInterval[0], brickLifeInterval[1]),
          )
          if (Helper.randomIntFromInterval(1, 3) === 2) {
            const power = Helper.getRandomObjectFromArray(powerUps)
            const powerUp = new PowerUp(
              10,
              power.color,
              power.power,
            )
            levelBrick.attachItem(powerUp)
          }
          for (let j = 0; j < bricks.length; j += 1) {
            const brickPos = bricks[j].getPosition()
            const newBrickPos = levelBrick.getPosition()
            if (brickPos[0] === newBrickPos[0] && brickPos[1] === newBrickPos[1]) {
              brickAlreadyExists = true
              break
            } else {
              brickAlreadyExists = false
            }
          }
          if (!brickAlreadyExists && bricks.length < brickAmount) {
            bricks.push(levelBrick)
          }
        }
        if (offsetX + brickWidth > canvasWidth - brickWidth) {
          offsetX = offset
          offsetY = offsetY + brickHeight + margin
        } else {
          offsetX = offsetX + brickWidth + margin
        }
      }
    }
    return bricks
  }

  static generateLevelFromJSON() {

  }

  static getLevelDifficulty(lvl) {
    switch (true) {
      case (lvl <= 2):
        return LevelDifficulty.BEGINNER
      case (lvl > 2 && lvl <= 4):
        return LevelDifficulty.EASY
      case (lvl > 4 && lvl <= 6):
        return LevelDifficulty.NORMAL
      case (lvl > 6 && lvl <= 10):
        return LevelDifficulty.HARD
      case (lvl > 10):
        return LevelDifficulty.EXTREME
      default:
        return LevelDifficulty.NORMAL
    }
  }
}
