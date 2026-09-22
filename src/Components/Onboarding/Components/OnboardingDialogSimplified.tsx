import { ModalBase } from "@artsy/palette"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { OnboardingInterestsStep } from "Components/Onboarding/Components/OnboardingInterestsStep"
import { OnboardingSimplifiedWelcomeStep } from "Components/Onboarding/Components/OnboardingSimplifiedWelcomeStep"
import {
  OTHER_SOURCE,
  OnboardingSourceStep,
} from "Components/Onboarding/Components/OnboardingSourceStep"
import { OnboardingStepShell } from "Components/Onboarding/Components/OnboardingStepShell"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { markOnboardingInterestsPending } from "Utils/onboardingInterestsPending"
import {
  clearOneTapEmailOptInPending,
  peekOneTapEmailOptInPending,
} from "Utils/oneTapEmailOptIn"
import { type FC, useEffect, useState } from "react"

const GEO_LOOKUP_TIMEOUT_MS = 5000

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
  const isLastStep = stepIndex === steps.length - 1

  const [interests, setInterests] = useState<string[]>([])
  const [source, setSource] = useState<string | null>(null)
  const [otherSourceText, setOtherSourceText] = useState("")

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

  // Single-select: clicking the active pill re-selects it rather than clearing,
  // so `source` never returns to null once an answer is picked.
  const handleSelectSource = (nextSource: string) => {
    setSource(nextSource)

    // Drop any free text if they move off "Other", so a stale answer can't be
    // reported later.
    if (nextSource !== OTHER_SOURCE) {
      setOtherSourceText("")
    }
  }

  const goToNextStep = () => {
    setStepIndex(current => current + 1)
  }

  const goBack = () => {
    setStepIndex(current => Math.max(0, current - 1))
  }

  const handleFinish = () => {
    persistEmailOptIn()
    markOnboardingInterestsPending(interests)
    onHide()
  }

  const handleClose = () => {
    persistEmailOptIn()
    onClose()
  }

  const handleCta = () => {
    if (isLastStep) {
      handleFinish()
      return
    }

    goToNextStep()
  }

  const getCtaLabel = () => {
    if (currentStep === "source") {
      return "Continue"
    }

    return "Next"
  }

  const getIsCtaDisabled = () => {
    if (currentStep === "welcome") {
      return isConsentPending
    }

    if (currentStep === "interests") {
      return interests.length === 0
    }

    if (!source) {
      return true
    }

    if (source === OTHER_SOURCE) {
      return otherSourceText.trim().length === 0
    }

    return false
  }

  const renderCurrentStep = () => {
    if (currentStep === "welcome") {
      return (
        <OnboardingSimplifiedWelcomeStep
          agreedToReceiveEmails={agreedToReceiveEmails}
          shouldShowEmailOptIn={showEmailOptIn}
          onToggleEmailOptIn={setUserChoice}
        />
      )
    }

    if (currentStep === "interests") {
      return (
        <OnboardingInterestsStep
          selectedInterests={interests}
          onToggleInterest={toggleInterest}
        />
      )
    }

    return (
      <OnboardingSourceStep
        selectedSource={source}
        otherText={otherSourceText}
        onSelectSource={handleSelectSource}
        onChangeOtherText={setOtherSourceText}
      />
    )
  }

  return (
    <ModalBase
      onClose={handleClose}
      style={{ backgroundColor: "rgba(229, 229, 229, 0.5)" }}
      dialogProps={{
        bg: "mono0",
        width: ["100%", 440],
        // `auto` so the modal grows when the "Other" input appears; the floor
        // keeps every step at the design height so it doesn't resize per step.
        height: ["100%", "auto"],
        minHeight: [null, 600],
        maxHeight: ["100%", "90%"],
      }}
    >
      <OnboardingStepShell
        activeIndex={stepIndex}
        amount={steps.length}
        ctaLabel={getCtaLabel()}
        isCtaDisabled={getIsCtaDisabled()}
        onClose={handleClose}
        onCta={handleCta}
        onBack={stepIndex === 0 ? undefined : goBack}
      >
        {renderCurrentStep()}
      </OnboardingStepShell>
    </ModalBase>
  )
}
