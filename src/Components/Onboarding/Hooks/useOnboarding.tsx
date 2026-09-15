import loadable from "@loadable/component"
import { useMemo, useState } from "react"
import { useFlag } from "@unleash/proxy-client-react"

const OnboardingDialog = loadable(
  () =>
    import(
      /* webpackChunkName: "onboardingBundle" */
      "Components/Onboarding/Components/OnboardingDialog"
    ),
  { resolveComponent: component => component.OnboardingDialog },
)

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
  const isOnboardingSimplifiedEnabled = useFlag(
    "diamond_simplified-web-onboarding",
  )

  const showDialog = () => {
    setIsVisible(true)
  }

  const hideDialog = () => {
    setIsVisible(false)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: hideDialog is stable, only calls setIsVisible
  const dialogComponent = useMemo(() => {
    const DialogToRender = isOnboardingSimplifiedEnabled
      ? OnboardingDialogSimplified
      : OnboardingDialog

    return (
      <>
        {isVisible && <DialogToRender onClose={onClose} onHide={hideDialog} />}
      </>
    )
  }, [isVisible, onClose, isOnboardingSimplifiedEnabled])

  return {
    isVisible,
    showOnboarding: showDialog,
    hideOnboarding: hideDialog,
    onboardingComponent: dialogComponent,
  }
}
