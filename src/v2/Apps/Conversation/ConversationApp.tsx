import { ConversationApp_me } from "v2/__generated__/ConversationApp_me.graphql"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { ConversationsFragmentContainer as Conversations } from "v2/Apps/Conversation/Components/Conversations"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { Match, Router } from "found"
import React, { useEffect, useState, useContext } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex, Spinner, breakpoints } from "@artsy/palette"
import { debounce } from "lodash"
import { SystemContext } from "v2/Artsy"
import { userHasLabFeature } from "v2/Utils/user"
import { ErrorPage } from "v2/Components/ErrorPage"
import { Media } from "v2/Utils/Responsive"
import { FullHeader, MobileInboxHeader } from "./Components/InboxHeaders"

interface ConversationAppProps {
  me: ConversationApp_me
  match: Match
  router: Router
}

const getViewWidth = () => {
  return Math.max(
    window.document.documentElement.clientWidth,
    window.innerWidth || 0
  )
}

export const ConversationApp: React.FC<ConversationAppProps> = props => {
  const { me, router } = props
  const { user } = useContext(SystemContext)
  const isEnabled = userHasLabFeature(user, "User Conversations View")
  const [width, setWidth] = useState(0)
  const route = findCurrentRoute(props.match)
  let maxWidth

  const conversation = me.conversationsConnection.edges[0]?.node

  useEffect(() => {
    setWidth(getViewWidth())
    const listenForResize = debounce(() => {
      setWidth(getViewWidth())
    })
    window.addEventListener("resize", listenForResize)
    return () => window.removeEventListener("resize", listenForResize)
  }, [])

  useEffect(() => {
    if (isEnabled && width > breakpoints.xs && conversation && router) {
      router.replace(`/user/conversations/${conversation.internalID}`)
    }
  }, [isEnabled, router, conversation, width])

  if (!isEnabled) {
    return <ErrorPage code={404} />
  }

  if (route.displayFullPage) {
    maxWidth = "100%"
  }
  return (
    <AppContainer maxWidth={maxWidth}>
      <Title>Conversations | Artsy</Title>
      <Media at="xs">
        <MobileInboxHeader />
      </Media>
      <Media greaterThan="xs">
        <FullHeader partnerName={conversation?.to?.name} />
      </Media>
      <Conversations me={me} />
      <Flex
        display={["none", "flex"]}
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    </AppContainer>
  )
}

export const ConversationAppFragmentContainer = createFragmentContainer(
  ConversationApp,
  {
    me: graphql`
      fragment ConversationApp_me on Me
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
            node {
              internalID
              to {
                name
              }
            }
          }
        }
        ...Conversations_me
      }
    `,
  }
)

export default ConversationAppFragmentContainer
