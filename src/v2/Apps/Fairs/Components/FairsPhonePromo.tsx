import React from "react"
import { Box, BoxProps, Image, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const FairsPhonePromo: React.FC<BoxProps> = props => {
  return (
    <RouterLink
      to="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
      style={{ display: "block", textDecoration: "none" }}
      aria-label="Download Artsy for iPhone for a personalized guide to the show."
    >
      <Box display="flex" alignItems="center" flexDirection="column" {...props}>
        <Image
          width={155}
          height={223}
          src="https://files.artsy.net/images/fair-iphone-promo-large.jpg"
          alt="Artsy for iPhone"
        />

        <Text maxWidth="50%" textAlign="center">
          Download Artsy for iPhone for a personalized guide to the show.
        </Text>
      </Box>
    </RouterLink>
  )
}
