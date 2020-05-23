import { Box, media, color } from "@artsy/palette"
import { Conversations_me } from "v2/__generated__/Conversations_me.graphql"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ConversationSnippetFragmentContainer as ConversationSnippet } from "./ConversationSnippet"
import { NoMessages } from "./NoMessages"
import styled from "styled-components"

const Container = styled(Box)`
  min-height: 100vh;
  border-right: 1px solid ${color("black10")};
  ${media.xs`
    border-right: none;
  `};
`

interface ConversationsProps {
  me: Conversations_me
  relay: RelayRefetchProp
}

const Conversations: React.FC<ConversationsProps> = props => {
  const { me } = props
  const conversations = me.conversationsConnection.edges
  return (
    <>
      <Container width={["100%", "375px"]}>
        {conversations.length ? (
          <Box>
            {conversations.map(edge => (
              <ConversationSnippet conversation={edge.node} key={edge.cursor} />
            ))}
          </Box>
        ) : (
            <NoMessages />
          )}
      </Container>
    </>
  )
}

export const ConversationsFragmentContainer = createRefetchContainer(
  Conversations as React.ComponentType<ConversationsProps>,
  {
    me: graphql`
      fragment Conversations_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
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
            cursor
            node {
              id
              internalID
              lastMessage
              ...ConversationSnippet_conversation
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
  },
  graphql`
    query ConversationsQuery(
      $first: Int!
      $last: Int
      $after: String
      $before: String
    ) {
      me {
        ...Conversations_me
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)
