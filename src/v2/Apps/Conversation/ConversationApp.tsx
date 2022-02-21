import { useEffect } from "react"
import * as React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { Match, Router } from "found"
import compact from "lodash/compact"
import { Flex, Spinner, breakpoints } from "@artsy/palette"

import { NoMessages } from "./Components/NoMessages"

import { ConversationListPaginationContainer as ConversationList } from "v2/Apps/Conversation/Components/ConversationList"
import { ConversationApp_me$data } from "v2/__generated__/ConversationApp_me.graphql"
import { useWindowSize } from "v2/Utils/Hooks/useWindowSize"
interface ConversationAppProps {
  me: ConversationApp_me$data
  match: Match
  router: Router
}

interface InboxProps {
  me: ConversationApp_me$data
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  selectedConversation: ConversationApp_me["conversationsConnection"]["edges"][0]["node"]
}

const Inbox: React.FC<InboxProps> = ({ selectedConversation, me }) => {
  return (
    <>
      <ConversationList
        me={me}
        selectedConversationID={selectedConversation.internalID}
      />
      <Flex
        display={["none", "none", "flex"]}
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    </>
  )
}

export const ConversationApp: React.FC<ConversationAppProps> = props => {
  const { me, router } = props
  const { width } = useWindowSize()

  const firstConversation = compact(me?.conversationsConnection?.edges)[0]?.node

  useEffect(() => {
    if (width > parseInt(breakpoints.md, 10) && firstConversation && router) {
      router.replace(`/user/conversations/${firstConversation.internalID}`)
    }
  }, [router, firstConversation, width])

  return (
    <>
      <Title>Conversations | Artsy</Title>
      {!firstConversation ? (
        <NoMessages />
      ) : (
        <Inbox selectedConversation={firstConversation} me={me} />
      )}
    </>
  )
}

export const ConversationAppFragmentContainer = createFragmentContainer(
  ConversationApp,
  {
    me: graphql`
      fragment ConversationApp_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 25 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        conversationsConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
              internalID
              to {
                name
              }
            }
          }
        }
        ...ConversationList_me
      }
    `,
  }
)
