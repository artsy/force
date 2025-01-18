/**
 * This enables better INP (interaction to next paint) scores for select pages
 * by circumventing the unavoidable overhead cost of rendering pages via our router.
 *
 * Only enabled on mobile! Since that's where our INP scores are failing.
 *
 * The flow:
 *   - If a page is prefetched, on first render return null
 *   - On second render, return the children
 *
 * By returning null on the first render pass, we get a snappy INP score at the
 * cost of an almost imperceptible render flash. Since it happens on page
 * transition, its not too noticeable.
 */

import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { isServer } from "Utils/device"
import { getENV } from "Utils/getENV"
import { useRouter } from "found"
import { useEffect, useState } from "react"

// Routes to enable INP optimization for
const INP_TARGET_PATHS = ["artwork", "artist"]

interface INPOptimizerProps {
  enabled: boolean
}

export const INPOptimizer: React.FC<
  React.PropsWithChildren<INPOptimizerProps>
> = ({ children, enabled }) => {
  const { match } = useRouter()
  const [isSecondRender, setIsSecondRender] = useState(false)

  const isPrefetched = match?.location?.state?.isPrefetched === true

  useEffect(() => {
    if (isPrefetched) {
      setIsSecondRender(true)
    }
  }, [isPrefetched])

  if (!enabled) {
    return children
  }

  if (isPrefetched && !isSecondRender) {
    return null
  }

  return children
}

export const useEnableINPOptimizer = () => {
  const { match } = useRouter()

  // Only enable on mobile!
  const isMobile = getENV("IS_MOBILE")

  const inpOptimizationEnabled = useFeatureFlag(
    "diamond_experimental-inp-optimization",
  )

  const targetPathRegex = new RegExp(
    `^\\/(${INP_TARGET_PATHS.join("|")})\\/[^/]+$`,
    "i",
  )

  const enableINPOptimizer = (() => {
    if (!inpOptimizationEnabled) {
      return false
    }

    if (!isMobile) {
      return false
    }

    if (match.location.state?.disableINPOptimizer === true) {
      return false
    }

    if (isServer) {
      return false
    }
    // Don't enable if BACK/FORWARD navigation/buttons clicked
    if (match.location.action === "POP") {
      return false
    }

    // Only enable for select pages that have bad INP scores
    return targetPathRegex.test(match.location.pathname)
  })()

  return enableINPOptimizer
}
