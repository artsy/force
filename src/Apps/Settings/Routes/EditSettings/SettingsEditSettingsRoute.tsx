import { SettingsEditSettingsInformationFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsInformation"
import { SettingsEditSettingsThemeSelect } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsThemeSelect"
import { Column, GridColumns, Join, Separator } from "@artsy/palette"
import type { SettingsEditSettingsRoute_me$data } from "__generated__/SettingsEditSettingsRoute_me.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsDeleteAccount } from "./Components/SettingsEditSettingsDeleteAccount/SettingsEditSettingsDeleteAccount"
import { SettingsEditSettingsEmailPreferences } from "./Components/SettingsEditSettingsEmailPreferences/SettingsEditSettingsEmailPreferences"
import { SettingsEditSettingsLinkedAccountsFragmentContainer } from "./Components/SettingsEditSettingsLinkedAccounts"
import { SettingsEditSettingsPasswordFragmentContainer } from "./Components/SettingsEditSettingsPassword"
import { SettingsEditSettingsTwoFactorFragmentContainer } from "./Components/SettingsEditSettingsTwoFactor/SettingsEditSettingsTwoFactor"

interface SettingsEditRouteProps {
  me: SettingsEditSettingsRoute_me$data
}

const SettingsEditRoute: React.FC<
  React.PropsWithChildren<SettingsEditRouteProps>
> = ({ me }) => {
  return (
    <GridColumns>
      <Column span={8}>
        <Join separator={<Separator my={4} />}>
          <SettingsEditSettingsInformationFragmentContainer me={me} />

          <SettingsEditSettingsPasswordFragmentContainer me={me} />

          <SettingsEditSettingsTwoFactorFragmentContainer me={me} />

          <SettingsEditSettingsLinkedAccountsFragmentContainer me={me} />

          <SettingsEditSettingsEmailPreferences />

          <SettingsEditSettingsThemeSelect />

          <SettingsEditSettingsDeleteAccount />
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
        ...SettingsEditSettingsPassword_me
        ...SettingsEditSettingsTwoFactor_me
        ...SettingsEditSettingsLinkedAccounts_me
      }
    `,
  },
)
