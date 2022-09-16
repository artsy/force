import {
  AddCollectedArtwork,
  ActionType,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Button, DROP_SHADOW, Flex, FullBleed, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Sticky } from "Components/Sticky"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"

export const InsightsHeader: React.FC = () => {
  const { trackEvent } = useTracking()
  const isMyCollectionPhase3Enabled = useFeatureFlag(
    "my-collection-web-phase-3"
  )

  return (
    <Box mt={[-2, -4]}>
      <Sticky>
        {({ stuck }) => {
          return (
            <FullBleed
              backgroundColor="white100"
              style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
            >
              <AppContainer>
                <HorizontalPadding>
                  <Flex
                    backgroundColor="white100"
                    justifyContent="space-between"
                    py={2}
                  >
                    <Flex flex={1}>
                      <Media greaterThan="xs">
                        <Text variant="lg-display">
                          Gain deeper knowledge of your collection.
                        </Text>

                        <Text variant="xs" color="black60">
                          Get insights about the artists you collect from the
                          Artsy Price Database, drawing on millions of results
                          from leading auction houses across the globe.
                        </Text>
                      </Media>
                    </Flex>

                    {!!isMyCollectionPhase3Enabled && (
                      <Button
                        // @ts-ignore
                        as={RouterLink}
                        size={["small", "large"]}
                        variant="primaryBlack"
                        to="/my-collection/artworks/new"
                        onClick={() => trackEvent(tracks.addCollectedArtwork())}
                      >
                        Upload Artwork
                      </Button>
                    )}
                  </Flex>
                </HorizontalPadding>
              </AppContainer>
            </FullBleed>
          )
        }}
      </Sticky>
    </Box>
  )
}

const tracks = {
  addCollectedArtwork: (): AddCollectedArtwork => ({
    action: ActionType.addCollectedArtwork,
    context_module: ContextModule.myCollectionHome,
    context_owner_type: OwnerType.myCollection,
    platform: "web",
  }),
}
