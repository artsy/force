import { useEffect, useRef, useState } from "react"
import * as React from "react"
import {
  RelayPaginationProp,
  RelayRefetchProp,
  createPaginationContainer,
} from "react-relay"
import { graphql } from "relay-runtime"
import Waypoint from "react-waypoint"
import {
  Banner,
  Box,
  Column,
  Flex,
  GridColumns,
  GuaranteeIcon,
  media,
  Spacer,
  Spinner,
  Toast,
} from "@artsy/palette"
import compact from "lodash/compact"
import styled from "styled-components"

import { extractNodes } from "v2/Utils/extractNodes"
import { ItemFragmentContainer } from "./Item"
import { Reply } from "./Reply"
import { ConversationMessagesFragmentContainer as ConversationMessages } from "./ConversationMessages"
import { ConversationHeader } from "./ConversationHeader"
import { ConfirmArtworkModalQueryRenderer } from "./ConfirmArtworkModal"
import { returnOrderModalDetails } from "../Utils/returnOrderModalDetails"
import { OrderModal } from "./OrderModal"
import { UnreadMessagesToastQueryRenderer } from "./UnreadMessagesToast"
import useOnScreen from "../Utils/useOnScreen"
import { UpdateConversation } from "../Mutation/UpdateConversationMutation"

import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import { useRouter } from "v2/System/Router/useRouter"
export interface ConversationProps {
  conversation: Conversation_conversation
  showDetails: boolean
  setShowDetails: (showDetails: boolean) => void
  relay: RelayPaginationProp
  refetch: RelayRefetchProp["refetch"]
  selectedConversationID: string
}

export const PAGE_SIZE: number = 15

const Loading: React.FC = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
)

const Conversation: React.FC<ConversationProps> = props => {
  const { conversation, relay, showDetails, setShowDetails } = props

  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null

  const isOfferable =
    !!artwork?.isOfferable || !!artwork?.isOfferableFromInquiry

  const [showConfirmArtworkModal, setShowConfirmArtworkModal] = useState<
    boolean
  >(false)

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

  // Show banner
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    setShowBanner(true)
    const timer = setTimeout(() => setShowBanner(false), 5000)
    return () => clearTimeout(timer)
  }, [props.selectedConversationID])

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
      {showBanner && (
        <GridColumns>
          <Column start={4} span={6} mt={1}>
            <BannerWarning variant="brand">
              <GuaranteeIcon mr={1} fill="white100" />
              To protect your payment, always communicate and pay through the
              Artsy platform.
            </BannerWarning>
          </Column>
        </GridColumns>
      )}
      <NoScrollFlex flexDirection="column" width="100%">
        <MessageContainer ref={scrollContainer as any}>
          <Box pb={[6, 6, 6, 0]} pr={1}>
            <Spacer mt={["75px", "75px", 2]} />
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
          openInquiryModal={() => setShowConfirmArtworkModal(true)}
          openOrderModal={() => setShowOrderModal(true)}
        />
      </NoScrollFlex>
      {isOfferable && (
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
          closeModal={() => {
            refreshData()
            setShowOrderModal(false)
          }}
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

const BannerWarning = styled(Banner)`
  ${media.xs`
    text-align: right 
  `}
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
          states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED, CANCELED]
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
