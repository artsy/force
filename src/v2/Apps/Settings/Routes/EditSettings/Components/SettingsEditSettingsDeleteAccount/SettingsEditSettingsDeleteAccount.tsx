import { Text } from "@artsy/palette"
import { FC } from "react"
import { RouterLink } from "v2/System/Router/RouterLink"

export const SettingsEditSettingsDeleteAccount: FC = () => {
  return (
    <Text variant="md" color="red100">
      <RouterLink to="delete" textDecoration="none">
        Delete Account
      </RouterLink>
    </Text>
  )
}
