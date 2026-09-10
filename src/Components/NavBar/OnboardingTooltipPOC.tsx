import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  clearOnboardingInterestsPending,
  useOnboardingInterestsPendingPOC,
} from "Utils/onboardingInterestsPendingPOC"
import type { FC } from "react"

export const OnboardingTooltipPOC: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const pendingInterests = useOnboardingInterestsPendingPOC()

  if (pendingInterests.length === 0) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name="onboarding-interests-poc"
      placement="bottom"
      zIndex={Z.globalNav + 1}
      onClose={clearOnboardingInterestsPending}
      popover={<Text variant="xs">{pendingInterests.join(", ")}</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
