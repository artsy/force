import { RouterLink } from "v2/System/Router/RouterLink"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { Box, Button, Flex, Text } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { useAnalyticsContext, useSystemContext, useTracking } from "v2/System"

export const Header: React.FC = () => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()

  const trackSubmitClick = () => {
    trackEvent({
      // @ts-ignore
      action: "clickedSubmitAnArtwork",
      // @ts-ignore
      context_module: "Header",
      context_page_owner_type: contextPageOwnerType,
      label: "Submit an Artwork",
      user_id: user?.id,
      destination_path: "/sell/submission/artwork-details",
    })
  }

  return (
    <FullBleedHeader
      height={[400, 600]}
      src="https://files.artsy.net/images/swa-hero.png"
      caption="Alex Katz, <i>Forest</i>, 2009."
    >
      <Flex
        position="absolute"
        left="0"
        top="0"
        right="0"
        bottom="0"
        alignItems={["end", "center"]}
      >
        <AppContainer px={[2, 6]}>
          <Box width={["auto", 550]}>
            <Text as="h1" variant={["xl", "xxl"]} mb={2} color="white100">
              Sell Artworks from Your Collection
            </Text>

            <Text as="h2" variant="sm" mb={[2, 6]} color="white100">
              Let our experts find the best sales option for you, whether via
              auction, private sale, or direct listing on Artsy.
            </Text>

            <Button
              // @ts-ignore
              as={RouterLink}
              variant="primaryWhite"
              to="/sell/submission/artwork-details"
              onClick={trackSubmitClick}
              mb={[4, 0]}
            >
              Submit an Artwork
            </Button>
          </Box>
        </AppContainer>
      </Flex>
    </FullBleedHeader>
  )
}
