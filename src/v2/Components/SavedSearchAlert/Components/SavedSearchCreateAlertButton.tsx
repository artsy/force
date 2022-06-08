import React from "react"
import { BellIcon, Button, ButtonProps } from "@artsy/palette"
import {
  SavedSearchCreateAlertButtonContainer,
  SavedSearchCreateAlertButtonContainerProps,
} from "./SavedSearchCreateAlertButtonContainer"

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
          Icon={BellIcon}
          {...buttonProps}
        >
          Create Alert
        </Button>
      )}
    />
  )
}
