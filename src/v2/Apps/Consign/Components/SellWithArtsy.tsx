import React from "react"
import { Box, Button, Flex, Image, Spacer, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { Media } from "v2/Utils/Responsive"

export const SellWithArtsy: React.FC = () => {
  return (
    <SectionContainer background="black5" py={0}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box pr={9}>
          <Text variant="largeTitle" mb={1}>
            Sell with Artsy
          </Text>
          <Text variant="text">Selling art differently</Text>
          <Spacer mt={6} />

          {/* FIXME: todo link */}
          <Button>Download the app</Button>
        </Box>
        <Box>
          <Media greaterThanOrEqual="sm">
            {/* FIXME: Move images to vanity.artsy.net */}
            <Image
              height={320}
              width="auto"
              src="https://user-images.githubusercontent.com/236943/97369833-e73bfb80-186a-11eb-9085-2ff4b2bcbb21.png"
            />
          </Media>
          <Media lessThan="sm">
            <Image
              height={270}
              width="auto"
              src="https://user-images.githubusercontent.com/236943/97369845-ef943680-186a-11eb-96d8-d4563313b9f4.png"
            />
          </Media>
        </Box>
      </Flex>
    </SectionContainer>
  )
}
