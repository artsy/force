import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode, useEffect, useRef } from "react"
import { Position, Text } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { useDismissibleContext } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"

const ALERT = {
  alertCreate: PROGRESSIVE_ONBOARDING_ALERTS.alertCreate,
  alertSelectFilter: PROGRESSIVE_ONBOARDING_ALERTS.alertSelectFilter,
}

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
    isDismissed(ALERT.alertCreate).status &&
    !isDismissed(ALERT.alertSelectFilter).status

  const handleClose = () => {
    dismiss(ALERT.alertSelectFilter)
  }

  const handleDismiss = () => {
    handleClose()
  }

  useEffect(() => {
    const isFilterStateChanged =
      initialFilterState.current !==
      JSON.stringify(currentlySelectedFilters?.())

    if (isFilterStateChanged && !isDismissed(ALERT.alertSelectFilter).status) {
      dismiss(ALERT.alertSelectFilter)
    }
  }, [dismiss, currentlySelectedFilters, isDismissed])

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={ALERT.alertSelectFilter}
      placement={placement}
      onClose={handleClose}
      onDismiss={handleDismiss}
      popover={<Text variant="xs">First, select the relevant filters.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
