import * as React from "react"
import { Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"


export const SettingsEditSettingsDeleteAccount = () => {
  return (
    <>
    <RouterLink to="delete" textDecoration="none">
        <Text color="black60">
          Delete Account
        </Text>
      </RouterLink>
    </>
  )
}
