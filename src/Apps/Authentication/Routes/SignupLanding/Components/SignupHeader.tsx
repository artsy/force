import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import { Button, Flex, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { RouterLink } from "System/Components/RouterLink"

export const SignupHeader = () => {
  return (
    <FullBleed bg="mono0" borderBottom="1px solid" borderColor="mono10">
      <AppContainer>
        <HorizontalPadding>
          <Flex height={60} alignItems="center" justifyContent="space-between">
            {/* Left: Artsy Logo */}
            <ArtsyLogoIcon />

            {/* Right: Log In link */}

            {/* Check this implementation vs other log in buttons  */}
            <RouterLink to="/login">
              <Button variant="secondaryBlack" size="small">
                Log In
              </Button>
            </RouterLink>
          </Flex>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
