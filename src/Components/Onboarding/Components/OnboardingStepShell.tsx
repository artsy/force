import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, Button, Clickable, Flex, ProgressBar } from "@artsy/palette"
import type { FC } from "react"

// The design fills the in-progress segment by a small fixed amount rather than
// leaving it empty, so the current step reads as started but incomplete.
const ACTIVE_SEGMENT_FILL_PERCENT = 11.72

interface OnboardingStepShellProps {
  activeIndex: number
  amount: number
  ctaLabel: string
  isCtaDisabled: boolean
  onClose(): void
  onCta(): void
  /** Omitted on the first step, which renders no back button */
  onBack?(): void
}

export const OnboardingStepShell: FC<
  React.PropsWithChildren<OnboardingStepShellProps>
> = ({
  activeIndex,
  amount,
  ctaLabel,
  isCtaDisabled,
  onClose,
  onCta,
  onBack,
  children,
}) => {
  return (
    <Flex flexDirection="column" width="100%" height="100%" bg="mono0">
      <Box flexShrink={0} pt={2} px={2}>
        {/* With no back button this leaves two children, which `space-between`
         * renders as logo-left / close-right, matching the first step. */}
        <Flex alignItems="center" justifyContent="space-between">
          {onBack && (
            <Clickable onClick={onBack} aria-label="Go back">
              <ChevronLeftIcon width={18} height={18} />
            </Clickable>
          )}

          <ArtsyLogoIcon width={71} height={24} />

          <Clickable onClick={onClose} aria-label="Close">
            <CloseIcon width={18} height={18} />
          </Clickable>
        </Flex>

        <Flex gap={1} mt={2}>
          {Array.from({ length: amount }).map((_, index) => {
            return (
              <ProgressBar
                key={index}
                percentComplete={getSegmentFillPercent({ index, activeIndex })}
                highlight="blue100"
                transition="transform 250ms"
                // `ProgressBar` spreads these after its own defaults, so they
                // override its 2px height and hardcoded `mono30` track.
                bg="mono10"
                height="3px"
                borderRadius="50px"
                flex={1}
                minWidth={0}
                mt={0}
                mb={0}
              />
            )
          })}
        </Flex>
      </Box>

      <Box flex={1} minHeight={0} overflowY="auto" px={2}>
        {children}
      </Box>

      <Box
        flexShrink={0}
        bg="mono0"
        pt={2}
        pb={2}
        px={2}
        style={{ boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <Button width="100%" disabled={isCtaDisabled} onClick={onCta}>
          {ctaLabel}
        </Button>
      </Box>
    </Flex>
  )
}

const getSegmentFillPercent = ({
  index,
  activeIndex,
}: {
  index: number
  activeIndex: number
}) => {
  if (index < activeIndex) {
    return 100
  }

  if (index === activeIndex) {
    return ACTIVE_SEGMENT_FILL_PERCENT
  }

  return 0
}
