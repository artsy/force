import { Box, Image } from "@artsy/palette"
import * as React from "react"
import { Link } from "react-head"
import { resized } from "Utils/resized"

interface ArtworkLightboxPlaceholderProps {
  src: string
  lazyLoad: boolean
  preload: boolean
}

/**
 * This component returns a highly compressed blurred image to use as a placeholder
 * for the primary images on the artwork page. We size this as 1px larger than the
 * existing images so that it counts as the largest contentful paint. The higher
 * quality images are larger and so load slower, but the 1px difference means this
 * counts as the LCP. Despite the 1px difference it's shrunk to occupy the same size.
 */
export const ArtworkLightboxPlaceholder: React.FC<ArtworkLightboxPlaceholderProps> = ({
  src,
  lazyLoad,
  preload,
}) => {
  // Sized at 1px larger than the initial images
  const placeholder = resized(src, { width: 801, height: 801, quality: 1 })

  return (
    <>
      {preload && <Link rel="preload" as="image" href={placeholder.src} />}

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
    </>
  )
}
