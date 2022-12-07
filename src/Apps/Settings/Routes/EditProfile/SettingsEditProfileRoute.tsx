import React from "react"
import { SettingsEditProfileRoute_me$data } from "__generated__/SettingsEditProfileRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Column, GridColumns, Join, Separator } from "@artsy/palette"
import { SettingsEditSettingsInformationFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsInformation"
import { SettingsEditSettingsPasswordFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsPassword"
import { SettingsEditSettingsTwoFactorFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor"
import { SettingsEditSettingsLinkedAccountsFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsLinkedAccounts"
import { SettingsEditSettingsEmailPreferences } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsEmailPreferences/SettingsEditSettingsEmailPreferences"
import { SettingsEditSettingsDeleteAccount } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsDeleteAccount/SettingsEditSettingsDeleteAccount"

interface SettingsEditProfileRouteProps {
  me: SettingsEditProfileRoute_me$data
}

const SettingsEditProfileRoute: React.FC<SettingsEditProfileRouteProps> = ({
  me,
}) => {
  return (
    <GridColumns>
      <Column span={8}>
        <Join separator={<Separator my={4} />}>
          <SettingsEditSettingsInformationFragmentContainer me={me} />

          <SettingsEditSettingsPasswordFragmentContainer me={me} />

          <SettingsEditSettingsTwoFactorFragmentContainer me={me} />

          <SettingsEditSettingsLinkedAccountsFragmentContainer me={me} />

          <SettingsEditSettingsEmailPreferences />

          <SettingsEditSettingsDeleteAccount />
        </Join>
      </Column>
    </GridColumns>
  )
}

export const SettingsEditProfileRouteFragmentContainer = createFragmentContainer(
  SettingsEditProfileRoute,
  {
    me: graphql`
      fragment SettingsEditProfileRoute_me on Me {
        ...SettingsEditSettingsInformation_me
        ...SettingsEditSettingsPassword_me
        ...SettingsEditSettingsTwoFactor_me
        ...SettingsEditSettingsLinkedAccounts_me
      }
    `,
  }
)
