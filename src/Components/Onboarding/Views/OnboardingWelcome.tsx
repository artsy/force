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
import { useEffect, useState } from "react"

// Fall back to the unchecked default if the geo lookup stalls, so users are
// never blocked from proceeding.
const GEO_LOOKUP_TIMEOUT_MS = 5000

export const OnboardingWelcome = () => {
  const { user } = useSystemContext()
  const { next, onClose } = useOnboardingContext()
  const { register, handleNext, loading } = useOnboardingFadeTransition({
    next,
  })

  const tracking = useOnboardingTracking()

  // One Tap has no consent UI at sign-up, so we surface the opt-in here.
  const [isOneTapSignup] = useState(() => peekOneTapEmailOptInPending())

  const { isAutomaticallySubscribed, loading: isCountryLoading } =
    useCountryCode({ skip: !isOneTapSignup })

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()

  // Derived, not state+effect, so a manual toggle survives the geo lookup
  // resolving. Falls back to unchecked until the region default is known.
  const [userChoice, setUserChoice] = useState<boolean | null>(null)
  const agreedToReceiveEmails = userChoice ?? isAutomaticallySubscribed

  const [hasGeoTimedOut, setHasGeoTimedOut] = useState(false)
  useEffect(() => {
    if (!isOneTapSignup) {
      return
    }

    const timeout = setTimeout(() => {
      setHasGeoTimedOut(true)
    }, GEO_LOOKUP_TIMEOUT_MS)

    return () => clearTimeout(timeout)
  }, [isOneTapSignup])

  // Block the CTA until the region default is known, else a fast click persists
  // the wrong default.
  const isConsentPending = isOneTapSignup && isCountryLoading && !hasGeoTimedOut

  const showEmailOptIn = isOneTapSignup && (!isCountryLoading || hasGeoTimedOut)

  const persistEmailOptIn = () => {
    if (!isOneTapSignup) {
      return
    }

    // Idempotent in Gravity; only write on opt-in.
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
            {showEmailOptIn && (
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
