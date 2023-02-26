import { Button, DROP_SHADOW, Flex, FullBleed, Text } from "@artsy/palette"
import styled, { keyframes } from "styled-components"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Sticky } from "Components/Sticky"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useSystemContext } from "System/SystemContext"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { useTracking } from "react-tracking"
import { useFeatureFlag } from "System/useFeatureFlag"

const moveDownAnimation = keyframes`
  from {
    top: -70px;
  }

  to {
    top: 0;
  }
`

const FullBleedWithAnimation = styled(FullBleed)`
  transition: visibility 0.2s linear;
  animation: ${moveDownAnimation} 0.25s linear;
`

export const CtaBanner = () => (
  <Sticky>
    {({ stuck }) => {
      return (
        stuck && (
          <FullBleedWithAnimation
            position="fixed"
            style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
            backgroundColor="white100"
          >
            <CtaBannerContent />
          </FullBleedWithAnimation>
        )
      )
    }}
  </Sticky>
)

export const CtaBannerContent = () => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const enableSWAInquiryFlow = useFeatureFlag("swa-inquiry-flow")
  const getInTouchRoute = enableSWAInquiryFlow
    ? "/sell/inquiry"
    : "mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"

  const trackSubmitClick = () => {
    trackEvent({
      // @ts-ignore
      action: "clickedSubmitAnArtwork",
      // @ts-ignore
      context_module: "StickyBanner",
      context_page_owner_type: contextPageOwnerType,
      label: "Submit an Artwork",
      user_id: user?.id,
      destination_path: "/sell/submission",
    })
  }

  const trackGetInTouchClick = () => {
    trackEvent({
      // @ts-ignore
      action: "clickedGetInTouch",
      // @ts-ignore
      context_module: "StickyBanner",
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  return (
    <Media greaterThan="xs">
      <AppContainer py={2}>
        <HorizontalPadding>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
          >
            <Text variant="sm" mr={1}>
              Submit an artwork, or contact an Artsy specialist to discuss
              selling with us.
            </Text>
            <Flex>
              <Button
                // @ts-ignore
                as={RouterLink}
                onClick={trackGetInTouchClick}
                to={getInTouchRoute}
                variant="primaryWhite"
                mr={[2, 1, 2]}
              >
                Get in Touch
              </Button>
              <Button
                // @ts-ignore
                as={RouterLink}
                onClick={trackSubmitClick}
                to="/sell/submission"
              >
                Submit an Artwork
              </Button>
            </Flex>
          </Flex>
        </HorizontalPadding>
      </AppContainer>
    </Media>
  )
}
