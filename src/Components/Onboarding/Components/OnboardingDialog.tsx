import { OnboardingModal } from "Components/Onboarding/Components/OnboardingModal"
import { OnboardingSteps } from "Components/Onboarding/Components/OnboardingSteps"
import { OnboardingProvider } from "Components/Onboarding/Hooks/useOnboardingContext"
import { FC } from "react"

interface OnboardingDialogProps {
  onClose(): void
  onHide(): void
}

export const OnboardingDialog: FC<
  React.PropsWithChildren<OnboardingDialogProps>
> = ({ onClose, onHide }) => {
  return (
    <OnboardingProvider onClose={onClose}>
      <OnboardingModal onClose={onHide}>
        <OnboardingSteps />
      </OnboardingModal>
    </OnboardingProvider>
  )
}
