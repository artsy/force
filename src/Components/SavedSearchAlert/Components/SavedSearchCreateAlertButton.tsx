import React from "react"
import { Button, ButtonProps } from "@artsy/palette"
import {
  SavedSearchCreateAlertButtonContainer,
  SavedSearchCreateAlertButtonContainerProps,
} from "./SavedSearchCreateAlertButtonContainer"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"

export interface Props extends SavedSearchCreateAlertButtonContainerProps {
  buttonProps?: ButtonProps
}

export const SavedSearchCreateAlertButton: React.FC<Props> = ({
  buttonProps,
  ...rest
}) => {
  return (
    <SavedSearchCreateAlertButtonContainer
      {...rest}
      renderButton={({ onClick }) => (
        <Button
          onClick={onClick}
          variant="secondaryBlack"
          size="small"
          Icon={BellStrokeIcon}
          {...buttonProps}
        >
          Create Alert
        </Button>
      )}
    />
  )
}
