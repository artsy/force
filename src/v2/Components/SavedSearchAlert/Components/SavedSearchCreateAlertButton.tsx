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
          variant="secondaryOutline"
          size="small"
          {...buttonProps}
        >
          <BellIcon mr={0.5} fill="currentColor" />
          Create Alert
        </Button>
      )}
    />
  )
}
