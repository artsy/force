import { FC } from "react"
import { Button, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export const SettingsEditSettingsEmailPreferences: FC = () => {
  return (
    <>
      <Text color="black100" variant="lg-display" mb={4}>
        Email Preferences
      </Text>
      <Text color="black60" variant="sm" mb={2}>
        Receive emails from Artsy with auctions, articles, curated collections,
        and new works by artists you follow
      </Text>
      <RouterLink to="/unsubscribe">
        <Button>Update Email Preferences</Button>
      </RouterLink>
    </>
  )
}
