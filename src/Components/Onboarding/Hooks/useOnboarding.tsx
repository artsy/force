import loadable from "@loadable/component"
import { useMemo, useState } from "react"

const OnboardingDialog = loadable(
  () =>
    import(
      /* webpackChunkName: "onboardingBundle" */
      "Components/Onboarding/Components/OnboardingDialogPOC"
    ),
  { resolveComponent: component => component.OnboardingDialogPOC },
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
          <OnboardingDialog onClose={onClose} onHide={hideDialog} />
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
