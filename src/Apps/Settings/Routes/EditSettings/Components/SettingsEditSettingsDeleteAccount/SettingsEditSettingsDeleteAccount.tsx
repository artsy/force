import { Text } from "@artsy/palette"
import type { FC } from "react"
import { RouterLink } from "System/Components/RouterLink"

export const SettingsEditSettingsDeleteAccount: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Text variant="sm-display" color="red100">
      <RouterLink to="delete" textDecoration="none">
        Delete Account
      </RouterLink>
    </Text>
  )
}
