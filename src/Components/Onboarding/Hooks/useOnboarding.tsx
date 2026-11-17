import loadable from "@loadable/component"
import { useMemo, useState } from "react"

const OnboardingDialogSimplified = loadable(
  () =>
    import(
      /* webpackChunkName: "onboardingBundleSimplified" */
      "Components/Onboarding/Components/OnboardingDialogSimplified"
    ),
  { resolveComponent: component => component.OnboardingDialogSimplified },
)

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: hideDialog is stable, only calls setIsVisible
  const dialogComponent = useMemo(() => {
    return (
      <>
        {isVisible && (
          <OnboardingDialogSimplified onClose={onClose} onHide={hideDialog} />
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
