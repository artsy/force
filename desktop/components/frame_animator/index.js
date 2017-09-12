import * as easingFunctions from './easing'

/**
 * Class representing an animatable value and a callback that acts on it.
 *
 * Can be used to transition any value over any duration, but particularly
 * useful in animating UI elements that can't be handled via CSS transitions.
 *
 * Uses the Window.requestAnimationFrame API in order to be as smooth and
 * CPU-friendly as possible.
 *
 * Example 1: Log out values from 0 to 1, over a half-second interval.
 *
 * const myLogger = new FrameAnimator(value => console.log(value))
 * myLogger.start()
 *
 * Example 2: Animate the window scroll position over 3/4 of a second,
 * easing out with a sine function.
 *
 * const startingScrollPosition = 0
 * const endingScrollPosition = 1000
 * const durationInMilliseconds = 750
 * const easingFunction = 'sinOut'
 *
 * const myAnimator = new FrameAnimator(value => window.scrollTo(0,value), {
 *   startValue: startingScrollPosition,
 *   endValue: endingScrollPosition,
 *   duration: durationInMilliseconds,
 *   easing: easingFunction
 * })
 *
 * myAnimator.start()
 *
 */
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
