import { Box, Button, Checkbox, Spacer, Text } from "@artsy/palette"
import { OnboardingModal } from "Components/Onboarding/Components/OnboardingModal"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import {
  clearOneTapEmailOptInPending,
  peekOneTapEmailOptInPending,
} from "Utils/oneTapEmailOptIn"
import {
  ONBOARDING_INTERESTS,
  markOnboardingInterestsPending,
} from "Utils/onboardingInterestsPending"
import { type FC, useEffect, useState } from "react"

const GEO_LOOKUP_TIMEOUT_MS = 5000

const SOURCES = [
  "Search engine",
  "Social media",
  "A friend or family member",
  "Other",
]

interface OnboardingDialogSimplifiedProps {
  onClose(): void
  onHide(): void
}

export const OnboardingDialogSimplified: FC<
  React.PropsWithChildren<OnboardingDialogSimplifiedProps>
> = ({ onClose, onHide }) => {
  const [isOneTapSignup] = useState(() => peekOneTapEmailOptInPending())

  const steps = isOneTapSignup
    ? (["welcome", "interests", "source"] as const)
    : (["interests", "source"] as const)

  const [stepIndex, setStepIndex] = useState(0)
  const currentStep = steps[stepIndex]

  const [interests, setInterests] = useState<string[]>([])
  const [source, setSource] = useState<string | null>(null)

  const { isAutomaticallySubscribed, loading: isCountryLoading } =
    useCountryCode({ skip: !isOneTapSignup })

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()

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

  const isConsentPending = isOneTapSignup && isCountryLoading && !hasGeoTimedOut
  const showEmailOptIn = isOneTapSignup && (!isCountryLoading || hasGeoTimedOut)

  const persistEmailOptIn = () => {
    if (!isOneTapSignup) {
      return
    }

    if (agreedToReceiveEmails) {
      submitUpdateMyUserProfile({ agreedToReceiveEmails: true }).catch(err => {
        console.error(
          "[OnboardingDialogSimplified] Failed to save email preference",
          err,
        )
      })
    }

    clearOneTapEmailOptInPending()
  }

  const toggleInterest = (interest: string) => {
    setInterests(current => {
      return current.includes(interest)
        ? current.filter(existing => existing !== interest)
        : [...current, interest]
    })
  }

  const goToNextStep = () => {
    setStepIndex(current => current + 1)
  }

  const handleFinish = () => {
    persistEmailOptIn()
    markOnboardingInterestsPending(interests)
    onHide()
  }

  return (
    <OnboardingModal onClose={onClose}>
      <Box p={4} width="100%">
        <Text variant="lg-display" mb={4}>
          {currentStep === "welcome" && "Welcome to Artsy"}
          {currentStep === "interests" && "What are you most interested in?"}
          {currentStep === "source" && "How did you hear about Artsy?"}
        </Text>

        {currentStep === "welcome" && (
          <Box>
            {showEmailOptIn && (
              <Checkbox
                selected={agreedToReceiveEmails}
                onSelect={setUserChoice}
              >
                <Text variant="xs">
                  Subscribe to email to hear about our products, services,
                  editorials, and other promotional content. Unsubscribe at any
                  time.
                </Text>
              </Checkbox>
            )}
          </Box>
        )}

        {currentStep === "interests" && (
          <Box>
            {ONBOARDING_INTERESTS.map(interest => {
              return (
                <Box key={interest} mb={2}>
                  <Checkbox
                    selected={interests.includes(interest)}
                    onSelect={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Checkbox>
                </Box>
              )
            })}
          </Box>
        )}

        {currentStep === "source" && (
          <Box>
            {SOURCES.map(option => {
              return (
                <Box key={option} mb={2}>
                  <Checkbox
                    selected={source === option}
                    onSelect={() => setSource(option)}
                  >
                    {option}
                  </Checkbox>
                </Box>
              )
            })}
          </Box>
        )}

        <Spacer y={4} />

        {currentStep === "welcome" && (
          <Button
            width="100%"
            disabled={isConsentPending}
            onClick={() => {
              goToNextStep()
            }}
          >
            Next
          </Button>
        )}

        {currentStep === "interests" && (
          <Button
            width="100%"
            disabled={interests.length === 0}
            onClick={goToNextStep}
          >
            Next
          </Button>
        )}

        {currentStep === "source" && (
          <Button width="100%" disabled={!source} onClick={handleFinish}>
            Finish
          </Button>
        )}
      </Box>
    </OnboardingModal>
  )
}
