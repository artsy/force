import { Button, FullBleed, Stack, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

export const SignupCTA = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <FullBleed bg="mono100" py={[6, 12]}>
      <AppContainer>
        <HorizontalPadding>
          <Stack gap={4} alignItems="center" textAlign="center">
            <Text variant={["xl", "xxl"]} color="mono0">
              Start your art journey today
            </Text>

            <Text variant={["md", "lg"]} color="mono0">
              Join millions of art lovers discovering, collecting, and
              connecting on Artsy.
            </Text>

            <Button
              variant="primaryWhite"
              size="large"
              onClick={handleScrollToTop}
            >
              Join Artsy for Free
            </Button>
          </Stack>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
  )
}
