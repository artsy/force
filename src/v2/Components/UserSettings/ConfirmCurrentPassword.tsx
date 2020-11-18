import React from "react"
import { PasswordInput } from "v2/Components/PasswordInput"
import { Text } from "@artsy/palette"

interface ConfirmCurrentPasswordProps {}

export const ConfirmCurrentPassword: React.FC<ConfirmCurrentPasswordProps> = (_props) => {
  return (
    <div>
      <Text>Password required</Text>
      <PasswordInput autoFocus />
    </div>
  )
}
