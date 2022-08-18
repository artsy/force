import { Flex, Text, Spacer, Button, Box } from "@artsy/palette"
import { useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import { OnboardingWelcomeAnimatedPanel } from "../Components/OnboardingWelcomeAnimatedPanel"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"
import { useOnboardingTracking } from "../Hooks/useOnboardingTracking"

export const OnboardingWelcome = () => {
  const { user } = useSystemContext()
  const { next, onClose } = useOnboardingContext()
  const { register, handleNext, loading } = useOnboardingFadeTransition({
    next,
  })

  const tracking = useOnboardingTracking()

  return (
    <OnboardingSplitLayout
      left={<OnboardingWelcomeAnimatedPanel ref={register(0)} />}
      leftProps={{ display: "block" }}
      right={
        <Flex flexDirection="column" justifyContent="space-between" p={[2, 4]}>
          {/* Vertically centers next Box */}
          <Box />

          <Box width="100%">
            <Text ref={register(1)} variant={["xl", "xxl"]}>
              Welcome to Artsy{user ? `, ${user.name}` : ""}.
            </Text>

            <Spacer mt={[2, 4]} />

            <Text variant={["md", "lg-display"]} ref={register(2)}>
              Ready to find art you love? Start building your profile and tailor
              Artsy to your tastes.
            </Text>
          </Box>

          <Spacer my={1} />

          <Box width="100%">
            <Button
              disabled={loading}
              loading={loading}
              onClick={() => {
                tracking.userStartedOnboarding()
                handleNext()
              }}
              width="100%"
            >
              Get Started
            </Button>

            <Button
              variant="tertiary"
              mt={1}
              width="100%"
              // @ts-ignore
              as={RouterLink}
              to="/"
              onClick={onClose}
              data-test="onboarding-skip-button"
            >
              Skip
            </Button>
          </Box>
        </Flex>
      }
    />
  )
}
