import { useDialog } from "v2/Utils/Hooks/useDialog"
import { OnboardingModal } from "../Components/OnboardingModal"
import { OnboardingSteps } from "../Components/OnboardingSteps"
import { OnboardingProvider } from "./useOnboardingContext"

interface UseOnboarding {
  onDone(): void
}

export const useOnboarding = ({ onDone }: UseOnboarding) => {
  const { isVisible, showDialog, hideDialog, dialogComponent } = useDialog({
    Dialog: () => {
      return (
        <OnboardingProvider onDone={onDone}>
          <OnboardingModal onClose={hideDialog}>
            <OnboardingSteps />
          </OnboardingModal>
        </OnboardingProvider>
      )
    },
  })

  return {
    isVisible,
    showOnboarding: showDialog,
    hideOnboarding: hideDialog,
    onboardingComponent: dialogComponent,
  }
}
