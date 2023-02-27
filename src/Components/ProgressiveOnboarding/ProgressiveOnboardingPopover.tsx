import { FC } from "react"
import { Box, Popover, PopoverProps } from "@artsy/palette"
import { Z } from "Apps/Components/constants"

type ProgressiveOnboardingPopoverProps = Omit<PopoverProps, "children">

export const ProgressiveOnboardingPopover: FC<ProgressiveOnboardingPopoverProps> = ({
  popover,
  children,
  ...rest
}) => {
  return (
    <Popover
      popover={popover}
      width={250}
      variant="defaultDark"
      pointer
      visible
      ignoreClickOutside
      zIndex={Z.dropdown}
      manageFocus={false}
      {...rest}
    >
      {({ anchorRef }) => {
        return <Box ref={anchorRef as any}>{children}</Box>
      }}
    </Popover>
  )
}
