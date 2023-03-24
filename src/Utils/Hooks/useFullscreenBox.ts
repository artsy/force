import { scale } from "proportional-scale"
import { useEffect, useState } from "react"
import { useSizeAndPosition } from "Utils/Hooks/useSizeAndPosition"

interface UseFullscreenBox {
  aspectWidth: number
  aspectHeight: number
}

export const useFullscreenBox = ({
  aspectWidth,
  aspectHeight,
}: UseFullscreenBox) => {
  const { ref, width, height } = useSizeAndPosition()

  const [{ scaledWidth, scaledHeight }, setScaled] = useState({
    scaledWidth: 0,
    scaledHeight: 0,
  })

  useEffect(() => {
    if (!ref.current) return

    const scaled = scale({
      width: aspectWidth,
      height: aspectHeight,
      maxWidth: width,
      maxHeight: height,
    })

    setScaled({ scaledWidth: scaled.width, scaledHeight: scaled.height })
  }, [aspectHeight, aspectWidth, height, ref, width])

  return {
    ref,
    scaledWidth,
    scaledHeight,
  }
}
