import { useState } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { Box, Flex, FullBleed, Title, ThemeProviderV3 } from "@artsy/palette"
import { Match } from "found"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { ConversationPaginationContainer as Conversation } from "v2/Apps/Conversation/Components/Conversation"
import { ConversationListPaginationContainer as ConversationList } from "v2/Apps/Conversation/Components/ConversationList"
import { Media } from "v2/Utils/Responsive"
import { Conversation_me } from "v2/__generated__/Conversation_me.graphql"
import { DetailsSidebarFragmentContainer } from "../../Components/DetailsSidebar"

interface ConversationRouteProps {
  me: Conversation_me
  conversationID: string
  match: Match
  relay: RelayRefetchProp
}

const ConstrainedHeightContainer = styled(Box)`
  height: calc(100vh - 103px);
  @media ${themeGet("mediaQueries.xs")} {
    height: calc(100vh - 60px);
  }
`

const ConversationContainer = styled(Flex)`
  height: 100%;
  & > * {
    overflow-x: hidden;
    overflow-y: auto;
  }
  & > .fresnel-greaterThan-sm {
    flex-shrink: 0;
  }
`

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me } = props
  const [showDetails, setShowDetails] = useState(false) // TODO based on screen size

  return (
    <>
      <ThemeProviderV3>
        <FullBleed>
          <Title>Inbox | Artsy</Title>
          <ConstrainedHeightContainer>
            <ConversationContainer>
              <Media greaterThan="sm">
                <ConversationList
                  me={me as any}
                  selectedConversationID={me?.conversation?.internalID ?? ""}
                />
              </Media>
              <Conversation
                conversation={me.conversation!}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                refetch={props.relay.refetch}
              />
              <DetailsSidebarFragmentContainer
                conversation={me.conversation!}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
              />
            </ConversationContainer>
          </ConstrainedHeightContainer>
        </FullBleed>
      </ThemeProviderV3>
    </>
  )
}

export const ConversationPaginationContainer = createRefetchContainer(
  ConversationRoute,
  {
    me: graphql`
      fragment Conversation_me on Me
        @argumentDefinitions(conversationID: { type: "String!" }) {
        ...ConversationList_me
        conversation(id: $conversationID) {
          internalID
          ...Conversation_conversation
          ...ConversationCTA_conversation
          ...DetailsSidebar_conversation
        }
      }
    `,
  },
  graphql`
    query ConversationPageQuery($conversationID: String!) {
      me {
        ...Conversation_me @arguments(conversationID: $conversationID)
      }
    }
  `
)
