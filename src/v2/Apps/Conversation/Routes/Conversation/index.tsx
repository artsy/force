import { useState } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import {
  Box,
  Flex,
  FullBleed,
  Title,
  ThemeProviderV3,
  breakpoints,
} from "@artsy/palette"
import { Match } from "found"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { ConversationPaginationContainer as Conversation } from "v2/Apps/Conversation/Components/Conversation"
import { ConversationListPaginationContainer as ConversationList } from "v2/Apps/Conversation/Components/ConversationList"
import { Conversation_me } from "v2/__generated__/Conversation_me.graphql"
import { DetailsSidebarFragmentContainer } from "../../Components/DetailsSidebar"
const LARGE_SCREEN_CONVERSATION_LIST_WIDTH = "375px"

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

const ConversationListWrapper = styled(Box)`
  height: 100%;
  display: none;
  @media (min-width: ${breakpoints.md}) {
    display: initial;
    flex: 0 0 ${LARGE_SCREEN_CONVERSATION_LIST_WIDTH};
    border-right: 1px solid ${themeGet("colors.black10")};
  }
`

export const ConversationRoute: React.FC<ConversationRouteProps> = props => {
  const { me } = props
  const [showDetails, setShowDetails] = useState(false)
  return (
    <>
      <ThemeProviderV3>
        <FullBleed>
          <Title>Inbox | Artsy</Title>
          <ConstrainedHeightContainer>
            <ConversationContainer>
              <ConversationListWrapper>
                <ConversationList
                  me={me as any}
                  selectedConversationID={me?.conversation?.internalID ?? ""}
                />
              </ConversationListWrapper>
              <Conversation
                conversation={me.conversation!}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                refetch={props.relay.refetch}
                selectedConversationID={me?.conversation?.internalID ?? ""}
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
