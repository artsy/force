import React from "react"
import { BellIcon, Button, ButtonProps } from "@artsy/palette"
import {
  SavedSearchCreateAlertBase,
  SavedSearchCreateAlertBaseProps,
} from "./SavedSearchCreateAlertBase"

export interface Props extends SavedSearchCreateAlertBaseProps {
  buttonProps?: ButtonProps
}

export const SavedSearchCreateAlertButton: React.FC<Props> = ({
  buttonProps,
  ...rest
}) => {
  return (
    <SavedSearchCreateAlertBase
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
