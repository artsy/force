import { Button, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { FC } from "react"

export const SettingsEditSettingsEmailPreferences: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <Text color="mono100" variant={["md", "lg"]} mb={4}>
        Email Preferences
      </Text>
      <Text color="mono60" variant="sm" mb={2}>
        Receive emails from Artsy with auctions, articles, curated collections,
        and new works by artists you follow
      </Text>
      <RouterLink to="/unsubscribe">
        <Button>Update Email Preferences</Button>
      </RouterLink>
    </>
  )
}
