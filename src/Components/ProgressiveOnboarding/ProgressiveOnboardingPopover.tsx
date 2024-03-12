import { FC } from "react"
import { Box, BoxProps, Popover, PopoverProps } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useProgressiveOnboardingTracking } from "Components/ProgressiveOnboarding/useProgressiveOnboardingTracking"

interface ProgressiveOnboardingPopoverProps
  extends Omit<PopoverProps, "children"> {
  name: string
  boxProps?: BoxProps
}

export const ProgressiveOnboardingPopover: FC<ProgressiveOnboardingPopoverProps> = ({
  popover,
  children,
  name,
  boxProps = {
    width: "fit-content",
  },
  ...rest
}) => {
  useProgressiveOnboardingTracking({ name })

  return (
    <Popover
      popover={popover}
      width={250}
      variant="defaultDark"
      pointer
      visible
      ignoreClickOutside
      zIndex={Z.popover}
      manageFocus={false}
      {...rest}
    >
      {({ anchorRef }) => {
        return (
          <Box {...boxProps} ref={anchorRef as any}>
            {children}
          </Box>
        )
      }}
    </Popover>
  )
}
