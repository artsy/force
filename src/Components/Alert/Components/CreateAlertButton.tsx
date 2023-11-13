import { FC } from "react"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import { Button, ButtonProps } from "@artsy/palette"

import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"

export interface Props extends ButtonProps {
  onClick: () => void
}

export const CreateAlertButton: FC<Props> = ({ onClick, ...buttonProps }) => {
  const { clickedCreateAlert } = useAlertTracking()

  const handleClick = () => {
    clickedCreateAlert()

    return onClick()
  }

  return (
    <Button
      onClick={handleClick}
      variant="secondaryBlack"
      size="small"
      Icon={BellStrokeIcon}
      {...buttonProps}
    >
      Create Alert
    </Button>
  )
}
