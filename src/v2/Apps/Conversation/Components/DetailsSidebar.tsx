import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Box,
  DocumentIcon,
  Flex,
  FlexProps,
  Join,
  QuestionCircleIcon,
  Text,
  Spacer,
  breakpoints,
  StackableBorderBox,
} from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import ArtworkDetails from "v2/Components/Artwork/Metadata"
import { DetailsHeader } from "./DetailsHeader"
import { DetailsSidebar_conversation } from "v2/__generated__/DetailsSidebar_conversation.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { TransactionDetailsSummaryItemFragmentContainer } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { RouterLink } from "v2/System/Router/RouterLink"
import { getStatusCopy } from "v2/Apps/Order/Utils/getStatusCopy"
import { ShippingSummaryItemFragmentContainer } from "v2/Apps/Order/Components/ShippingSummaryItem"
import { CreditCardSummaryItemFragmentContainer } from "v2/Apps/Order/Components/CreditCardSummaryItem"
import { SMALL_SCREEN_HEADER_HEIGHT } from "./ConversationHeader"

const DETAIL_BOX_WIDTH = "376px"

// in XS/SM screens transition is animated with `opacity`. z-index: -1 is also needed when showDetail is false
// in MD screens it is animated with `translate` for better performance (than `width`)
// in XL screen it is animated with `width` because animation needs to push the mid column content
const DetailsContainer = styled(Flex)<{
  showDetails: boolean
}>`
  /* More or less global */
  background-color: ${themeGet("colors.white100")};
  position: absolute;
  top: ${SMALL_SCREEN_HEADER_HEIGHT};
  height: 100%;

  /* XS-S-M: Full screen details */
  width: 100%;
  transition: opacity 0.3s, z-index 0.3s;
  opacity: ${({ showDetails }) => (showDetails ? 1 : 0)};
  z-index: ${({ showDetails }) => (showDetails ? 0 : -1)};

  @media (min-width: ${breakpoints.md}) {
    opacity: initial;
    z-index: initial;
    top: 0;
    width: ${DETAIL_BOX_WIDTH};
    z-index: 1;
    border-left: 1px solid ${themeGet("colors.black10")};
    transition: transform 0.3s;
    transform: ${({ showDetails }) =>
      showDetails ? "translateX(0)" : `translateX(${DETAIL_BOX_WIDTH})`};
  }

  @media (min-width: ${breakpoints.xl}) {
    transform: initial;
    position: static;
    z-index: 0;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: ${({ showDetails }) => (showDetails ? DETAIL_BOX_WIDTH : 0)};
  }
`

const TruncatedLine = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

interface DetailsProps extends FlexProps {
  conversation: DetailsSidebar_conversation
  showDetails: boolean
  setShowDetails: (showDetails: boolean) => void
}

export const DetailsSidebar: FC<DetailsProps> = ({
  conversation,
  setShowDetails,
  showDetails,
  ...props
}) => {
  const item =
    conversation.items?.[0]?.item?.__typename !== "%other" &&
    conversation.items?.[0]?.item

  const attachments = conversation?.attachmentsConnection?.edges
    ?.map(edge => edge?.node?.attachments)
    ?.filter(attachments => attachments?.length)
    ?.flat()

  const attachmentItems = attachments
    ?.filter(attachment => attachment?.id && attachment?.downloadURL)
    ?.map(attachment => {
      return (
        <RouterLink
          key={attachment!.id}
          to={attachment!.downloadURL}
          target="_blank"
          noUnderline
        >
          <Flex alignItems="center">
            <DocumentIcon mr={0.5} />
            <TruncatedLine variant="xs">{attachment?.fileName}</TruncatedLine>
          </Flex>
        </RouterLink>
      )
    })

  const activeOrder = extractNodes(conversation.sidebarOrderConnection)[0]
  const { description } = getStatusCopy(activeOrder)

  return (
    <DetailsContainer
      showDetails={showDetails}
      flexDirection="column"
      justifyContent="flex-start"
      height="100%"
      flexShrink={0}
      right={0}
      {...props}
    >
      <DetailsHeader
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
      {!!activeOrder && !!description && (
        <StackableBorderBox>
          <Text>{description}</Text>
        </StackableBorderBox>
      )}
      {item && (
        <>
          <StackableBorderBox flexDirection="column" p={2}>
            <Text variant="md" mb={2} fontWeight="bold">
              {item.__typename}
            </Text>
            <Flex>
              <a href={item.href!}>
                <Box height="80px" width="80px">
                  <div
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      backgroundImage: `url(${item.image?.thumbnailUrl})`,
                      backgroundSize: "contain",
                    }}
                  />
                </Box>
              </a>
              <Flex flexDirection="column" ml={1}>
                {item.__typename === "Artwork" && (
                  <ArtworkDetails mt="-4px" artwork={item} />
                )}
              </Flex>
            </Flex>
          </StackableBorderBox>
        </>
      )}
      {!!activeOrder && (
        <>
          <TransactionDetailsSummaryItemFragmentContainer
            order={activeOrder}
            showOrderNumberHeader
            title={`Order No. ${activeOrder.code}`}
          />
          <ShippingSummaryItemFragmentContainer
            order={activeOrder}
            textColor="black60"
          />
          <CreditCardSummaryItemFragmentContainer
            title="Payment Method"
            order={activeOrder}
            textColor="black60"
          />
        </>
      )}
      {!!attachments?.length && (
        <StackableBorderBox>
          <Box>
            <Text variant="md" mb={2} fontWeight="bold">
              Attachments
            </Text>
            <Join separator={<Spacer mb={1} />}>{attachmentItems}</Join>
          </Box>
        </StackableBorderBox>
      )}
      <StackableBorderBox height="100%">
        <Flex flexDirection="column">
          <Text variant="md" mb={2} fontWeight="bold">
            Support
          </Text>
          <RouterLink
            to={`https://support.artsy.net/hc/en-us/sections/360008203054-Contact-a-gallery`}
            target="_blank"
            noUnderline
          >
            <Flex alignItems="center" mb={1}>
              <QuestionCircleIcon mr={1} />
              <Text variant="xs">Inquiries FAQ</Text>
            </Flex>
          </RouterLink>
        </Flex>
      </StackableBorderBox>
    </DetailsContainer>
  )
}

export const DetailsSidebarFragmentContainer = createFragmentContainer(
  DetailsSidebar,
  {
    conversation: graphql`
      fragment DetailsSidebar_conversation on Conversation
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          after: { type: "String" }
        ) {
        to {
          name
          initials
        }
        sidebarOrderConnection: orderConnection(
          first: 10
          states: [APPROVED, FULFILLED, SUBMITTED]
        ) {
          edges {
            node {
              __typename
              internalID
              state
              displayState
              mode
              stateReason
              code
              stateExpiresAt(format: "MMM D")
              ...TransactionDetailsSummaryItem_order
              ...ShippingSummaryItem_order
              ...CreditCardSummaryItem_order
              creditCard {
                brand
                lastDigits
                expirationYear
                expirationMonth
              }
              lineItems {
                edges {
                  node {
                    artwork {
                      shippingOrigin
                    }
                    shipment {
                      trackingNumber
                      trackingUrl
                      carrierName
                      estimatedDeliveryWindow
                    }
                    selectedShippingQuote {
                      displayName
                    }
                    fulfillments {
                      edges {
                        node {
                          courier
                          trackingId
                          estimatedDelivery(format: "MMM Do, YYYY")
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        attachmentsConnection: messagesConnection(
          first: $count
          after: $after
          sort: DESC
        ) @connection(key: "Details_attachmentsConnection", filters: []) {
          edges {
            node {
              attachments {
                id
                contentType
                fileName
                downloadURL
              }
            }
          }
        }
        items {
          item {
            __typename
            ... on Artwork {
              href
              ...Metadata_artwork
              image {
                thumbnailUrl: url(version: "small")
              }
            }
            ... on Show {
              href
              image: coverImage {
                thumbnailUrl: url(version: "small")
              }
            }
          }
        }
      }
    `,
  }
)
