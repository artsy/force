import React, { useContext } from "react"
import { Box, Flex, Sans, Separator, color } from "@artsy/palette"
import { isServer } from "lib/isServer"
import { SystemContext, useSystemContext } from "v2/Artsy"
import { MobileLink } from "./MobileLink"
import { MobileSubmenuLink } from "./MobileNavMenu"
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
  const { mediator } = useSystemContext()
  const menu = {
    links: [
      {
        href: "/user/purchases",
        text: "Order history",
      },
      {
        href: "/user/saves",
        text: "Saves & Follows",
      },
      {
        href: "/user/auctions",
        text: "Auctions",
      },
      {
        href: "/profile/edit",
        text: "Collector Profile",
      },
      {
        href: "/user/edit",
        text: "Settings",
      },
      {
        href: "/user/payments",
        text: "Payments",
      },
      {
        href: "#logout",
        onClick: event => {
          event.preventDefault()
          mediator.trigger("auth:logout")
        },
        text: "Log out",
      },
    ],
    title: "Account",
  }
  const conversationCount =
    me?.unreadConversationCount || getConversationCount()

  updateConversationCache(me?.unreadConversationCount)

  return (
    <Box>
      <Separator my={1} color={color("black10")} />
      <MobileLink href="/user/conversations">
        <Flex justifyContent="space-between">
          Inbox
          {conversationCount > 0 && (
            <Sans size="5t" color={color("purple100")}>
              {`${conversationCount} new`}
            </Sans>
          )}
        </Flex>
      </MobileLink>
      <MobileLink href="/works-for-you">Works for you</MobileLink>
      <MobileSubmenuLink menu={menu}>{menu.title}</MobileSubmenuLink>
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
