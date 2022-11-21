import { OwnerType } from "@artsy/cohesion"
import { Box, Button, DROP_SHADOW, Flex, FullBleed, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Router/RouterLink"

export const InsightsHeader: React.FC = () => {
  const {
    addCollectedArtwork: trackAddCollectedArtwork,
  } = useMyCollectionTracking()

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
                    py={[1, 2]}
                  >
                    <Flex flex={1} alignItems="center">
                      <Text variant="lg-display">
                        Gain deeper knowledge of your collection.
                      </Text>
                    </Flex>
                    <Button
                      // @ts-ignore
                      as={RouterLink}
                      size={["small", "large"]}
                      variant="primaryBlack"
                      to="/my-collection/artworks/new"
                      onClick={() =>
                        trackAddCollectedArtwork(OwnerType.myCollectionInsights)
                      }
                    >
                      Upload Artwork
                    </Button>
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
