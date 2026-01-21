import { Box, Image } from "@artsy/palette"
import { MODAL_WIDTH } from "Components/AuthDialog/Utils/authDialogConstants"
import { resized } from "Utils/resized"
import type * as React from "react"

export const AuthDialogLeftPanelImagePlaceholder: React.FC<{ src: string }> = ({
  src,
}) => {
  // Sized at 1px larger than the initial images
  const placeholder = resized(src, {
    width: MODAL_WIDTH / 2,
    quality: 1,
  })

  return (
    <Box width="100%" height="100%">
      <Image
        key={placeholder.src}
        src={placeholder.src}
        width="100%"
        height="100%"
        fetchPriority="high"
        lazyLoad={false}
        alt="Artwork image placeholder"
        style={{
          objectFit: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          filter: "blur(10px)",
        }}
      />
    </Box>
  )
}
