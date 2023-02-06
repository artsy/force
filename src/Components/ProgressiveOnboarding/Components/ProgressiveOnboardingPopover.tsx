import { FC } from "react"
import { Z } from "Apps/Components/constants"
import { Box, Popover, PopoverProps } from "@artsy/palette"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { useReady } from "Utils/Hooks/useReady"
import { getTip } from "Components/ProgressiveOnboarding/ProgressiveOnboardingTips"

type ProgressiveOnboardingPopoverProps = Omit<PopoverProps, "children"> & {
  name: string
}

export const ProgressiveOnboardingPopover: FC<ProgressiveOnboardingPopoverProps> = ({
  popover,
  name,
  ...rest
}) => {
  const { close } = useProgressiveOnboarding()

  const { ready } = useReady({ delay: getTip(name).delay })

  const handleClose = () => {
    close()
  }

  return (
    <Popover
      popover={popover}
      onClose={handleClose}
      width={250}
      variant="defaultDark"
      pointer
      visible={ready}
      zIndex={Z.onboarding}
      {...rest}
    >
      {({ anchorRef }) => {
        return <Box ref={anchorRef as any} width="100%" height="100%" />
      }}
    </Popover>
  )
}
