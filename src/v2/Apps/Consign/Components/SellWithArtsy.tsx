import React from "react"
import { Box, Button, Flex, Image, Link, Spacer, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { Media } from "v2/Utils/Responsive"
import { useTracking } from "react-tracking"
import { clickedAppDownload } from "@artsy/cohesion"

const DOWNLOAD_URL =
  'https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"'

export const SellWithArtsy: React.FC = () => {
  const tracking = useTracking()

  const trackDownloadAppClick = () => {
    tracking.trackEvent(
      clickedAppDownload({
        context_page_owner_id: "",
        context_page_owner_slug: "",
        destination_path: DOWNLOAD_URL,
      })
    )
  }

  return (
    <SectionContainer background="black5" py={0}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box pr={9}>
          <Text variant="largeTitle" mb={1}>
            Sell with Artsy
          </Text>
          <Text variant="text">Selling art differently</Text>
          <Spacer mt={6} />
          <Link
            href={DOWNLOAD_URL}
            target="_blank"
            onClick={trackDownloadAppClick}
          >
            <Button>Download the app</Button>
          </Link>
        </Box>
        <Box>
          <Media greaterThanOrEqual="sm">
            <Image
              height={320}
              width="auto"
              src="https://files.artsy.net/consign/banner-large.jpg"
            />
          </Media>
          <Media lessThan="sm">
            <Image
              height={270}
              width="auto"
              src="https://files.artsy.net/consign/banner-small.jpg"
            />
          </Media>
        </Box>
      </Flex>
    </SectionContainer>
  )
}
