import { Box, Join, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsTwoFactor_me } from "v2/__generated__/SettingsEditSettingsTwoFactor_me.graphql"
import { SmsSecondFactorFragmentContainer } from "v2/Components/UserSettings/TwoFactorAuthentication/Components/SmsSecondFactor"
import { BackupSecondFactorFragmentContainer } from "v2/Components/UserSettings/TwoFactorAuthentication/Components/BackupSecondFactor"
import { AppSecondFactorFragmentContainer } from "v2/Components/UserSettings/TwoFactorAuthentication/Components/AppSecondFactor"

export interface SettingsEditSettingsTwoFactorProps {
  me: SettingsEditSettingsTwoFactor_me
}

export const SettingsEditSettingsTwoFactor: React.FC<SettingsEditSettingsTwoFactorProps> = props => {
  const { me } = props

  return (
    <>
      <Text variant="lg" mb={4}>
        Two-factor Authentication -{" "}
        {me.hasSecondFactorEnabled && (
          <Box as="span" color="green100">
            Enabled
          </Box>
        )}
      </Text>

      <Join separator={<Spacer mt={2} />}>
        <Text variant="md" color="black60">
          Set up an additional layer of security by requiring a security code in
          addition to your password to log in to your Artsy account.
        </Text>

        <AppSecondFactorFragmentContainer me={me} />

        <SmsSecondFactorFragmentContainer me={me} />

        {me.hasSecondFactorEnabled && (
          <BackupSecondFactorFragmentContainer me={me} />
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
        ...BackupSecondFactor_me
      }
    `,
  }
)
