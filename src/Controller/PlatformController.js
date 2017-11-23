import MovementController from './MovementController'

export default class PlatformController extends MovementController {
  constructor(platform) {
    super(platform)
  }

  move(newPosition) {
    super.move([newPosition[0], null])
  }
}
