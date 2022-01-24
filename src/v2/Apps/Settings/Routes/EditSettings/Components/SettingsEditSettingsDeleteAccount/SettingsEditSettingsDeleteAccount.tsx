import { Text } from "@artsy/palette"
import { FC } from "react"
import { RouterLink } from "v2/System/Router/RouterLink"

export const SettingsEditSettingsDeleteAccount: FC = () => {
  return (
    <Text variant="md" color="black60">
      <RouterLink to="delete" textDecoration="none">
        Delete Account
      </RouterLink>
    </Text>
  )
}
