import { Flex, FullBleed, Separator, useTheme } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { BackLink } from "Components/Links/BackLink"
import { Sticky } from "Components/Sticky"
import { ReactNode } from "react"
import { RouterLink } from "System/Components/RouterLink"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"

interface MyCollectionArtworkFormHeaderProps {
  NextButton?: ReactNode
  onBackClick: () => void
}
export const MyCollectionArtworkFormHeader: React.FC<MyCollectionArtworkFormHeaderProps> = ({
  NextButton,
  onBackClick,
}) => {
  const { theme } = useTheme()
  return (
    <>
      <RouterLink
        to={"/collector-profile/my-collection"}
        display="block"
        mt={4}
      >
        <ArtsyLogoIcon display="block" />
      </RouterLink>

      <AppContainer>
        <Sticky withoutHeaderOffset>
          {({ stuck }) => {
            return (
              <FullBleed
                backgroundColor="white100"
                style={
                  stuck ? { boxShadow: theme.effects.dropShadow } : undefined
                }
              >
                <AppContainer>
                  <HorizontalPadding>
                    <Flex
                      flexDirection="row"
                      justifyContent="space-between"
                      py={2}
                      minHeight={[70, 90]}
                    >
                      <BackLink
                        // @ts-ignore
                        as={RouterLink}
                        onClick={onBackClick}
                        width="min-content"
                      >
                        Back
                      </BackLink>

                      <Flex ml={2}>{NextButton}</Flex>
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
