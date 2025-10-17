import { useDismissibleContext } from "@artsy/dismissible"
import { Text } from "@artsy/palette"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import type { FC } from "react"

const KEY = PROGRESSIVE_ONBOARDING.immersiveView

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
          A new way to experience art without distractions, like you're walking
          through a gallery.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
