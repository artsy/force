import { useDismissibleContext } from "@artsy/dismissible"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import type { FC } from "react"

export const KEY = PROGRESSIVE_ONBOARDING.immersiveView

export const ProgressiveOnboardingImmersiveView: FC<
  React.PropsWithChildren
> = props => {
  const { children } = props
  const { dismiss, isDismissed } = useDismissibleContext()
  const isDisplayable = !isDismissed(KEY).status

  const handleClose = () => {
    dismiss(KEY)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={KEY}
      placement="bottom"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          A focused way to browse. See each artwork in detail, one at a time.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
