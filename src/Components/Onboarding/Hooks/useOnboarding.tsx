import loadable from "@loadable/component"
import { useMemo, useState } from "react"

const OnboardingDialog = loadable(
  () =>
    import(
      /* webpackChunkName: "onboardingBundle" */
      "Components/Onboarding/Components/OnboardingDialog"
    ),
  { resolveComponent: component => component.OnboardingDialog },
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

  const dialogComponent = useMemo(() => {
    return (
      <>
        {isVisible && (
          <OnboardingDialog onClose={onClose} onHide={hideDialog} />
        )}
      </>
    )
  }, [isVisible, onClose, hideDialog])

  return {
    isVisible,
    showOnboarding: showDialog,
    hideOnboarding: hideDialog,
    onboardingComponent: dialogComponent,
  }
}
