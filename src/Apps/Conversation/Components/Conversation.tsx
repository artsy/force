import { useEffect, useRef, useState } from "react"
import * as React from "react"
import {
  RelayPaginationProp,
  RelayRefetchProp,
  createPaginationContainer,
} from "react-relay"
import { graphql } from "react-relay"
// FIXME:
// eslint-disable-next-line no-restricted-imports
import Waypoint from "react-waypoint"
import {
  Banner,
  Box,
  Flex,
  GuaranteeIcon,
  Spacer,
  Spinner,
} from "@artsy/palette"
import compact from "lodash/compact"
import styled from "styled-components"

import { extractNodes } from "Utils/extractNodes"
import { ItemFragmentContainer } from "./Item"
import { Reply } from "./Reply"
import { ConversationMessagesFragmentContainer as ConversationMessages } from "./ConversationMessages"
import { ConversationHeader } from "./ConversationHeader"
import { ConfirmArtworkModalQueryRenderer } from "./ConfirmArtworkModal"
import { returnOrderModalDetails } from "Apps/Conversation/Utils/returnOrderModalDetails"
import { OrderModal } from "./OrderModal"
import { UnreadMessagesToastQueryRenderer } from "./UnreadMessagesToast"
import useOnScreen from "Apps/Conversation/Utils/useOnScreen"
import { UpdateConversation } from "Apps/Conversation/Mutation/UpdateConversationMutation"
import { useFeatureFlag } from "System/useFeatureFlag"

import { Conversation_conversation$data } from "__generated__/Conversation_conversation.graphql"
import { useRouter } from "System/Router/useRouter"
export interface ConversationProps {
  conversation: Conversation_conversation$data
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

// Show banner

const GuaranteeBanner: React.FC<{ conversationID: string }> = ({
  conversationID,
}) => {
  const [showBanner, setShowBanner] = useState(false)
  useEffect(() => {
    setShowBanner(true)
    const timer = setTimeout(() => setShowBanner(false), 5000)
    return () => clearTimeout(timer)
  }, [conversationID])

  return showBanner ? (
    <Banner variant="brand">
      <GuaranteeIcon mr={1} fill="white100" />
      To be covered by the Artsy Guarantee, always communicate and pay through
      the Artsy platform.
    </Banner>
  ) : null
}

const Conversation: React.FC<ConversationProps> = props => {
  const { conversation, relay, showDetails, setShowDetails } = props
  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null
  const isCBNEnabled = useFeatureFlag("conversational-buy-now")
  const isActionable =
    !!artwork?.isOfferable ||
    !!artwork?.isOfferableFromInquiry ||
    (!!isCBNEnabled && !!artwork?.isAcquireable)

  const [showConfirmArtworkModal, setShowConfirmArtworkModal] = useState<
    boolean
  >(false)

  const [createsOfferOrder, setCreatesOfferOrder] = useState<boolean>(true)

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

  // ORDERS
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
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

  // SCROLLING AND FETCHING
  // States and Refs
  const bottomOfMessageContainer = useRef<HTMLElement>(null)
  const initialMount = useRef(true)
  const initialScroll = useRef(true)
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [fetchingMore, setFetchingMore] = useState<boolean>(false)
  const [lastMessageID, setLastMessageID] = useState<string | null>()
  const [lastOrderUpdate, setLastOrderUpdate] = useState<string | null>()

  const isBottomVisible = useOnScreen(bottomOfMessageContainer)

  // Functions
  const loadMore = (): void => {
    if (relay.isLoading() || !relay.hasMore() || !initialMount.current) return

    setFetchingMore(true)
    const scrollCursor = scrollContainer.current
      ? scrollContainer.current?.scrollHeight -
        scrollContainer.current?.scrollTop
      : 0
    relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)
      setFetchingMore(false)
      if (scrollContainer.current) {
        // Scrolling to former position
        scrollContainer.current?.scrollTo({
          top: scrollContainer.current?.scrollHeight - scrollCursor,
          behavior: "smooth",
        })
      }
    })
  }

  const { match } = useRouter()

  const conversationID = match?.params?.conversationID

  // TODO: refactor
  useEffect(() => {
    initialScroll.current = false
  }, [conversationID])

  useEffect(() => {
    initialScroll.current = !fetchingMore
  }, [fetchingMore])

  useEffect(() => {
    if (!fetchingMore && !initialScroll.current) {
      scrollToBottom()
    }
  })

  const scrollToBottom = () => {
    if (!!bottomOfMessageContainer?.current) {
      bottomOfMessageContainer.current?.scrollIntoView?.({
        block: "end",
        inline: "nearest",
        behavior: initialMount.current ? "auto" : "smooth",
      })
      if (isBottomVisible) initialMount.current = false
      setLastMessageID(conversation?.lastMessageID)
      setOrderKey()
    }
  }

  const refreshData = () => {
    props.refetch({ conversationID: conversation.internalID }, null, error => {
      if (error) console.error(error)
      scrollToBottom()
    })
  }

  const setOrderKey = () => {
    setLastOrderUpdate(activeOrder?.updatedAt)
  }

  const [toastBottom, setToastBottom] = useState(0)

  // Behaviours
  // -Navigation
  useEffect(() => {
    setLastMessageID(conversation?.fromLastViewedMessageID)
    initialMount.current = true
    setOrderKey()
  }, [
    conversation.internalID,
    conversation.fromLastViewedMessageID,
    setOrderKey,
  ])
  // -Last message opened
  useEffect(() => {
    // Set on a timeout so the user sees the "new" flag
    setTimeout(
      () => {
        UpdateConversation(relay.environment, conversation)
      },
      !!conversation.isLastMessageToUser ? 3000 : 0
    )
  }, [lastMessageID])
  // -Workaround Reply render resizing race condition

  useEffect(() => {
    if (initialMount.current) scrollToBottom()
    const rect = scrollContainer.current?.getBoundingClientRect()
    setToastBottom(window.innerHeight - (rect?.bottom ?? 0) + 30)
  }, [scrollContainer?.current?.clientHeight])
  // -On scroll down
  useEffect(() => {
    if (isBottomVisible) refreshData()
  }, [isBottomVisible])

  return (
    <Flex flexDirection="column" flexGrow={1}>
      <ConversationHeader
        partnerName={conversation.to.name}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
      <GuaranteeBanner conversationID={conversation?.internalID!} />
      <NoScrollFlex flexDirection="column" width="100%">
        <MessageContainer ref={scrollContainer as any}>
          <Box pb={[6, 6, 6, 0]} pr={1}>
            <Spacer y={["75px", "75px", 2]} />
            <Flex flexDirection="column" width="100%" px={1}>
              {inquiryItemBox}
              <Waypoint onEnter={loadMore} />
              {fetchingMore ? <Loading /> : null}
              <ConversationMessages
                messages={conversation.messagesConnection!}
                events={conversation.orderConnection}
                lastViewedMessageID={conversation?.fromLastViewedMessageID}
                setShowDetails={setShowDetails}
              />
              <Box ref={bottomOfMessageContainer as any} />
            </Flex>
          </Box>
          <UnreadMessagesToastQueryRenderer
            conversationID={conversation?.internalID!}
            lastOrderUpdate={lastOrderUpdate}
            bottom={toastBottom}
            hasScrolled={!isBottomVisible}
            onClick={scrollToBottom}
            refreshCallback={refreshData}
          />
        </MessageContainer>
        <Reply
          onScroll={scrollToBottom}
          conversation={conversation}
          refetch={props.refetch}
          environment={relay.environment}
          openInquiryModal={({ createsOfferOrder }) => {
            setShowConfirmArtworkModal(true)
            setCreatesOfferOrder(createsOfferOrder)
          }}
          openOrderModal={() => setShowOrderModal(true)}
        />
      </NoScrollFlex>
      {isActionable && (
        <ConfirmArtworkModalQueryRenderer
          artworkID={artwork?.internalID!}
          conversationID={conversation.internalID!}
          show={showConfirmArtworkModal}
          closeModal={() => setShowConfirmArtworkModal(false)}
          createsOfferOrder={createsOfferOrder}
        />
      )}
      <OrderModal
        path={url!}
        orderID={orderID}
        title={modalTitle!}
        show={showOrderModal}
        closeModal={() => {
          refreshData()
          setShowOrderModal(false)
        }}
      />
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
          states: [
            APPROVED
            FULFILLED
            SUBMITTED
            REFUNDED
            CANCELED
            PROCESSING_APPROVAL
          ]
          participantType: BUYER
        ) {
          edges {
            node {
              internalID
              updatedAt
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
              isOfferable
              isOfferableFromInquiry
              internalID
            }
            ...Item_item
          }
          liveArtwork {
            ... on Artwork {
              isOfferable
              isOfferableFromInquiry
              isAcquireable
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
