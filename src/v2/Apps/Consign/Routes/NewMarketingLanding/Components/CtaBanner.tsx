import { Button, DROP_SHADOW, Flex, FullBleed, Text } from "@artsy/palette"
import styled, { keyframes } from "styled-components"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Sticky } from "v2/Components/Sticky"
import { useAnalyticsContext, useSystemContext, useTracking } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"

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

export const CtaBanner = () => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()

  const trackSubmitClick = () => {
    trackEvent({
      // @ts-ignore
      action: "clickedSubmitAnArtwork",
      // @ts-ignore
      context_module: "StickyBanner",
      context_page_owner_type: contextPageOwnerType,
      label: "Submit an Artwork",
      user_id: user?.id,
      destination_path: "/sell/submission/artwork-details",
    })
  }

  return (
    <Sticky>
      {({ stuck }) => {
        return (
          stuck && (
            <FullBleedWithAnimation
              position="fixed"
              style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
              backgroundColor="white100"
            >
              <AppContainer py={1}>
                <HorizontalPadding>
                  <Media at="xs">
                    <Flex>
                      <Button
                        // @ts-ignore
                        as={RouterLink}
                        to="mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"
                        width="100%"
                        variant="primaryWhite"
                        size="small"
                        mr={2}
                      >
                        Get in Touch
                      </Button>
                      <Button
                        // @ts-ignore
                        as={RouterLink}
                        to="/sell/submission/artwork-details"
                        onClick={trackSubmitClick}
                        size="small"
                        width="100%"
                      >
                        Submit an Artwork
                      </Button>
                    </Flex>
                  </Media>

                  <Media greaterThanOrEqual="sm">
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      flexDirection="row"
                    >
                      <Text variant="sm" mr={1}>
                        Submit an artwork, or contact an Artsy specialist to
                        discuss selling with us.
                      </Text>
                      <Flex>
                        <Button
                          // @ts-ignore
                          as={RouterLink}
                          to="mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"
                          variant="primaryWhite"
                          mr={[2, 1, 2]}
                        >
                          Get in Touch
                        </Button>
                        <Button
                          // @ts-ignore
                          as={RouterLink}
                          onClick={trackSubmitClick}
                          to="/sell/submission/artwork-details"
                        >
                          Submit an Artwork
                        </Button>
                      </Flex>
                    </Flex>
                  </Media>
                </HorizontalPadding>
              </AppContainer>
            </FullBleedWithAnimation>
          )
        )
      }}
    </Sticky>
  )
}
