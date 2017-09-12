import * as easingFunctions from './easing'

export default class FrameAnimator {
  /**
   * Create a frame animator
   * @param {function} callback - A callback function that receives the animating value as its argument
   * @param {Object} options - Options to control the timing and value of the animator
   * @param {number} options.duration - The amount of time over which the animator should execute, in milliseconds (default = 500)
   * @param {number} options.startValue - The starting value for the animatable value (default = 0)
   * @param {number} options.endValue - The ending value for the animatable value (default = 1)
   * @param {string} options.easing - The easing formula to use (default = 'cubicInOut')
   */
  constructor (callback, options = {}) {
    const {
      duration = 500,
      startValue = 0,
      endValue = 1,
      easing = 'cubicInOut'
    } = options

    this._animatorFunction = this._createAnimatorFunction(callback, {
      duration,
      startValue,
      endValue,
      easing
    })
  }

  _createAnimatorFunction (callback, options) {
    const { duration, startValue, endValue, easing } = options
    const startedAt = window.performance.now()
    const animatorFunction = timestamp => {
      const elapsed = timestamp - startedAt
      if (elapsed <= duration) {
        const t = elapsed / duration
        const currentEasing = easingFunctions[easing](t)
        const currentValue =
          startValue + currentEasing * (endValue - startValue)
        callback(currentValue)
        window.requestAnimationFrame(animatorFunction)
      }
    }
    return animatorFunction
  }

  start () {
    window.requestAnimationFrame(this._animatorFunction)
  }
}
