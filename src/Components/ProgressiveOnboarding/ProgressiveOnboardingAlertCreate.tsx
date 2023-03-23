import {
  PROGRESSIVE_ONBOARDING_ALERT_CREATE,
  PROGRESSIVE_ONBOARDING_ALERT_FIND,
  PROGRESSIVE_ONBOARDING_ALERT_READY,
  PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode } from "react"
import { Box, Button, Flex, ResponsiveBox, Spacer, Text } from "@artsy/palette"

interface ProgressiveOnboardingAlertCreateProps {
  children: (actions: { onNext(): void }) => ReactNode
}

export const ProgressiveOnboardingAlertCreate: FC<ProgressiveOnboardingAlertCreateProps> = ({
  children,
}) => {
  const { dismiss, isDismissed, isEnabledFor } = useProgressiveOnboarding()

  const isDisplayable =
    isEnabledFor("alerts") && !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CREATE)

  const handleDismiss = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_CREATE)
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER)
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_READY)
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_FIND)
  }

  const handleNext = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_CREATE)
  }

  if (!isDisplayable) {
    return <>{children({ onNext: () => {} })}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERT_CREATE}
      onClose={handleNext}
      ignoreClickOutside
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
              aspectWidth={734}
              aspectHeight={500}
              maxWidth="100%"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%" }}
              >
                <source
                  src="https://files.artsy.net/videos/progressive-onboarding-alerts.mp4"
                  type="video/mp4"
                />
              </video>
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
                onClick={onHide}
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
      {children({ onNext: handleNext })}
    </ProgressiveOnboardingPopover>
  )
}
