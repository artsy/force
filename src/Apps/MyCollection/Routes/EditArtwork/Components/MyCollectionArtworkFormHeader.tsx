import {
  ArtsyLogoBlackIcon,
  DROP_SHADOW,
  Flex,
  FullBleed,
  Separator,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { BackLink } from "Components/Links/BackLink"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"

interface MyCollectionArtworkFormHeaderProps {
  NextButton: React.FC
  onBackClick: () => void
}
export const MyCollectionArtworkFormHeader: React.FC<MyCollectionArtworkFormHeaderProps> = ({
  NextButton,
  onBackClick,
}) => {
  return (
    <>
      <RouterLink to="/my-collection" display="block" mt={4}>
        <ArtsyLogoBlackIcon display="block" />
      </RouterLink>

      <AppContainer>
        <Sticky withoutHeaderOffset>
          {({ stuck }) => {
            return (
              <FullBleed
                backgroundColor="white100"
                style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
              >
                <AppContainer>
                  <HorizontalPadding>
                    <Flex
                      flexDirection="row"
                      justifyContent="space-between"
                      py={2}
                    >
                      <BackLink
                        // @ts-ignore
                        as={RouterLink}
                        onClick={onBackClick}
                        width="min-content"
                      >
                        Back
                      </BackLink>

                      <Media greaterThan="xs">{NextButton}</Media>
                    </Flex>
                  </HorizontalPadding>
                </AppContainer>
                <Separator />
              </FullBleed>
            )
          }}
        </Sticky>
      </AppContainer>
    </>
  )
}
