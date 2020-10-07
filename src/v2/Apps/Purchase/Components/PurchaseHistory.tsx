import {
  Avatar,
  BorderBox,
  Box,
  CheckCircleFillIcon,
  Flex,
  HelpIcon,
  Image,
  LargePagination,
  Link,
  PendingCircleIcon,
  Sans,
  Separator,
  SmallPagination,
  Spinner,
  Text,
  XCircleIcon,
} from "@artsy/palette"
import { data as sd } from "sharify"
import { DateTime } from "luxon"
import { PurchaseHistory_me } from "v2/__generated__/PurchaseHistory_me.graphql"
import React, { useState } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import { UserSettingsTabs } from "v2/components/UserSettings/UserSettingsTabs"
import { themeGet } from "@styled-system/theme-get"

interface OrderRowProps {
  order: PurchaseHistory_me["orders"]["edges"][number]["node"]
  hasDivider: boolean
}

const StyledImage = styled(Image)`
  object-fit: cover;
  height: 50px;
  width: 50px;
`
const StyledBox = styled(Box)`
  padding: 10px 40px 30px 40px;
  svg {
    top: 5px;
  }
  @media (max-width: ${themeGet("breakpoints.xs")}) {
    padding: 20px;
    svg {
      top: 0px;
    }
  }
`
const getIcon = status => {
  switch (status) {
    case "submitted":
      return <PendingCircleIcon fill="black60" />
    case "processing":
      return <PendingCircleIcon fill="black60" />
    case "canceled":
      return <XCircleIcon fill="red100" />
    case "refunded":
      return <XCircleIcon fill="red100" />
    case "confirmed":
      return <CheckCircleFillIcon />
    case "fulfilled":
      return <CheckCircleFillIcon />
  }
}

const getColor = status => {
  switch (status) {
    case "submitted":
      return "black60"
    case "processing":
      return "black60"
    case "canceled":
      return "red100"
    case "refunded":
      return "red100"
    case "confirmed":
      return "black100"
    case "fulfilled":
      return "black100"
  }
}

const OrderRow = (props: OrderRowProps) => {
  const { order } = props
  const artwork = order.lineItems.edges[0].node.artwork

  const orderCreatedAt = DateTime.fromISO(order.createdAt)
  // TODO: pass desirable states to graphql query instead of filtering abandoned
  if (!artwork || order.state === "ABANDONED") {
    return null
  }

  const { partner } = artwork

  const { creditCard, requestedFulfillment } = order

  const orderIsInactive =
    order.state === "CANCELED" || order.state === "REFUNDED"

  const partnerImageUrl = partner?.profile?.icon?.url
  const partnerInitials = partner?.initials
  const creditCardNumber = creditCard?.lastDigits
  const fulfillment = requestedFulfillment?.__typename

  const isShip = fulfillment === "CommerceShip"
  return (
    <>
      <Media at="xs">
        <Box px={2}>
          <Flex
            py={1.5}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              height="50px"
              width="50px"
              mr={1.5}
            >
              <StyledImage
                src={artwork.image?.resized?.url}
                alt={artwork.title}
              />
            </Flex>
            <Flex flexDirection="column" justifyContent="center" width="100%">
              {!orderIsInactive && (
                <Link
                  href={`/orders/${order.internalID}/status`}
                  underlineBehavior="hover"
                >
                  <Text variant="text" letterSpacing="tight">
                    {artwork.artist_names}
                  </Text>
                </Link>
              )}
              {orderIsInactive && (
                <Text variant="text" letterSpacing="tight">
                  {artwork.artist_names}
                </Text>
              )}
              <Text variant="text" color="black60" letterSpacing="tight">
                {artwork.partner?.name}
              </Text>
              <Text variant="text" color="black60" letterSpacing="tight">
                {orderCreatedAt.toLocaleString(DateTime.DATE_SHORT)}
              </Text>
            </Flex>
            <Flex flexDirection="column" alignItems="flex-end">
              <Text
                variant="text"
                color="black60"
                letterSpacing="tight"
                style={{ textTransform: "capitalize" }}
              >
                {order.buyerTotal}
              </Text>
              <Text
                variant="text"
                color={getColor(order.state.toLowerCase())}
                letterSpacing="tight"
                style={{ textTransform: "capitalize" }}
              >
                {order.state.toLowerCase()}
              </Text>
            </Flex>
          </Flex>
          {props.hasDivider && <Separator />}
        </Box>
      </Media>
      <Media greaterThanOrEqual="sm">
        <BorderBox my={2} mx="40px" p={0} flexDirection="column">
          <Flex
            bg="black5"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <Text variant="text">
              {" "}
              {orderCreatedAt.toLocaleString(DateTime.DATE_MED)}
            </Text>
            <Flex alignItems="center">
              {getIcon(order.state.toLowerCase())}
              <Text
                ml="2px"
                variant="text"
                color={getColor(order.state.toLowerCase())}
                style={{ textTransform: "capitalize" }}
              >
                {order.state.toLowerCase()}
              </Text>
            </Flex>
          </Flex>
          <Flex p={2} width="100%" alignItems="center">
            <Flex width="50%">
              <StyledImage
                src={artwork.image?.resized?.url}
                alt={artwork.title}
                mr={1}
              />
              <Flex flexDirection="column">
                {!orderIsInactive && (
                  <Link
                    href={`/orders/${order.internalID}/status`}
                    underlineBehavior="hover"
                  >
                    <Text variant="text">{artwork.artist_names}</Text>
                  </Link>
                )}
                {orderIsInactive && (
                  <Text variant="text">{artwork.artist_names}</Text>
                )}
                <Text variant="text" color="black60">
                  {artwork.title}
                </Text>
              </Flex>
            </Flex>
            <Flex width="50%">
              <Avatar
                size="xs"
                src={partnerImageUrl}
                initials={partnerInitials}
              />
              <Flex flexDirection="column" ml={1}>
                <Text variant="text">{artwork.partner?.name}</Text>
                <Text variant="text" color="black60">
                  {artwork.shippingOrigin &&
                    artwork.shippingOrigin.replace(/, US/g, "")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex px={2}>
            <Separator />
          </Flex>
          <Flex p={2}>
            <Flex flexDirection="column" width="25%">
              <Text variant="text">Order No.</Text>
              <Text variant="text" color="black60">
                {order.code}
              </Text>
            </Flex>
            <Flex flexDirection="column" width="25%">
              <Text variant="text">Total</Text>
              <Text variant="text" color="black60">
                {order.buyerTotal}
              </Text>
            </Flex>
            <Flex flexDirection="column" width="25%">
              <Text variant="text">Payment Method</Text>
              <Text variant="text" color="black60">
                {creditCardNumber ? "•••• " + creditCardNumber : "N/A"}
              </Text>
            </Flex>
            <Flex flexDirection="column" width="25%">
              <Text variant="text">Fulfillment</Text>
              <Text variant="text" color="black60">
                {isShip ? "Delivery" : "Pickup"}
              </Text>
            </Flex>
          </Flex>
          <Flex px={2}>
            <Separator />
          </Flex>
          <Flex p={2}>
            <HelpIcon fill="black60" mr="6px" />
            <Text variant="text" color="black60">
              Need Help?{" "}
            </Text>
            <Link href="mailto:support@artsy.net">
              <Text variant="text" color="black60" ml="3px">
                Contact Us.
              </Text>
            </Link>
          </Flex>
        </BorderBox>
      </Media>
    </>
  )
}

const PAGE_SIZE = 10

const loadNext = (pageInfo, relay, setLoading) => {
  const { hasNextPage, endCursor } = pageInfo

  if (hasNextPage) {
    loadAfter(endCursor, relay, setLoading)
  }
}

const loadAfter = (cursor, relay, setLoading) => {
  setLoading(true)

  relay.refetch(
    {
      first: PAGE_SIZE,
      after: cursor,
      before: null,
      last: null,
    },
    null,
    error => {
      setLoading(false)

      if (error) {
        console.error(error)
      }
    }
  )
}
export interface PurchaseHistoryProps {
  me: PurchaseHistory_me
  relay: RelayRefetchProp
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = (
  props: PurchaseHistoryProps
) => {
  const [loading, setLoading] = useState(false)
  const { me } = props
  const pageInfo = me.orders.pageInfo
  const myOrders = me.orders.edges && me.orders.edges.map(x => x.node)

  const paginationProps = {
    pageCursors: props.me.orders.pageCursors,
    hasNextPage: props.me.orders.pageInfo.hasNextPage,
    onClick: cursor => loadAfter(cursor, props.relay, setLoading),
    onNext: () => loadNext(pageInfo, props.relay, setLoading),
  }

  return !loading ? (
    <Box>
      <Box mx={["0px", "40px", "40px", "40px"]} mt="-5px">
        <UserSettingsTabs route={sd.CURRENT_PATH} username={me.name} />
      </Box>
      {myOrders.length ? (
        myOrders.map((order, i) => (
          <OrderRow
            key={order.code}
            order={order}
            hasDivider={i != myOrders.length - 1}
          />
        ))
      ) : (
        <Sans size="2">No Orders</Sans>
      )}
      <StyledBox>
        <Media at="xs">
          <SmallPagination {...paginationProps} />
        </Media>
        <Media greaterThan="xs">
          <Box>
            <Separator mb={3} pr={2} />
            <LargePagination {...paginationProps} />
          </Box>
        </Media>
      </StyledBox>
    </Box>
  ) : (
    <Spinner />
  )
}

export const PurchaseHistoryFragmentContainer = createRefetchContainer(
  PurchaseHistory as React.ComponentType<PurchaseHistoryProps>,
  {
    me: graphql`
      fragment PurchaseHistory_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        name
        orders(first: $first, last: $last, before: $before, after: $after) {
          edges {
            node {
              internalID
              code
              state
              mode
              requestedFulfillment {
                ... on CommerceShip {
                  __typename
                }
                ... on CommercePickup {
                  __typename
                }
              }
              creditCard {
                lastDigits
              }
              buyerTotal
              createdAt
              itemsTotal
              lineItems {
                edges {
                  node {
                    artwork {
                      date
                      image {
                        resized(width: 55) {
                          url
                        }
                      }
                      partner {
                        initials
                        name
                        profile {
                          icon {
                            url(version: "square140")
                          }
                        }
                      }
                      shippingOrigin
                      internalID
                      title
                      artist_names: artistNames
                    }
                  }
                }
              }
            }
          }
          pageCursors {
            around {
              cursor
              isCurrent
              page
            }
            first {
              cursor
              isCurrent
              page
            }
            last {
              cursor
              isCurrent
              page
            }
            previous {
              cursor
              isCurrent
              page
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
  },
  graphql`
    query PurchaseHistoryQuery(
      $first: Int!
      $last: Int
      $after: String
      $before: String
    ) {
      me {
        ...PurchaseHistory_me
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)
