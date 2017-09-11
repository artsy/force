import _ from 'underscore'
import { cubicInOut } from './easing'

export const alphabetizeGenes = genes => _.sortBy(genes, gene => gene.name)

export const featuredGenesForFamily = (familyName, featuredGenesList) => {
  return _.find(
    featuredGenesList,
    featuredGenesFamily => featuredGenesFamily.name === familyName
  )
}

export class FrameAnimator {
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
