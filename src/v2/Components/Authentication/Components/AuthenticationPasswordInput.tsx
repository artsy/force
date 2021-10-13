import {
  Clickable,
  ClosedEyeIcon,
  InputProps,
  LabeledInput,
  OpenEyeIcon,
} from "@artsy/palette"
import React, { useState } from "react"

export const AuthenticationPasswordInput: React.FC<InputProps> = ({
  ...rest
}) => {
  const [visibility, setVisibility] = useState(false)

  const handleClick = () => {
    setVisibility(prevVisibility => !prevVisibility)
  }

  return (
    <LabeledInput
      type={visibility ? "text" : "password"}
      label={
        <Clickable onClick={handleClick} height="100%">
          {visibility ? (
            <ClosedEyeIcon display="block" />
          ) : (
            <OpenEyeIcon display="block" />
          )}
        </Clickable>
      }
      {...rest}
    />
  )
}
