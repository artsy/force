import React from "react"
import { SettingsEditSettingsRoute_me } from "v2/__generated__/SettingsEditSettingsRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsInformationFragmentContainer } from "./SettingsEditSettingsInformation"
import { Column, GridColumns, Join, Separator } from "@artsy/palette"

interface SettingsEditRouteProps {
  me: SettingsEditSettingsRoute_me
}

const SettingsEditRoute: React.FC<SettingsEditRouteProps> = ({ me }) => {
  return (
    <GridColumns>
      <Column span={8}>
        <Join separator={<Separator my={4} />}>
          <SettingsEditSettingsInformationFragmentContainer me={me} />

          {/* TODO: SettingsEditSettingsPassword */}

          {/* TODO: SettingsEditSettingsTwoFactor */}

          {/* TODO: SettingsEditSettingsLinkedAccounts */}

          {/* TODO: SettingsEditSettingsEmailPreferences */}

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
      }
    `,
  }
)
