import * as React from "react"
import { Banner, Box, FullBleed } from "@artsy/palette"

export const PromoSpace: React.FC = () => {
  return (
    <FullBleed>
      <Banner variant="defaultLight">
        Gallerist or art dealer?&nbsp;
        <a href="https://partners.artsy.net" target="_blank">
          Become a partner
        </a>
        <Box as="span" display={["none", "inline"]}>
          &nbsp;to access the largest global online art marketplace
        </Box>
      </Banner>
    </FullBleed>
  )
}
