import * as React from "react"
import { Box, BoxProps, Image, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { resized } from "Utils/resized"

export const FairsPhonePromo: React.FC<BoxProps> = props => {
  const img = resized(
    "https://files.artsy.net/images/fair-iphone-promo-large.jpg",
    { width: 155, height: 223 }
  )

  return (
    <RouterLink
      to="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
      display="block"
      textDecoration="none"
      aria-label="Download Artsy for iPhone for a personalized guide to the show."
    >
      <Box display="flex" alignItems="center" flexDirection="column" {...props}>
        <Image
          width={155}
          height={223}
          src={img.src}
          srcSet={img.srcSet}
          alt="Artsy for iPhone"
        />

        <Text maxWidth="50%" textAlign="center" variant="sm-display">
          Download Artsy for iPhone for a personalized guide to the show.
        </Text>
      </Box>
    </RouterLink>
  )
}
