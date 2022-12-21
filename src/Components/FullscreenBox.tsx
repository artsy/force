import { Box, BoxProps } from "@artsy/palette"
import { FC, useEffect, useState } from "react"
import { useSizeAndPosition } from "Utils/Hooks/useSizeAndPosition"
import { scale } from "proportional-scale"

export interface FullscreenBoxProps extends BoxProps {
  aspectWidth: number
  aspectHeight: number
}

/**
 * Component allows one to make an aspect ratio box that's is contained inside of the parent and supports a fluid 100% width and height.
 * - We can't create a grey placeholder box using `ResponsiveBox` because it has to be both width and *height* constrained.
 * - We can't use an image with `object-fit: contain` because that doesn't give us a correctly sized placeholder box.
 * - We can't create a grey placeholder box using native CSS `aspect-ratio` because it is uncenterable using flexbox.
 */
export const FullscreenBox: FC<FullscreenBoxProps> = ({
  aspectWidth,
  aspectHeight,
  children,
  ...rest
}) => {
  const { ref, width, height } = useSizeAndPosition({
    debounce: 50,
    trackMutation: true,
  })

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

  return (
    <Box ref={ref as any} width="100%" height="100%" display="flex">
      <Box width={scaledWidth} height={scaledHeight} m="auto" {...rest}>
        {children}
      </Box>
    </Box>
  )
}
