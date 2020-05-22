import { Box, Flex, NoArtworkIcon } from "@artsy/palette"
import React, { useState } from "react"

export const ImageWithFallback = ({ Fallback, ...props }) => {
  const [useFallback, setFallback] = useState(false)
  if (useFallback) {
    return <Fallback />
  } else {
    return <img onError={() => setFallback(true)} {...props} />
  }
}

export const renderFallbackImage = () => {
  return (
    <Box bg="black5" width="100%" height="100%">
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <NoArtworkIcon width="28px" height="28px" fill="black30" />
      </Flex>
    </Box>
  )
}
