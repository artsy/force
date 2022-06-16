import { Box, Flex, Sans, Serif, Spacer } from "@artsy/palette"
import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"

import { SystemContextProps, useSystemContext } from "v2/System"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

import { AppSecondFactorRefetchContainer as AppSecondFactor } from "./Components/AppSecondFactor"
import { BackupSecondFactorFragmentContainer as BackupSecondFactor } from "./Components/BackupSecondFactor"
import { SmsSecondFactorRefetchContainer as SmsSecondFactor } from "./Components/SmsSecondFactor"

import { TwoFactorAuthentication_me } from "v2/__generated__/TwoFactorAuthentication_me.graphql"
import { TwoFactorAuthenticationQuery } from "v2/__generated__/TwoFactorAuthenticationQuery.graphql"

export interface TwoFactorAuthenticationProps extends SystemContextProps {
  me: TwoFactorAuthentication_me
  relay: RelayRefetchProp
}

const TwoFactorAuthentication: React.FC<TwoFactorAuthenticationProps> = props => {
  const { me } = props

  return (
    <Box>
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["flex-start", "flex-end"]}
      >
        <Serif size="6" color="black100">
          Two-factor Authentication
        </Serif>
        {me.hasSecondFactorEnabled && (
          <Sans ml={[0, 1]} weight="medium" size="4" color="green100">
            Enabled
          </Sans>
        )}
      </Flex>

      <Serif mt={1} size="3t" maxWidth="515px" color="black60">
        Set up an additional layer of security by requiring a security code in
        addition to your password to log in to your Artsy account.
      </Serif>

      <Spacer mt={2} />

      <AppSecondFactor me={me} />

      <Spacer mt={2} />

      <SmsSecondFactor me={me} />
      {me.hasSecondFactorEnabled && <BackupSecondFactor mt={2} me={me} />}
    </Box>
  )
}

export const TwoFactorAuthenticationRefetchContainer = createRefetchContainer(
  TwoFactorAuthentication,
  {
    me: graphql`
      fragment TwoFactorAuthentication_me on Me {
        hasSecondFactorEnabled

        ...AppSecondFactor_me
        ...SmsSecondFactor_me
        ...BackupSecondFactor_me
      }
    `,
  },
  graphql`
    query TwoFactorAuthenticationRefetchQuery {
      me {
        ...TwoFactorAuthentication_me
      }
    }
  `
)

export const TwoFactorAuthenticationQueryRenderer = () => {
  const { user, relayEnvironment } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <SystemQueryRenderer<TwoFactorAuthenticationQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query TwoFactorAuthenticationQuery @raw_response_type {
          me {
            ...TwoFactorAuthentication_me
          }
        }
      `}
      render={renderWithLoadProgress(TwoFactorAuthenticationRefetchContainer)}
    />
  )
}
