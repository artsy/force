import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import { Button, type ButtonProps } from "@artsy/palette"
import type { FC } from "react"

interface RenderButtonProps {
  onClick: () => void
}

export interface CreateAlertButtonProps extends ButtonProps {
  onClick?: () => void
  renderButton?: (props: RenderButtonProps) => JSX.Element
}

export const CreateAlertButton: FC<
  React.PropsWithChildren<CreateAlertButtonProps>
> = ({ onClick, renderButton, ...buttonProps }) => {
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
