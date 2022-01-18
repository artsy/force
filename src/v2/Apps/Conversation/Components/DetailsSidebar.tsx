import { FC, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Box,
  DocumentIcon,
  Flex,
  FlexProps,
  Join,
  Link,
  QuestionCircleIcon,
  Text,
  Spacer,
  breakpoints,
  media,
  StackableBorderBox,
} from "@artsy/palette"
import styled from "styled-components"
import { debounce } from "lodash"
import { zIndex } from "styled-system"
import { themeGet } from "@styled-system/theme-get"

import { useWindowSize } from "v2/Utils/Hooks/useWindowSize"
import ArtworkDetails from "v2/Components/Artwork/Metadata"
import { getViewportDimensions } from "v2/Utils/viewport"
import { DetailsHeader } from "./DetailsHeader"
import { DetailsSidebar_conversation } from "v2/__generated__/DetailsSidebar_conversation.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { TransactionDetailsSummaryItemFragmentContainer } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { RouterLink } from "v2/System/Router/RouterLink"
import { getStatusCopy } from "v2/Apps/Order/Utils/getStatusCopy"
import { ShippingSummaryItemFragmentContainer } from "v2/Apps/Order/Components/ShippingSummaryItem"
import { CreditCardSummaryItemFragmentContainer } from "v2/Apps/Order/Components/CreditCardSummaryItem"

const DETAIL_BOX_XL_ANIMATION = `transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
const DETAIL_BOX_XS_ANIMATION = `transition: opacity 0.3s, z-index 0.3s;`
const DETAIL_BOX_MD_ANIMATION = `transition: transform 0.3s;`

// in XS/S/M screens transition is animated with `opacity`. z-index: -1 is also needed when showDetail is false
// in XL screen it is animated with `width` because animation needs to push the mid column content
// in L screens it is animated with `translate` for better performance (than `width`)
const DetailsContainer = styled(Flex)<{ transform?: string }>`
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${themeGet("colors.white100")};
  transform: none;
  ${DETAIL_BOX_XL_ANIMATION}
  ${media.xl`
    transform: ${({ transform }: { transform?: string }) => transform};
    ${DETAIL_BOX_MD_ANIMATION}
    z-index: 0;
  `}
  ${media.md`
    ${DETAIL_BOX_XS_ANIMATION}
    transform: none;
    opacity: ${({ opacity }) => opacity};
    top: 114px;
    position: fixed;
    ${zIndex}
  `}
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
  const { width } = useWindowSize()

  useEffect(() => {
    const initialWidth = width
    const listenForResize = debounce(() => {
      const screenWidth = getViewportDimensions().width
      // Check if the screen width got smaller while the details panel was open
      if (
        screenWidth <= parseInt(breakpoints.xs, 10) &&
        initialWidth > parseInt(breakpoints.xs, 10) &&
        showDetails
      ) {
        setShowDetails(false)
      }
    })
    window.addEventListener("resize", listenForResize)
    return () => window.removeEventListener("resize", listenForResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDetails])

  const item =
    conversation.items?.[0]?.item?.__typename !== "%other" &&
    conversation.items?.[0]?.item

  const attachments = conversation?.messagesConnection?.edges
    ?.map(edge => edge?.node?.attachments)
    ?.filter(attachments => attachments?.length)
    ?.flat()

  const attachmentItems = attachments
    ?.filter(attachment => attachment?.id && attachment?.downloadURL)
    ?.map(attachment => {
      return (
        <Link
          key={attachment!.id}
          href={attachment!.downloadURL}
          target="_blank"
          noUnderline
        >
          <Flex alignItems="center">
            <DocumentIcon mr={0.5} />
            <TruncatedLine variant="xs">{attachment?.fileName}</TruncatedLine>
          </Flex>
        </Link>
      )
    })

  const getDetailsContainerWidth = () => {
    // For big screens
    if (width > parseInt(breakpoints.xs, 10)) {
      if (showDetails) {
        return "376px"
      }
      return ["376px", "376px", "376px", "376px", "0"]
    }

    // For small screens
    return "100%"
  }

  const getDetailsContainerOpacity = (): number => {
    // opacity 0 is only needed on xs/sm/md screen for fade in/out
    if (width < parseInt(breakpoints.md, 10) && !showDetails) {
      return 0
    }
    return 1
  }

  const activeOrder = extractNodes(conversation.sidebarOrderConnection)[0]
  const { description } = getStatusCopy(activeOrder)

  return (
    <DetailsContainer
      flexDirection="column"
      justifyContent="flex-start"
      height={[
        "calc(100% - 114px)",
        "calc(100% - 173px)",
        "calc(100% - 173px)",
        "calc(100% - 173px)",
        "100%",
      ]}
      flexShrink={0}
      position={["fixed", "fixed", "fixed", "fixed", "static"]}
      right={[0, 0, 0, 0, "auto"]}
      width={getDetailsContainerWidth()}
      opacity={getDetailsContainerOpacity()}
      transform={showDetails ? "translateX(0)" : "translateX(376px)"}
      zIndex={showDetails ? 1 : -1}
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
        messagesConnection(first: $count, after: $after, sort: DESC)
          @connection(key: "Messages_messagesConnection", filters: []) {
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
