import { Box, Flex, Text } from "@artsy/palette"
import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"

import { SystemContextProps, useSystemContext } from "v2/System"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SettingsEditSettingsTwoFactor_me } from "v2/__generated__/SettingsEditSettingsTwoFactor_me.graphql"
import { SettingsEditSettingsTwoFactorQuery } from "v2/__generated__/SettingsEditSettingsTwoFactorQuery.graphql"

import { SmsSecondFactorFragmentContainer } from "v2/Components/UserSettings/TwoFactorAuthentication/Components/SmsSecondFactor"
import { BackupSecondFactorFragmentContainer } from "v2/Components/UserSettings/TwoFactorAuthentication/Components/BackupSecondFactor"
import { AppSecondFactorFragmentContainer } from "v2/Components/UserSettings/TwoFactorAuthentication/Components/AppSecondFactor"

export interface SettingsEditSettingsTwoFactorProps extends SystemContextProps {
  me: SettingsEditSettingsTwoFactor_me
  relay: RelayRefetchProp
}

export const SettingsEditSettingsTwoFactor: React.FC<SettingsEditSettingsTwoFactorProps> = props => {
  const { me, relay } = props

  const secondFactorFragments = () => {
    if (typeof window !== "undefined") {
      return (
        <>
          <AppSecondFactorFragmentContainer
            mt={3}
            me={me}
            relayRefetch={relay}
          />
          <SmsSecondFactorFragmentContainer
            mt={2}
            me={me}
            relayRefetch={relay}
          />
        </>
      )
    }
  }

  return (
    <Box>
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["flex-start", "flex-end"]}
      >
        <Text variant="lg" color="black100">
          Two-factor Authentication
        </Text>
        {me.hasSecondFactorEnabled && (
          <Text ml={[0, 1]} variant="lg" color="green100">
            Enabled
          </Text>
        )}
      </Flex>
      <Text mt={2} mb={4} variant="md" maxWidth="515px" color="black60">
        Set up an additional layer of security by requiring a security code in
        addition to your password to log in to your Artsy account.
      </Text>
      {secondFactorFragments()}
      {me.hasSecondFactorEnabled && (
        <BackupSecondFactorFragmentContainer mt={2} me={me} />
      )}
    </Box>
  )
}

export const SettingsEditSettingsTwoFactorRefetchContainer = createRefetchContainer(
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
  },
  graphql`
    query SettingsEditSettingsTwoFactorRefetchQuery {
      me {
        ...SettingsEditSettingsTwoFactor_me
      }
    }
  `
)

export const SettingsEditSettingsTwoFactorQueryRenderer = () => {
  const { user, relayEnvironment } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <SystemQueryRenderer<SettingsEditSettingsTwoFactorQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query SettingsEditSettingsTwoFactorQuery @raw_response_type {
          me {
            ...SettingsEditSettingsTwoFactor_me
          }
        }
      `}
      render={renderWithLoadProgress(
        SettingsEditSettingsTwoFactorRefetchContainer
      )}
    />
  )
}
