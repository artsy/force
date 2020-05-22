import { Title, Flex } from "@artsy/palette"
import { Conversation_me } from "v2/__generated__/Conversation_me.graphql"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { ConversationFragmentContainer as Conversation } from "v2/Apps/Conversation/Components/Conversation"
import { ConversationsFragmentContainer as Conversations } from "v2/Apps/Conversation/Components/Conversations"
import { SystemContext } from "v2/Artsy"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { ErrorPage } from "v2/Components/ErrorPage"
import { Match } from "found"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { userHasLabFeature } from "v2/Utils/user"
import { Media } from "v2/Utils/Responsive"
import { Conversations_me } from "v2/__generated__/Conversations_me.graphql"
import {
  FullHeader,
  ConversationHeader,
} from "v2/Apps/Conversation/Components/InboxHeaders"
import { DetailsFragmentContainer as Details } from "../../Components/Details"
interface ConversationRouteProps {
  me: Conversations_me & Conversation_me
  conversationID: string
  match: Match
}

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me } = props
  const { user } = useContext(SystemContext)
  const isEnabled = userHasLabFeature(user, "User Conversations View")
  if (isEnabled) {
    const route = findCurrentRoute(props.match)
    let maxWidth

    if (route.displayFullPage) {
      maxWidth = "100%"
    }
    return (
      <AppContainer maxWidth={maxWidth}>
        <Title>Inbox | Artsy</Title>

        <Media at="xs">
          <ConversationHeader partnerName={me.conversation.to.name} />
        </Media>
        <Media greaterThan="xs">
          <FullHeader partnerName={me.conversation.to.name} />
        </Media>
        <Flex>
          <Media greaterThan="xs">
            <Conversations me={me as any} />
          </Media>
          <Conversation conversation={me.conversation} />
          <Details
            conversation={me.conversation as any /** FIXME: Correct type */}
            display={["none", null, null, null, "flex"]}
            width={["100%", "376px"]}
          />
        </Flex>
      </AppContainer>
    )
  } else {
    // not allowed to see this view
    return <ErrorPage code={404} />
  }
}

export const ConversationFragmentContainer = createFragmentContainer(
  ConversationRoute,
  {
    me: graphql`
      fragment Conversation_me on Me
        @argumentDefinitions(conversationID: { type: "String!" }) {
        ...Conversations_me
        conversation(id: $conversationID) {
          to {
            name
          }
          ...Conversation_conversation
        }
      }
    `,
  }
)

export default ConversationFragmentContainer
