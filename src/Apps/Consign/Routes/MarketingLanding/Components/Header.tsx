import { Button, Column, Flex, GridColumns, Spacer, Text } from "@artsy/palette"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
} from "Components/FullBleedHeader"
import { useTracking } from "react-tracking"
import { useAnalyticsContext, useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"

export const Header: React.FC = () => {
  const { trackEvent } = useTracking()
  const showGetInTouchCTA = useFeatureFlag("get-in-touch-flow-web")
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
      destination_path: "/sell/submission/artwork-details",
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
      src="https://files.artsy.net/images/swa-hero.png"
      caption="Alex Katz, <i>Forest</i>, 2009."
    >
      <FullBleedHeaderOverlay
        alignItems={["center", "flex-start"]}
        justifyContent="center"
        flexDirection="column"
        p={4}
      >
        <GridColumns>
          <Column span={[12, 8, 6]}>
            <Text as="h1" variant={["lg-display", "xxl"]} color="white100">
              Sell Artworks from Your Collection
            </Text>

            <Spacer y={2} />

            <Text as="h2" variant={["xs", "sm"]} color="white100">
              Let our experts find the best sales option for you, whether via
              auction, private sale, or direct listing on Artsy.
            </Text>

            <Spacer y={[2, 4]} />

            {showGetInTouchCTA ? (
              <Flex flexDirection={["column", "row"]}>
                <Button
                  // @ts-ignore
                  as={RouterLink}
                  variant="primaryWhite"
                  to="/sell/submission"
                  onClick={trackSubmitClick}
                  width="100%"
                  data-testid="submit-artwork-button"
                >
                  Submit an Artwork
                </Button>

                <Spacer x={[0, 2]} y={[1, 0]} />

                <Button
                  // @ts-ignore
                  as={RouterLink}
                  variant="secondaryWhite"
                  onClick={trackGetInTouchClick}
                  width="100%"
                  data-testid="get-in-touch-button"
                  to={getInTouchRoute}
                >
                  Get in Touch
                </Button>
              </Flex>
            ) : (
              <Button
                // @ts-ignore
                as={RouterLink}
                variant="primaryWhite"
                to="/sell/submission/artwork-details"
                onClick={trackSubmitClick}
                data-testid="submit-artwork-button"
              >
                Submit an Artwork
              </Button>
            )}
          </Column>
        </GridColumns>
      </FullBleedHeaderOverlay>
    </FullBleedHeader>
  )
}
