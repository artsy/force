import { Box, Flex, Spacer, Spinner } from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import React, { useEffect, useRef, useState } from "react"
import {
  RelayPaginationProp,
  RelayRefetchProp,
  createPaginationContainer,
} from "react-relay"
import { graphql } from "relay-runtime"
import Waypoint from "react-waypoint"
import { ItemFragmentContainer } from "./Item"
import { Reply } from "./Reply"
import { ConversationMessagesFragmentContainer as ConversationMessages } from "./ConversationMessages"
import { UpdateConversation } from "../Mutation/UpdateConversationMutation"
import styled from "styled-components"
import { ConversationHeader } from "./ConversationHeader"
import { ConfirmArtworkModalQueryRenderer } from "./ConfirmArtworkModal"
import { userHasLabFeature } from "v2/Utils/user"
import { useSystemContext } from "v2/System/SystemContext"
import { BuyerGuaranteeMessage } from "./BuyerGuaranteeMessage"
import { extractNodes } from "v2/Utils/extractNodes"
import { returnOrderModalDetails } from "../Utils/returnOrderModalDetails"
import { OrderModal } from "./OrderModal"
import compact from "lodash/compact"

import { UnreadMessagesToastQueryRenderer } from "./UnreadMessagesToast"
import useOnScreen from "../Utils/useOnScreen"

export interface ConversationProps {
  conversation: Conversation_conversation
  showDetails: boolean
  setShowDetails: (showDetails: boolean) => void
  relay: RelayPaginationProp
  refetch: RelayRefetchProp["refetch"]
}

export const PAGE_SIZE: number = 15

const Loading: React.FC = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
)

const Conversation: React.FC<ConversationProps> = props => {
  const { conversation, relay, showDetails, setShowDetails } = props
  const { user } = useSystemContext()

  const bottomOfMessageContainer = useRef<HTMLElement>(null)
  const initialMount = useRef(true)

  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" && liveArtwork

  const isArtworkOfferable = !!artwork && !!artwork?.isOfferableFromInquiry

  const isOfferable =
    user &&
    userHasLabFeature(user, "Web Inquiry Checkout") &&
    isArtworkOfferable

  const [showConfirmArtworkModal, setShowConfirmArtworkModal] = useState<
    boolean
  >(false)
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
  const [fetchingMore, setFetchingMore] = useState<boolean>(false)

  // Keeping track of this for scroll on send
  const [lastMessageID, setLastMessageID] = useState<string | null>()

  const scrollToBottom = () => {
    if (
      (bottomOfMessageContainer.current !== null && initialMount.current) ||
      lastMessageID !== conversation?.lastMessageID
    ) {
      const scrollOptions = initialMount.current ? {} : { behavior: "smooth" }
      // @ts-expect-error STRICT_NULL_CHECK
      bottomOfMessageContainer.current.scrollIntoView(scrollOptions)
      initialMount.current = false
    }
  }

  // Navigation behaviour
  useEffect(() => {
    setLastMessageID(conversation?.fromLastViewedMessageID)
    scrollToBottom()
  }, [conversation?.internalID])

  // User sends message behaviour
  useEffect(() => {
    if (
      conversation?.lastMessageID !== lastMessageID &&
      !conversation.isLastMessageToUser
    ) {
      scrollToBottom()
    }
  }, [conversation?.lastMessageID])

  useEffect(() => {
    markRead(!conversation.isLastMessageToUser)
  }, [lastMessageID])

  const inquiryItemBox = compact(conversation.items).map((i, idx) => {
    const isValidType =
      i.item?.__typename === "Artwork" || i.item?.__typename === "Show"

    return (
      <ItemFragmentContainer
        item={i.item!}
        key={isValidType ? i.item?.id : idx}
      />
    )
  })

  const loadMore = (): void => {
    if (
      relay.isLoading() ||
      !relay.hasMore() ||
      initialMount.current ||
      fetchingMore
    )
      return
    setFetchingMore(true)

    relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)
      setFetchingMore(false)

      scrollToBottom()
    })
  }

  const activeOrder = extractNodes(conversation.orderConnection)[0]

  let orderID
  let kind

  if (activeOrder) {
    kind = activeOrder.buyerAction
    orderID = activeOrder.internalID
  }

  const { url, modalTitle } = returnOrderModalDetails({
    kind: kind!,
    orderID: orderID,
  })

  // New Messages
  const isBottomVisible = useOnScreen(bottomOfMessageContainer)
  useEffect(() => {
    if (isBottomVisible) refreshData()
  }, [isBottomVisible])

  const refreshData = () => {
    scrollToBottom()
    props.refetch({ conversationID: conversation.internalID }, null, () => {
      scrollToBottom()
      markRead(!!conversation.isLastMessageToUser)
    })
  }
  const markRead = (delayed?: boolean) => {
    // Set on a timeout so the user sees the "new" flag
    setTimeout(
      () => {
        setLastMessageID(conversation?.lastMessageID)
        UpdateConversation(relay.environment, conversation)
      },
      delayed ? 3000 : 0
    )
  }
  const viewUnreadMessages = () => {
    refreshData()
  }

  return (
    <Flex flexDirection="column" flexGrow={1}>
      <ConversationHeader
        partnerName={conversation.to.name}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
      <NoScrollFlex flexDirection="column" width="100%">
        <MessageContainer>
          <Box pb={[6, 6, 6, 0]} pr={1}>
            <Spacer mt={["75px", "75px", 2]} />
            <Flex flexDirection="column" width="100%" px={1}>
              {isOfferable && <BuyerGuaranteeMessage />}
              {inquiryItemBox}
              <Waypoint onEnter={loadMore} />
              {fetchingMore ? <Loading /> : null}
              <ConversationMessages
                messages={conversation.messagesConnection!}
                events={conversation.orderConnection}
                lastViewedMessageID={+(lastMessageID || -1)}
              />
              <Box ref={bottomOfMessageContainer as any} />
            </Flex>
          </Box>
          <UnreadMessagesToastQueryRenderer
            conversationID={conversation?.internalID!}
            onOfferable={!!(artwork && isOfferable)}
            hasScrolled={!isBottomVisible}
            onClick={viewUnreadMessages}
          />
        </MessageContainer>
        <Reply
          onScroll={scrollToBottom}
          onMount={scrollToBottom}
          conversation={conversation}
          refetch={props.refetch}
          environment={relay.environment}
          openInquiryModal={() => setShowConfirmArtworkModal(true)}
          openOrderModal={() => setShowOrderModal(true)}
        />
      </NoScrollFlex>
      {artwork && isOfferable && (
        <ConfirmArtworkModalQueryRenderer
          artworkID={artwork?.internalID!}
          conversationID={conversation.internalID!}
          show={showConfirmArtworkModal}
          closeModal={() => setShowConfirmArtworkModal(false)}
        />
      )}
      {isOfferable && (
        <OrderModal
          path={url!}
          orderID={orderID}
          title={modalTitle!}
          show={showOrderModal}
          closeModal={() => setShowOrderModal(false)}
        />
      )}
    </Flex>
  )
}

const MessageContainer = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
`

const NoScrollFlex = styled(Flex)`
  overflow: hidden;
  flex-grow: 1;
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

export const ConversationPaginationContainer = createPaginationContainer(
  Conversation,
  {
    conversation: graphql`
      fragment Conversation_conversation on Conversation
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          after: { type: "String" }
        ) {
        id
        internalID
        from {
          name
          email
        }
        to {
          name
          initials
        }
        initialMessage
        lastMessageID
        fromLastViewedMessageID
        isLastMessageToUser
        unread
        orderConnection(
          first: 10
          states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED, CANCELED]
          participantType: BUYER
        ) {
          edges {
            node {
              internalID
              ... on CommerceOfferOrder {
                buyerAction
              }
            }
          }
          ...ConversationMessages_events
        }

        unread

        messagesConnection(first: $count, after: $after, sort: DESC)
          @connection(key: "Messages_messagesConnection", filters: []) {
          pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
          }
          edges {
            node {
              id
            }
          }
          totalCount
          ...ConversationMessages_messages
        }
        items {
          item {
            __typename
            ... on Artwork {
              id
              isOfferableFromInquiry
              internalID
            }
            ...Item_item
          }
          liveArtwork {
            ... on Artwork {
              isOfferableFromInquiry
              internalID
              __typename
            }
          }
        }
        ...ConversationCTA_conversation
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.conversation?.messagesConnection
    },
    getFragmentVariables(prevVars, count) {
      return {
        ...prevVars,
        count,
      }
    },
    getVariables(props, { cursor, count }) {
      return {
        count,
        cursor,
        after: cursor,
        conversationID: props.conversation.id,
      }
    },
    query: graphql`
      query ConversationPaginationQuery(
        $count: Int
        $after: String
        $conversationID: ID!
      ) {
        node(id: $conversationID) {
          ...Conversation_conversation @arguments(count: $count, after: $after)
        }
      }
    `,
  }
)
