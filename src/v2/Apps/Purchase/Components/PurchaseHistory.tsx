import {
  Box,
  Flex,
  Image,
  LargePagination,
  Link,
  Sans,
  Separator,
  Spinner,
  Text,
} from "@artsy/palette"
import { DateTime } from "luxon"
import { PurchaseHistory_me } from "v2/__generated__/PurchaseHistory_me.graphql"
import React, { useState } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import styled from "styled-components"

interface OrderRowProps {
  order: PurchaseHistory_me["orders"]["edges"][number]["node"]
  hasDivider: boolean
}

const StyledImage = styled(Image)`
  object-fit: cover;
  height: 50px;
  width: 50px;
`

const OrderRow = (props: OrderRowProps) => {
  const { order } = props
  const artwork = get(order, o => o.lineItems.edges[0].node.artwork)

  const orderCreatedAt = DateTime.fromISO(order.createdAt).toLocaleString(
    DateTime.DATE_SHORT
  )
  if (!artwork) {
    return null
  }

  const orderIsInactive =
    order.state === "ABANDONED" || order.state === "CANCELED"

  return (
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
            src={get(artwork, a => a.image.resized.url)}
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
            {artwork.partner.name}
          </Text>
          <Text variant="text" color="black60" letterSpacing="tight">
            {orderCreatedAt}
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-end">
          <Text
            variant="text"
            color="black60"
            letterSpacing="tight"
            style={{ textTransform: "capitalize" }}
          >
            {order.itemsTotal ? order.itemsTotal : order.totalListPrice}
          </Text>
          <Text
            variant="text"
            color="black60"
            letterSpacing="tight"
            style={{ textTransform: "capitalize" }}
          >
            {order.state.toLowerCase()}
          </Text>
        </Flex>
      </Flex>
      {props.hasDivider && <Separator />}
    </Box>
  )
}

const PAGE_SIZE = 10

const loadNext = (pageInfo, relay, setLoading) => {
  const { hasNextPage, endCursor } = pageInfo

  if (hasNextPage) {
    this.loadAfter(endCursor, relay, setLoading)
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
  return !loading ? (
    <Box>
      <Sans size="6" px={1} py={1.5}>
        Order History
      </Sans>
      <Separator />
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
      <LargePagination
        pageCursors={me.orders.pageCursors}
        hasNextPage
        onClick={cursor => loadAfter(cursor, props.relay, setLoading)}
        onNext={() => loadNext(pageInfo, props.relay, setLoading)}
      />
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
        orders(first: $first, last: $last, before: $before, after: $after) {
          edges {
            node {
              internalID
              code
              state
              mode
              createdAt
              totalListPrice
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
                        name
                      }
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
