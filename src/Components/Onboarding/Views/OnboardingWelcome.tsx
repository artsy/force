import { Box, Button, Checkbox, Flex, Spacer, Text } from "@artsy/palette"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { OnboardingWelcomeAnimatedPanel } from "Components/Onboarding/Components/OnboardingWelcomeAnimatedPanel"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { useOnboardingFadeTransition } from "Components/Onboarding/Hooks/useOnboardingFadeTransition"
import { useOnboardingTracking } from "Components/Onboarding/Hooks/useOnboardingTracking"
import { SplitLayout } from "Components/SplitLayout"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import {
  clearOneTapEmailOptInPending,
  peekOneTapEmailOptInPending,
} from "Utils/oneTapEmailOptIn"
import { useState } from "react"

export const OnboardingWelcome = () => {
  const { user } = useSystemContext()
  const { next, onClose } = useOnboardingContext()
  const { register, handleNext, loading } = useOnboardingFadeTransition({
    next,
  })

  const tracking = useOnboardingTracking()

  // One Tap sign-ups have no consent UI at sign-up, so we surface the marketing
  // email opt-in here.
  const [isOneTapSignup] = useState(() => peekOneTapEmailOptInPending())

  const { isAutomaticallySubscribed, loading: isCountryLoading } =
    useCountryCode({ skip: !isOneTapSignup })

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()

  // Region default: preselected for non-GDPR, unchecked for GDPR. Derive the
  // value so a manual toggle (userChoice) is never clobbered when the country
  // query resolves.
  const [userChoice, setUserChoice] = useState<boolean | null>(null)
  const agreedToReceiveEmails = userChoice ?? isAutomaticallySubscribed

  // Don't let the user act on the opt-in before the region default is known:
  // otherwise a fast click would persist the (unchecked) initial value and a
  // non-GDPR user would silently miss the auto-subscribe default.
  const isConsentPending = isOneTapSignup && isCountryLoading

  const persistEmailOptIn = () => {
    if (!isOneTapSignup) {
      return
    }

    // Consent is never cleared in Gravity, only write when
    // opting in.
    if (agreedToReceiveEmails) {
      submitUpdateMyUserProfile({ agreedToReceiveEmails: true }).catch(err => {
        console.error(
          "[OnboardingWelcome] Failed to save email preference",
          err,
        )
      })
    }

    clearOneTapEmailOptInPending()
  }

  return (
    <SplitLayout
      left={<OnboardingWelcomeAnimatedPanel ref={register(0)} />}
      leftProps={{ display: "block", flexBasis: ["30%", "50%"] }}
      right={
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          p={[2, 4]}
          overflowY="auto"
        >
          {/* Vertically centers next Box */}
          <Box />

          <Box width="100%">
            <Text ref={register(1)} variant={["xl", "xxl"]} hyphenate>
              Welcome to Artsy{!!user?.name ? `, ${user.name}` : ""}.
            </Text>

            <Spacer y={[2, 4]} />

            <Text variant={["md", "lg-display"]} ref={register(2)}>
              Ready to find art you love? Start building your profile and tailor
              Artsy to your tastes.
            </Text>
          </Box>

          <Spacer y={1} />

          <Box width="100%">
            {isOneTapSignup && !isCountryLoading && (
              <>
                <Checkbox
                  selected={agreedToReceiveEmails}
                  onSelect={setUserChoice}
                  data-testid="onboarding-email-optin"
                >
                  <Text variant="xs">
                    Subscribe to email to hear about our products, services,
                    editorials, and other promotional content. Unsubscribe at
                    any time.
                  </Text>
                </Checkbox>

                <Spacer y={2} />
              </>
            )}

            <Button
              disabled={loading || isConsentPending}
              loading={loading}
              onClick={() => {
                persistEmailOptIn()
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
              disabled={isConsentPending}
              // @ts-ignore
              as={RouterLink}
              onClick={() => {
                if (isConsentPending) {
                  return
                }
                persistEmailOptIn()
                onClose()
              }}
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
