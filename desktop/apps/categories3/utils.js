import _ from 'underscore'
import { cubicInOut } from './easing'

export const alphabetizeGenes = genes => _.sortBy(genes, gene => gene.name)

export const featuredGenesForFamily = (familyName, featuredGenesList) => {
  return _.find(
    featuredGenesList,
    featuredGenesFamily => featuredGenesFamily.name === familyName
  )
}

export const frameAnimator = (options, callback) => {
  const { duration = 500, startValue = 0, endValue = 1 } = options
  const startedAt = window.performance.now()

  const animator = timestamp => {
    const elapsed = timestamp - startedAt
    if (elapsed <= duration) {
      const t = elapsed / duration
      const currentEasing = cubicInOut(t)
      const currentValue = startValue + currentEasing * (endValue - startValue)
      callback(currentValue)
      window.requestAnimationFrame(animator)
    }
  }
  return animator
}
