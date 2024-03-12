import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode, useEffect, useRef } from "react"
import { Position, Text } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { useDismissibleContext } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"

interface ProgressiveOnboardingAlertSelectFilterProps {
  children: ReactNode
  placement?: Position
}

export const ProgressiveOnboardingAlertSelectFilter: FC<ProgressiveOnboardingAlertSelectFilterProps> = ({
  children,
  placement = "left-start",
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const { currentlySelectedFilters } = useArtworkFilterContext()
  const initialFilterState = useRef(
    JSON.stringify(currentlySelectedFilters?.())
  )

  const isDisplayable =
    isDismissed(PROGRESSIVE_ONBOARDING.alertCreate).status &&
    !isDismissed(PROGRESSIVE_ONBOARDING.alertSelectFilter).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING.alertSelectFilter)
  }

  const handleDismiss = () => {
    handleClose()
  }

  useEffect(() => {
    const isFilterStateChanged =
      initialFilterState.current !==
      JSON.stringify(currentlySelectedFilters?.())

    if (
      isFilterStateChanged &&
      !isDismissed(PROGRESSIVE_ONBOARDING.alertSelectFilter).status
    ) {
      dismiss(PROGRESSIVE_ONBOARDING.alertSelectFilter)
    }
  }, [dismiss, currentlySelectedFilters, isDismissed])

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING.alertSelectFilter}
      placement={placement}
      onClose={handleClose}
      onDismiss={handleDismiss}
      popover={<Text variant="xs">First, select the relevant filters.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
