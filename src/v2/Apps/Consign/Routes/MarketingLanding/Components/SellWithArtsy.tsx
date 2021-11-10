import * as React from "react"
import { Box, Button, Flex, Image, Link, Text, color } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { useAnalyticsContext } from "v2/System"
import { Media } from "v2/Utils/Responsive"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ContextModule,
  OwnerType,
  ClickedAppDownload,
} from "@artsy/cohesion"

const DOWNLOAD_URL =
  "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"

export const SellWithArtsy: React.FC = () => {
  const tracking = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug } = useAnalyticsContext()

  const clickedAppDownload: ClickedAppDownload = {
    action: ActionType.clickedAppDownload,
    context_module: ContextModule.sellFooter,
    context_page_owner_type: OwnerType.consign,
    context_page_owner_slug: contextPageOwnerSlug,
    context_page_owner_id: contextPageOwnerId,
    destination_path: DOWNLOAD_URL,
    subject: "Download the app",
  }

  const trackDownloadAppClick = () => {
    tracking.trackEvent(clickedAppDownload)
  }

  return (
    <SectionContainer
      borderBottom={`1px solid ${color("black10")}`}
      borderTop={`1px solid ${color("black10")}`}
      py={0}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box pr={[2, 9]}>
          <Box minWidth={[160, 183]}>
            <Text variant="largeTitle" mb={1}>
              Get the Artsy iOS app
            </Text>
            <Text
              variant="text"
              color="black60"
              mb={2}
              maxWidth={["100%", 150]}
            >
              A Smarter, Faster Way to Sell Your Art.
            </Text>
          </Box>
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

export const tests = {
  DOWNLOAD_URL,
}
