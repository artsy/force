import { OnboardingModal } from "Components/Onboarding/Components/OnboardingModal"
import { OnboardingSteps } from "Components/Onboarding/Components/OnboardingSteps"
import { OnboardingProvider } from "./useOnboardingContext"
import { useMemo, useState } from "react"

interface UseOnboarding {
  onClose(): void
}

export const useOnboarding = ({ onClose }: UseOnboarding) => {
  const [isVisible, setIsVisible] = useState(false)

  const showDialog = () => {
    setIsVisible(true)
  }

  const hideDialog = () => {
    setIsVisible(false)
  }

  const dialogComponent = useMemo(() => {
    return (
      <>
        {isVisible && (
          <OnboardingProvider onClose={onClose}>
            <OnboardingModal onClose={hideDialog}>
              <OnboardingSteps />
            </OnboardingModal>
          </OnboardingProvider>
        )}
      </>
    )
  }, [isVisible, onClose])

  return {
    isVisible,
    showOnboarding: showDialog,
    hideOnboarding: hideDialog,
    onboardingComponent: dialogComponent,
  }
}
