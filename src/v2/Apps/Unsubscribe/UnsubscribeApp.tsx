import { Column, GridColumns, Spacer, Text, Message } from "@artsy/palette"
import * as React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { UnsubscribeApp_me$data } from "v2/__generated__/UnsubscribeApp_me.graphql"
import { UnsubscribeLoggedInFragmentContainer } from "./Components/UnsubscribeLoggedIn"
import { UnsubscribeLoggedOut } from "./Components/UnsubscribeLoggedOut"

interface UnsubscribeAppProps {
  me: UnsubscribeApp_me$data | null
}

export const parseTokenFromQuery = (query): string => {
  const tokenFromQuery = query.authentication_token || ""
  return tokenFromQuery.split("?")[0]
}

export const UnsubscribeApp: React.FC<UnsubscribeAppProps> = ({ me }) => {
  const { match } = useRouter()

  const authenticationToken = parseTokenFromQuery(match.location.query)

  return (
    <>
      <Title>Email Preferences | Artsy</Title>

      {!me && !authenticationToken ? (
        // Is logged out and doesn't have token: can't update anything
        <Message variant="error" my={4}>
          Please sign in to update your email preferences
        </Message>
      ) : (
        // Either logged in or logged out with a token
        <GridColumns my={4}>
          <Column span={6}>
            <Text variant="xl" as="h1">
              Email Preferences
            </Text>

            <Spacer mt={6} />

            {!!me ? (
              // If we're logged in, always favor the more detailed preferences
              <UnsubscribeLoggedInFragmentContainer me={me} />
            ) : (
              // Otherwise simply show the opt-out
              <UnsubscribeLoggedOut authenticationToken={authenticationToken} />
            )}
          </Column>
        </GridColumns>
      )}
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
