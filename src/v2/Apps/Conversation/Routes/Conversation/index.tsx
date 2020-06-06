import { Flex, Title } from "@artsy/palette"
import { Conversation_me } from "v2/__generated__/Conversation_me.graphql"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { ConversationFragmentContainer as Conversation } from "v2/Apps/Conversation/Components/Conversation"
import { ConversationsFragmentContainer as Conversations } from "v2/Apps/Conversation/Components/Conversations"
import { SystemContext } from "v2/Artsy"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { ErrorPage } from "v2/Components/ErrorPage"
import { Match } from "found"
import React, { useContext, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { userHasLabFeature } from "v2/Utils/user"
import { Media } from "v2/Utils/Responsive"
import {
  ConversationHeader,
  FullHeader,
} from "v2/Apps/Conversation/Components/InboxHeaders"
import { DetailsFragmentContainer as Details } from "../../Components/Details"
import styled from "styled-components"
interface ConversationRouteProps {
  me: Conversation_me
  conversationID: string
  match: Match
}

const ConstrainedHeightFlex = styled(Flex)`
  height: calc(100vh - 145px);
  & > * {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  & > .fresnel-greaterThan-xs {
    flex-shrink: 0;
  }
`

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me } = props
  const { user } = useContext(SystemContext)
  const isEnabled = userHasLabFeature(user, "User Conversations View")
  const [showDetails, setShowDetails] = useState(false) // TODO based on screen size

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
          <ConversationHeader
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            partnerName={me.conversation.to.name}
          />
        </Media>
        <Media greaterThan="xs">
          <FullHeader
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            partnerName={me.conversation.to.name}
          />
        </Media>
        <ConstrainedHeightFlex>
          <Media greaterThan="xs">
            <Conversations
              me={me as any}
              selectedConversationID={me.conversation.internalID}
            />
          </Media>
          <Conversation conversation={me.conversation} />
          <Details conversation={me.conversation} showDetails={showDetails} />
        </ConstrainedHeightFlex>
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
          internalID
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
