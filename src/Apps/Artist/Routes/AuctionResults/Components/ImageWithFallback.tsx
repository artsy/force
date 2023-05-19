import { Box, Flex } from "@artsy/palette"
import { useState } from "react"
import NoArtIcon from "@artsy/icons/NoArtIcon"

export const ImageWithFallback = ({ Fallback, ...props }) => {
  const [useFallback, setFallback] = useState(false)
  if (useFallback) {
    return <Fallback />
  } else {
    return <img onError={() => setFallback(true)} alt="" {...props} />
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
        <NoArtIcon width="28px" height="28px" fill="black30" />
      </Flex>
    </Box>
  )
}
