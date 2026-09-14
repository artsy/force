import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import {
  clearOnboardingInterestsPending,
  useOnboardingInterestsPending,
} from "Utils/onboardingInterestsPending"
import type { FC } from "react"

export const OnboardingTooltipSimplified: FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const pendingInterests = useOnboardingInterestsPending()

  if (pendingInterests.length === 0) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name="onboarding-interests-simplified"
      placement="bottom"
      zIndex={Z.globalNav + 1}
      onClose={clearOnboardingInterestsPending}
      popover={<Text variant="xs">{pendingInterests.join(", ")}</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
