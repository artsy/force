import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { FullBleedHeader } from "Components/FullBleedHeader"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useSystemContext } from "System/SystemContext"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"

export const Header: React.FC = () => {
  const { trackEvent } = useTracking()
  const enableSWAInquiryFlow = useFeatureFlag("swa-inquiry-flow")
  const getInTouchRoute = enableSWAInquiryFlow
    ? "/sell/inquiry"
    : "mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()

  const trackSubmitClick = () => {
    trackEvent({
      action: "clickedSubmitAnArtwork",
      context_module: "Header",
      context_page_owner_type: contextPageOwnerType,
      label: "Submit an Artwork",
      user_id: user?.id,
      destination_path: "/sell/submission",
    })
  }

  const trackGetInTouchClick = () => {
    trackEvent({
      action: "clickedGetInTouch",
      context_module: "Header",
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
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

            <Flex flexDirection={["column", "row"]} maxWidth="450px">
              <Flex flex={1}>
                <Button
                  // @ts-ignore
                  as={RouterLink}
                  variant="primaryWhite"
                  to="/sell/submission"
                  onClick={trackSubmitClick}
                  mb={[2, 0]}
                  width={"100%"}
                  data-testid="submit-artwork-button"
                >
                  Submit an Artwork
                </Button>
              </Flex>

              <Spacer x={[0, 2]} />

              <Flex flex={1}>
                <Button
                  // @ts-ignore
                  as={RouterLink}
                  variant="secondaryWhite"
                  onClick={trackGetInTouchClick}
                  mb={[4, 0]}
                  width={"100%"}
                  data-testid="get-in-touch-button"
                  to={getInTouchRoute}
                >
                  Get in Touch
                </Button>
              </Flex>
            </Flex>
          </Box>
        </AppContainer>
      </Flex>
    </FullBleedHeader>
  )
}
