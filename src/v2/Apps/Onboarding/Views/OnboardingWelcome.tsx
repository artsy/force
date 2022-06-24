import { Flex, Text, Spacer, Button, Box } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import { OnboardingWelcomeAnimatedPanel } from "../Components/OnboardingWelcomeAnimatedPanel"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingWelcome = () => {
  const { user } = useSystemContext()
  const { next } = useOnboardingContext()
  const { register, handleNext, loading } = useOnboardingFadeTransition({
    next,
  })

  return (
    <OnboardingSplitLayout
      left={<OnboardingWelcomeAnimatedPanel ref={register(0)} />}
      right={
        <Flex flexDirection="column" justifyContent="space-between" p={4}>
          {/* Vertically centers next Box */}
          <Box />

          <Box width="100%">
            <Text ref={register(1)} variant={["xl", "xxl"]}>
              Welcome to Artsy, {user?.name}.
            </Text>

            <Spacer mt={4} />

            <Text variant="lg-display" ref={register(2)}>
              Ready to find art you love? Start building your profile and tailor
              Artsy to your tastes.
            </Text>
          </Box>

          <Box width="100%">
            <Button
              disabled={loading}
              loading={loading}
              onClick={handleNext}
              width="100%"
            >
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
