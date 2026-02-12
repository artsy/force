import { Box, Image } from "@artsy/palette"
import { resized } from "Utils/resized"
import type * as React from "react"

interface ArtworkLightboxPlaceholderProps {
  src: string
  lazyLoad: boolean
}

/**
 * Renders a highly compressed blurred image as a visual placeholder
 * while the full-quality artwork image loads.
 */
export const ArtworkLightboxPlaceholder: React.FC<
  React.PropsWithChildren<ArtworkLightboxPlaceholderProps>
> = ({ src, lazyLoad }) => {
  const placeholder = resized(src, { width: 100, height: 100, quality: 1 })

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      overflow="hidden"
      zIndex={0}
    >
      <Image
        key={placeholder.src}
        src={placeholder.src}
        width="100%"
        height="100%"
        alt="Loading"
        lazyLoad={lazyLoad}
        style={{ filter: "blur(10px)" }}
      />
    </Box>
  )
}
