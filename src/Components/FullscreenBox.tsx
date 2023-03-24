import { Box, BoxProps } from "@artsy/palette"
import { FC } from "react"
import { useFullscreenBox } from "Utils/Hooks/useFullscreenBox"

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
  const { ref, scaledWidth, scaledHeight } = useFullscreenBox({
    aspectWidth,
    aspectHeight,
  })

  return (
    <Box ref={ref as any} width="100%" height="100%" display="flex">
      <Box width={scaledWidth} height={scaledHeight} m="auto" {...rest}>
        {children}
      </Box>
    </Box>
  )
}
