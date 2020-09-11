import {
  Box,
  Flex,
  Image,
  LargePagination,
  Link,
  Sans,
  Separator,
  Spinner,
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

  return (
    <Box px="20px">
      <Flex
        py="15px"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          height="50px"
          width="50px"
          mr="15px"
        >
          <StyledImage
            src={get(artwork, a => a.image.resized.url)}
            alt={artwork.title}
          />
        </Flex>
        <Flex flexDirection="column" justifyContent="center" width="100%">
          <Link
            href={`/orders/${order.internalID}/status`}
            underlineBehavior="hover"
          >
            <Sans size="3t">{artwork.artist_names}</Sans>
          </Link>
          <Sans size="3t" color="black60" lineHeight={1.3}>
            {artwork.partner.name}
          </Sans>
          <Sans size="3t" color="black60" lineHeight={1.3}>
            {orderCreatedAt}
          </Sans>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-end">
          <Sans
            size="3t"
            weight="medium"
            style={{ textTransform: "capitalize" }}
          >
            {order.itemsTotal ? order.itemsTotal : order.totalListPrice}
          </Sans>
          <Sans
            size="3t"
            color="black60"
            style={{ textTransform: "capitalize" }}
          >
            {order.state.toLowerCase()}
          </Sans>
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
      <Sans size="6" px="10px" py="15px">
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
