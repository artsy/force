import { cubicInOut } from './easing'

/**
 * Class representing an animatable value and a callback that acts on it.
 *
 * Can be used to transition any value over any duration, but particularly
 * useful in animating UI elements that can't be handled via CSS transitions.
 *
 * Uses the Window.requestAnimationFrame API in order to be as smooth and
 * CPU-friendly as possible.
 *
 * Example: Animate the window scroll position over 3/4 of a second
 *
 * const startingScrollPosition = 0
 * const endingScrollPosition = 1000
 * const durationInMilliseconds = 750
 *
 * const myAnimator = new FrameAnimator(value => window.scrollTo(0,value), {
 *   startValue: startingScrollPosition,
 *   endValue: endingScrollPosition,
 *   duration: durationInMilliseconds
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
   */
  constructor (callback, options = {}) {
    const { duration = 500, startValue = 0, endValue = 1 } = options
    this._animatorFunction = this._createAnimatorFunction(callback, {
      duration,
      startValue,
      endValue
    })
  }

  _createAnimatorFunction (callback, { duration, startValue, endValue }) {
    const startedAt = window.performance.now()
    const animatorFunction = timestamp => {
      const elapsed = timestamp - startedAt
      if (elapsed <= duration) {
        const t = elapsed / duration
        const currentEasing = cubicInOut(t)
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
