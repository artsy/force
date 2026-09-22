import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, Button, Clickable, Flex, ProgressBar } from "@artsy/palette"
import type { FC } from "react"

interface OnboardingStepShellProps {
  activeIndex: number
  amount: number
  ctaLabel: string
  isCtaDisabled: boolean
  onClose(): void
  onCta(): void
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
    <Flex flexDirection="column" width="100%" bg="mono0">
      <Box flexShrink={0} pt={2} px={2}>
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
                percentComplete={index <= activeIndex ? 100 : 0}
                highlight="blue100"
                transition="transform 250ms"
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
