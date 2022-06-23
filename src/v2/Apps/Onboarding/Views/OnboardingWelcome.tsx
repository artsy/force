import { Flex, Text, Spacer, Button, Box } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import { OnboardingWelcomeAnimatedPanel } from "../Components/OnboardingWelcomeAnimatedPanel"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingWelcome = () => {
  const { user } = useSystemContext()
  const { next } = useOnboardingContext()

  return (
    <OnboardingSplitLayout
      left={<OnboardingWelcomeAnimatedPanel />}
      right={
        <Flex flexDirection="column" justifyContent="space-between" p={4}>
          {/* Vertically centers next Box */}
          <Box />

          <Box width="100%">
            <Text variant={["xl", "xxl"]}>Welcome to Artsy, {user?.name}.</Text>

            <Spacer mt={4} />

            <Text variant="lg-display">
              Ready to find art you love? Start building your profile and tailor
              Artsy to your tastes.
            </Text>
          </Box>

          <Box width="100%">
            <Button onClick={next} width="100%">
              Get started
            </Button>

            <Button
              variant="tertiary"
              mt={1}
              width="100%"
              // @ts-ignore
              as={RouterLink}
              to="/"
            >
              Skip
            </Button>
          </Box>
        </Flex>
      }
    />
  )
}
