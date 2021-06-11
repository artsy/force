import { Column, GridColumns, Spacer, Text, Message } from "@artsy/palette"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { UnsubscribeApp_me } from "v2/__generated__/UnsubscribeApp_me.graphql"
import { UnsubscribeLoggedInFragmentContainer } from "./Components/UnsubscribeLoggedIn"
import { UnsubscribeLoggedOut } from "./Components/UnsubscribeLoggedOut"

interface UnsubscribeAppProps {
  me: UnsubscribeApp_me | null
}

export const UnsubscribeApp: React.FC<UnsubscribeAppProps> = ({ me }) => {
  const { match } = useRouter()
  const { authentication_token: authenticationToken } = match.location.query

  if (!me && !authenticationToken) {
    return (
      <Message variant="error" my={4}>
        Unable to update your email preferences
      </Message>
    )
  }

  return (
    <>
      <Title>Email Preferences | Artsy</Title>

      <GridColumns my={4}>
        <Column span={6}>
          <Text variant="xl" as="h1">
            Email Preferences
          </Text>

          <Spacer mt={6} />

          {me ? (
            <UnsubscribeLoggedInFragmentContainer me={me} />
          ) : (
            <UnsubscribeLoggedOut authenticationToken={authenticationToken} />
          )}
        </Column>
      </GridColumns>
    </>
  )
}

export const UnsubscribeAppFragmentContainer = createFragmentContainer(
  UnsubscribeApp,
  {
    me: graphql`
      fragment UnsubscribeApp_me on Me {
        ...UnsubscribeLoggedIn_me
      }
    `,
  }
)
