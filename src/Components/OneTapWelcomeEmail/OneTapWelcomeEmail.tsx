import { OneTapWelcomeEmailModal } from "Components/OneTapWelcomeEmail/OneTapWelcomeEmailModal"
import { consumeOneTapWelcomeEmailPending } from "Components/OneTapWelcomeEmail/oneTapWelcomeEmailStorage"
import { type FC, useEffect, useRef, useState } from "react"

interface OneTapWelcomeEmailProps {
  isOnboardingVisible: boolean
}

/**
 * Shows the One Tap email opt-in modal for a fresh One Tap sign-up, once
 * onboarding has been dismissed (completed or skipped — both hide the
 * onboarding modal). A One Tap sign-up is always onboarding-eligible, so the
 * onboarding close is the single trigger point.
 */
export const OneTapWelcomeEmail: FC<OneTapWelcomeEmailProps> = ({
  isOnboardingVisible,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const wasOnboardingVisible = useRef(false)

  useEffect(() => {
    if (isOnboardingVisible) {
      wasOnboardingVisible.current = true
      return
    }

    // Onboarding just transitioned from visible to hidden. If this session is a
    // pending One Tap sign-up, show the opt-in modal (consume clears the flag so
    // it only ever appears once).
    if (wasOnboardingVisible.current && consumeOneTapWelcomeEmailPending()) {
      setIsOpen(true)
    }

    wasOnboardingVisible.current = false
  }, [isOnboardingVisible])

  if (!isOpen) {
    return null
  }

  return <OneTapWelcomeEmailModal onClose={() => setIsOpen(false)} />
}
