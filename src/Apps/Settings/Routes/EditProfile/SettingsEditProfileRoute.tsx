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
import { SettingsEditProfileAboutYouFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileAboutYou"
import { SettingsEditProfileArtistsYouCollectFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileArtistsYouCollect/SettingsEditProfileArtistsYouCollect"
import { useFeatureFlag } from "System/useFeatureFlag"

interface SettingsEditProfileRouteProps {
  me: SettingsEditProfileRoute_me$data
}

const SettingsEditProfileRoute: React.FC<SettingsEditProfileRouteProps> = ({
  me,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  return (
    <GridColumns>
      <Column span={8}>
        <Join separator={<Separator my={4} />}>
          {isCollectorProfileEnabled ? (
            <>
              <SettingsEditSettingsInformationFragmentContainer me={me} />
              <SettingsEditSettingsPasswordFragmentContainer me={me} />
              <SettingsEditSettingsTwoFactorFragmentContainer me={me} />
              <SettingsEditSettingsLinkedAccountsFragmentContainer me={me} />
              <SettingsEditSettingsEmailPreferences />
              <SettingsEditSettingsDeleteAccount />
            </>
          ) : (
            <>
              <SettingsEditProfileAboutYouFragmentContainer me={me} />

              <SettingsEditProfileArtistsYouCollectFragmentContainer me={me} />
            </>
          )}
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
        ...SettingsEditProfileAboutYou_me
        ...SettingsEditProfileArtistsYouCollect_me

        ...SettingsEditSettingsInformation_me
        ...SettingsEditSettingsPassword_me
        ...SettingsEditSettingsTwoFactor_me
        ...SettingsEditSettingsLinkedAccounts_me
        ...SettingsEditProfileFields_me
      }
    `,
  }
)
