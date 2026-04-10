import { FullBleed, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

export const SignupCTA = () => {
  return (
    <FullBleed bg="mono100" py={[6, 12]}>
      <AppContainer>
        <HorizontalPadding>
          <Text variant={["xl", "xxl"]} color="mono0" textAlign="center">
            CTA content (DI-92)
          </Text>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
