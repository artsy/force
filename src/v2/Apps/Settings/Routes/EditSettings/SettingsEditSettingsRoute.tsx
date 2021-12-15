import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Column, GridColumns, Join, Separator } from "@artsy/palette"
import { SettingsEditSettingsInformationFragmentContainer } from "./Components/SettingsEditSettingsInformation"
import { SettingsEditSettingsTwoFactorFragmentContainer } from "./Components/SettingsEditSettingsTwoFactor"
import { SettingsEditSettingsEmailPreferencesFragmentContainer } from "./Components/SettingsEditSettingsEmailPreferences/SettingsEditSettingsEmailPreferences"
import { SettingsEditSettingsPassword } from "./Components/SettingsEditSettingsPassword"
import { SettingsEditSettingsRoute_me } from "v2/__generated__/SettingsEditSettingsRoute_me.graphql"
import { SettingsEditSettingsLinkedAccountsFragmentContainer } from "./Components/SettingsEditSettingsLinkedAccounts"

interface SettingsEditRouteProps {
  me: SettingsEditSettingsRoute_me
}

const SettingsEditRoute: React.FC<SettingsEditRouteProps> = ({ me }) => {
  return (
    <GridColumns>
      <Column span={8}>
        <Join separator={<Separator my={4} />}>
          <SettingsEditSettingsInformationFragmentContainer me={me} />

          <SettingsEditSettingsPassword />

          <SettingsEditSettingsTwoFactorFragmentContainer me={me} />

          <SettingsEditSettingsLinkedAccountsFragmentContainer me={me} />

          <SettingsEditSettingsEmailPreferencesFragmentContainer me={me} />

          {/* TODO: SettingsEditSettingsDeleteAccount */}
        </Join>
      </Column>
    </GridColumns>
  )
}

export const SettingsEditRouteFragmentContainer = createFragmentContainer(
  SettingsEditRoute,
  {
    me: graphql`
      fragment SettingsEditSettingsRoute_me on Me {
        ...SettingsEditSettingsInformation_me
        ...SettingsEditSettingsTwoFactor_me
        ...SettingsEditSettingsEmailPreferences_me
        ...SettingsEditSettingsLinkedAccounts_me
      }
    `,
  }
)
