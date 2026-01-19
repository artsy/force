import { OwnerType } from "@artsy/cohesion"
import { Box, Button, Flex, FullBleed, useTheme } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useMyCollectionTracking } from "Apps/CollectorProfile/Routes/MyCollection/Hooks/useMyCollectionTracking"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Components/RouterLink"

export const InsightsHeader: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { addCollectedArtwork: trackAddCollectedArtwork } =
    useMyCollectionTracking()

  const { theme } = useTheme()

  return (
    <Box mt={[-2, -4]}>
      <Sticky>
        {({ stuck }) => {
          return (
            <FullBleed
              backgroundColor="mono0"
              style={
                stuck ? { boxShadow: theme.effects.dropShadow } : undefined
              }
            >
              <AppContainer>
                <HorizontalPadding>
                  <Flex
                    backgroundColor="mono0"
                    justifyContent="flex-end"
                    py={[1, 2]}
                  >
                    {stuck && (
                      <Button
                        // @ts-ignore
                        as={RouterLink}
                        size={["small", "large"]}
                        variant="primaryBlack"
                        to={"/collector-profile/my-collection/artworks/new"}
                        onClick={() =>
                          trackAddCollectedArtwork(
                            OwnerType.myCollectionInsights,
                          )
                        }
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
