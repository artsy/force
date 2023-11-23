import { FC } from "react"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import { Button, ButtonProps } from "@artsy/palette"
import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

interface RenderButtonProps {
  onClick: () => void
}

export interface CreateAlertButtonProps extends ButtonProps {
  onClick?: () => void
  renderButton?: (props: RenderButtonProps) => JSX.Element
}

export const CreateAlertButton: FC<CreateAlertButtonProps> = ({
  onClick,
  renderButton,
  ...buttonProps
}) => {
  const { clickedCreateAlert } = useAlertTracking()
  const { dispatch } = useAlertContext()

  const handleClick = () => {
    onClick?.()

    clickedCreateAlert()

    dispatch({ type: "SHOW" })
  }

  if (renderButton) {
    return renderButton({ onClick: handleClick })
  }

  return (
    <Button
      data-testid="createAlert"
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
