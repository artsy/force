import { Join, Spacer, Sup, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsTwoFactor_me } from "v2/__generated__/SettingsEditSettingsTwoFactor_me.graphql"
import { SmsSecondFactorRefetchContainer } from "v2/Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/SmsSecondFactor"
import { AppSecondFactorRefetchContainer } from "v2/Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/AppSecondFactor"
import { SettingsEditSettingsTwoFactorBackupCodesFragmentContainer } from "./SettingsEditSettingsTwoFactorBackupCodes"

export interface SettingsEditSettingsTwoFactorProps {
  me: SettingsEditSettingsTwoFactor_me
}

export const SettingsEditSettingsTwoFactor: React.FC<SettingsEditSettingsTwoFactorProps> = ({
  me,
}) => {
  return (
    <>
      <Text variant="lg-display" mb={4}>
        Two-Factor Authentication{" "}
        {me.hasSecondFactorEnabled && <Sup color="green100">Enabled</Sup>}
      </Text>

      <Join separator={<Spacer mt={2} />}>
        <Text variant="sm" color="black60">
          Set up an additional layer of security by requiring a security code in
          addition to your password to log in to your Artsy account.
        </Text>

        <AppSecondFactorRefetchContainer me={me} />

        <SmsSecondFactorRefetchContainer me={me} />

        {me.hasSecondFactorEnabled && (
          <SettingsEditSettingsTwoFactorBackupCodesFragmentContainer me={me} />
        )}
      </Join>
    </>
  )
}

export const SettingsEditSettingsTwoFactorFragmentContainer = createFragmentContainer(
  SettingsEditSettingsTwoFactor,
  {
    me: graphql`
      fragment SettingsEditSettingsTwoFactor_me on Me {
        hasSecondFactorEnabled
        ...AppSecondFactor_me
        ...SmsSecondFactor_me
        ...SettingsEditSettingsTwoFactorBackupCodes_me
      }
    `,
  }
)
