import * as React from "react"
import { Button, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsEmailPreferences_me } from "v2/__generated__/SettingsEditSettingsEmailPreferences_me.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
interface SettingEditSettingsEmailPreferencesProps {
  me: SettingsEditSettingsEmailPreferences_me
}

export const SettingsEditSettingsEmailPreferences: React.FC<SettingEditSettingsEmailPreferencesProps> = () => {
  return (
    <>
      <Text color="black100" variant="lg" mb={4}>
        Email Preferences
      </Text>
      <Flex mt="2" justifyContent="space-between">
        <Text color="black60" variant="sm">
          Receive emails from Artsy with auctions, articles, curated
          collections, and new works by artists you follow
        </Text>
        <Flex alignItems="center">
          //@ts-ignore
          <Button as={RouterLink} to="/preferences2">
            Update Email Preferences
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export const SettingsEditSettingsEmailPreferencesFragmentContainer = createFragmentContainer(
  SettingsEditSettingsEmailPreferences,
  {
    me: graphql`
      fragment SettingsEditSettingsEmailPreferences_me on Me {
        emailFrequency
        id
      }
    `,
  }
)
