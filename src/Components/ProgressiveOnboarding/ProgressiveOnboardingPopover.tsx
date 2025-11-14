import { Box, Popover, type PopoverProps } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useProgressiveOnboardingTracking } from "Components/ProgressiveOnboarding/useProgressiveOnboardingTracking"
import { isTouch } from "Utils/device"
import { type FC, useEffect, useState } from "react"

interface ProgressiveOnboardingPopoverProps
  extends Omit<PopoverProps, "children"> {
  name: string
}

export const ProgressiveOnboardingPopover: FC<
  React.PropsWithChildren<ProgressiveOnboardingPopoverProps>
> = ({ popover, children, name, ...rest }) => {
  const [visible, setVisible] = useState(false)

  const { trackEvent } = useProgressiveOnboardingTracking({ name })

  useEffect(() => {
    if (isTouch) return // Ignores touch devices

    setVisible(true)
    trackEvent()
  }, [trackEvent])

  return (
    <Popover
      popover={popover}
      width={250}
      variant="defaultDark"
      pointer
      visible={visible}
      ignoreClickOutside
      zIndex={Z.popover}
      manageFocus={false}
      {...rest}
    >
      {({ anchorRef }) => {
        return <Box ref={anchorRef as any}>{children}</Box>
      }}
    </Popover>
  )
}
