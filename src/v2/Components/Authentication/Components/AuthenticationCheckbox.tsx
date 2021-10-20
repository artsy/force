import { Checkbox, CheckboxProps, Text } from "@artsy/palette"
import * as React from "react";

interface AuthenticationCheckboxProps extends CheckboxProps {}

export const AuthenticationCheckbox: React.FC<AuthenticationCheckboxProps> = ({
  children,
  ...rest
}) => {
  return (
    <Checkbox {...rest}>
      <Text variant="xs">{children}</Text>
    </Checkbox>
  )
}
