import { useState } from "react"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { isTouch } from "v2/Utils/device"

export const useHoverMetadata = () => {
  const [isHovered, setIsHovered] = useState(false)
  const isHoverEffectEnabled = useFeatureFlag(
    "force-enable-hover-effect-for-artwork-item"
  )

  const onMouseEnter = () => {
    if (isHoverEffectEnabled ?? !isTouch) {
      setIsHovered(true)
    }
  }

  const onMouseLeave = () => {
    if (isHoverEffectEnabled ?? !isTouch) {
      setIsHovered(false)
    }
  }

  return {
    isHovered,
    isHoverEffectEnabled,
    onMouseEnter,
    onMouseLeave,
  }
}
