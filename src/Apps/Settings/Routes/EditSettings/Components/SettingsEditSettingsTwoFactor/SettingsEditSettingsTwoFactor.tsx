import { Join, Spacer, Sup, Text } from "@artsy/palette"
import { AppSecondFactorRefetchContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/AppSecondFactor"
import { SmsSecondFactorRefetchContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/SmsSecondFactor"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsTwoFactor_me$data } from "__generated__/SettingsEditSettingsTwoFactor_me.graphql"
import { SettingsEditSettingsTwoFactorBackupCodesFragmentContainer } from "./SettingsEditSettingsTwoFactorBackupCodes"

interface SettingsEditSettingsTwoFactorProps {
  me: SettingsEditSettingsTwoFactor_me$data
}

export const SettingsEditSettingsTwoFactor: React.FC<SettingsEditSettingsTwoFactorProps> = ({
  me,
}) => {
  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Two-Factor Authentication{" "}
        {me.hasSecondFactorEnabled && <Sup color="green100">Enabled</Sup>}
      </Text>

      <Join separator={<Spacer y={2} />}>
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
