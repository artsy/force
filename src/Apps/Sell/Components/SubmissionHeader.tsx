import { Flex, FullBleed, Separator, useTheme } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Router/RouterLink"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"

export const SubmissionHeader: React.FC = () => {
  const { theme } = useTheme()

  return (
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
                  minHeight={[70, 90]}
                  alignItems="center"
                >
                  <RouterLink
                    to={"/sell"}
                    display="block"
                  >
                    <ArtsyLogoIcon display="block" />
                  </RouterLink>
                </Flex>
              </HorizontalPadding>
            </AppContainer>
            <Separator />
          </FullBleed>
        )
      }}
    </Sticky>
  )
}
