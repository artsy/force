import { Text } from "@artsy/palette"
import { FC } from "react"
import { RouterLink } from "System/Components/RouterLink"

export const SettingsEditSettingsDeleteAccount: FC = () => {
  return (
    <Text variant="sm-display" color="red100">
      <RouterLink to="delete" textDecoration="none">
        Delete Account
      </RouterLink>
    </Text>
  )
}
