import React, { useContext } from "react"
import { Box, Flex, Sans, Separator, color } from "@artsy/palette"
import { isServer } from "lib/environment"
import { SystemContext, useSystemContext } from "v2/Artsy"
import { userHasLabFeature } from "v2/Utils/user"
import { MobileLink } from "./MobileLink"
import { graphql } from "relay-runtime"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import {
  LoggedInLinksQuery,
  LoggedInLinksQueryResponse,
} from "v2/__generated__/LoggedInLinksQuery.graphql.ts"
import { getConversationCount, updateConversationCache } from "../../helpers"

export const LoggedInLinks: React.FC<
  { error?: any } & Partial<LoggedInLinksQueryResponse>
> = ({ error, me }) => {
  const { mediator, user } = useSystemContext()
  const conversationsEnabled = userHasLabFeature(
    user,
    "User Conversations View"
  )
  const conversationCount =
    me?.unreadConversationCount || getConversationCount()

  updateConversationCache(me?.unreadConversationCount)

  return (
    <Box>
      <Separator my={1} color={color("black10")} />
      {conversationsEnabled && (
        <Flex justifyContent="space-between">
          <MobileLink href="/user/conversations">Inbox</MobileLink>
          {conversationCount > 0 && (
            <Sans size="5t" color={color("purple100")} py="4px">
              {`${conversationCount} new`}
            </Sans>
          )}
        </Flex>
      )}
      <MobileLink href="/works-for-you">Works for you</MobileLink>
      <MobileLink href="/user/edit">Account</MobileLink>
      <MobileLink
        href="#"
        onClick={event => {
          event.preventDefault()
          mediator.trigger("auth:logout")
        }}
      >
        Log out
      </MobileLink>
    </Box>
  )
}

export const LoggedInLinksQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return isServer ? (
    <LoggedInLinks />
  ) : (
    <QueryRenderer<LoggedInLinksQuery>
      environment={relayEnvironment}
      query={graphql`
        query LoggedInLinksQuery {
          me {
            unreadNotificationsCount
            unreadConversationCount
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        return <LoggedInLinks error={error} {...props} />
      }}
    />
  )
}
