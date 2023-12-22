import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode } from "react"
import {
  Box,
  Button,
  Flex,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { resized } from "Utils/resized"
import {
  WithProgressiveOnboardingCountsProps,
  withProgressiveOnboardingCounts,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useSystemContext } from "System/SystemContext"
import { useDismissibleContext } from "@artsy/dismissible"
import {
  PROGRESSIVE_ONBOARDING_ALERTS,
  PROGRESSIVE_ONBOARDING_ALERT_CHAIN,
} from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"

const ALERT_ID = PROGRESSIVE_ONBOARDING_ALERTS.alertCreate

interface ProgressiveOnboardingAlertCreateProps
  extends WithProgressiveOnboardingCountsProps {
  children: (actions: { onSkip(): void }) => ReactNode
}

export const __ProgressiveOnboardingAlertCreate__: FC<ProgressiveOnboardingAlertCreateProps> = ({
  children,
  counts,
}) => {
  const { isLoggedIn } = useSystemContext()

  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    isLoggedIn &&
    !isDismissed(ALERT_ID).status &&
    counts.isReady &&
    counts.savedSearches === 0

  const image = resized(IMAGE.src, { width: 230 })

  const handleDismiss = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_CHAIN)
  }

  const handleNext = () => {
    dismiss(ALERT_ID)
  }

  const handleClose = () => {
    dismiss(ALERT_ID)
  }

  if (!isDisplayable) {
    return <>{children({ onSkip: () => {} })}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={ALERT_ID}
      ignoreClickOutside
      onClose={handleClose}
      variant="defaultLight"
      popover={({ onHide }) => {
        return (
          <Box py={1}>
            <Text variant="xs" fontWeight="bold">
              Hunting for a particular artwork?
            </Text>

            <Spacer y={1} />

            <ResponsiveBox
              bg="black10"
              aspectWidth={IMAGE.width}
              aspectHeight={IMAGE.height}
              maxWidth="100%"
            >
              <Image {...image} width="100%" height="100%" lazyLoad alt="" />
            </ResponsiveBox>

            <Spacer y={2} />

            <Text variant="xs">
              Set the filters for the artwork you’re looking for, then create
              your alert. We’ll let you know when there’s a matching work.
            </Text>

            <Spacer y={2} />

            <Flex>
              <Button
                size="small"
                variant="secondaryBlack"
                flex={1}
                onClick={() => {
                  onHide()
                  handleNext()
                }}
              >
                Learn More
              </Button>

              <Spacer x={1} />

              <Button
                size="small"
                variant="primaryBlack"
                flex={1}
                onClick={() => {
                  onHide()
                  handleDismiss()
                }}
              >
                Got It
              </Button>
            </Flex>
          </Box>
        )
      }}
    >
      {children({ onSkip: handleDismiss })}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingAlertCreate = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingAlertCreate__
)

const IMAGE = {
  src: "https://files.artsy.net/images/ProgOnboard.jpg",
  width: 2880,
  height: 1960,
}
