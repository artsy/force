import React from "react"
import { SectionContainer } from "./SectionContainer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { Box, Button, Flex, Sans, Spacer } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"

export const Header: React.FC = () => {
  return (
    <SectionContainer height={[320, 546]} constrain={false} position="relative">
      <Box position="relative">
        <Flex style={{ objectFit: "cover" }}>
          <FullBleedHeader src="http://files.artsy.net/consign/swa_landing_header.jpg" />
        </Flex>
        <Box
          textAlign="center"
          width={550}
          position="absolute"
          style={{
            transformOrigin: "center",
            transform: "translateX(-50%) translateY(-50%)",
          }}
          top="50%"
        >
          <Sans size={["10", "12"]} element="h1">
            Sell with Artsy
            <Spacer mt={2} />
            <Media at="xs">
              <Sans size="6" element="h1">
                Sell artwork from your <br />
                collection at auction.
              </Sans>
            </Media>
            <Media greaterThan="xs">
              <Sans size="6" element="h1">
                Sell artwork from your collection at auction.
              </Sans>
            </Media>
          </Sans>
          <Spacer mt={[4, 9]} />
          <RouterLink to="/consign/submission">
            <Button size="large">Get a Free Auction Valuation</Button>
          </RouterLink>
        </Box>
      </Box>
      <Box
        position="relative"
        right="-70%"
        text-align="right"
        width="100%"
        top="-15%"
        color="white100"
      >
        <Media at="xs">
          <Sans size="3" element="h1">
            Helen Frankenthaler, Detail of <i>Shatter</i>, 1953.
          </Sans>
        </Media>
        <Media greaterThan="xs">
          <Sans size="4" element="h1">
            Helen Frankenthaler, Detail of <i>Shatter</i>, 1953.
          </Sans>
        </Media>
      </Box>
    </SectionContainer>
  )
}
