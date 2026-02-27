import { Box, Popover, type PopoverProps } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useProgressiveOnboardingTracking } from "Components/ProgressiveOnboarding/useProgressiveOnboardingTracking"
import { isTouch } from "Utils/device"
import { type FC, useEffect, useRef, useState } from "react"

interface ProgressiveOnboardingPopoverProps
  extends Omit<PopoverProps, "children"> {
  name: string
}

export const ProgressiveOnboardingPopover: FC<
  React.PropsWithChildren<ProgressiveOnboardingPopoverProps>
> = ({ popover, children, visible: visibleProp, name, ...rest }) => {
  const [visible, setVisible] = useState(false)
  const hasTracked = useRef(false)
  const { trackEvent } = useProgressiveOnboardingTracking({ name })

  useEffect(() => {
    if (isTouch) return // Ignores touch devices
    if (visibleProp === false) return
    if (hasTracked.current) return

    setVisible(true)
    hasTracked.current = true
    trackEvent()
  }, [visibleProp, trackEvent])

  return (
    <Popover
      popover={popover}
      width={250}
      variant="defaultDark"
      pointer
      ignoreClickOutside
      zIndex={Z.popover}
      manageFocus={false}
      {...rest}
      visible={visibleProp ?? visible}
    >
      {({ anchorRef }) => {
        return <Box ref={anchorRef as any}>{children}</Box>
      }}
    </Popover>
  )
}
