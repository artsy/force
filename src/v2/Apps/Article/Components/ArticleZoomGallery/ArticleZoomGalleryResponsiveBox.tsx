import { Box, BoxProps } from "@artsy/palette"
import { FC, useEffect, useState } from "react"
import { useSizeAndPosition } from "v2/Utils/Hooks/useSizeAndPosition"
import { scale } from "proportional-scale"

interface ArticleZoomGalleryResponsiveBoxProps extends BoxProps {
  aspectWidth: number
  aspectHeight: number
}

/**
 * - We can't create a grey placeholder box using `ResponsiveBox` because it has to be both width and height constrained.
 * - We can't create a grey placeholder box using native CSS `aspect-ratio` because it is uncenterable using flexbox as of March 2022.
 * - Instead: we just manually measure and create a grey placeholder box using JS.
 */
export const ArticleZoomGalleryResponsiveBox: FC<ArticleZoomGalleryResponsiveBoxProps> = ({
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
      <Box
        width={scaledWidth}
        height={scaledHeight}
        m="auto"
        bg="black10"
        {...rest}
      >
        {children}
      </Box>
    </Box>
  )
}
