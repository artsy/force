import {
  Box,
  LargePagination,
  Sans,
  Separator,
  SmallPagination,
  Spinner,
} from "@artsy/palette"
import { data as sd } from "sharify"
import { PurchaseHistory_me } from "v2/__generated__/PurchaseHistory_me.graphql"
import React, { useState } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import { UserSettingsTabs } from "v2/Components/UserSettings/UserSettingsTabs"
import { themeGet } from "@styled-system/theme-get"
import { OrderRowFragmentContainer as OrderRow } from "./OrderRow"

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

const ORDER_STATES = [
  "APPROVED",
  "SUBMITTED",
  "CANCELED",
  "FULFILLED",
  "REFUNDED",
]

const PAGE_SIZE = 10

const loadNext = (pageInfo, relay, setLoading) => {
  const { hasNextPage, endCursor } = pageInfo

  if (hasNextPage) {
    loadAfter(endCursor, relay, setLoading)
  }
}

const loadAfter = (cursor, relay, setLoading) => {
  setLoading(true)

  const params = {
    states: ORDER_STATES,
    first: PAGE_SIZE,
    after: cursor,
    before: null,
    last: null,
  }

  relay.refetch(params, null, error => {
    setLoading(false)

    if (error) {
      console.error(error)
    }
  })
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
        <Sans size="4" py={2} px={4}>
          No Orders
        </Sans>
      )}
      <StyledBox>
        <Media at="xs">
          {props.me.orders.pageCursors && (
            <SmallPagination {...paginationProps} />
          )}
        </Media>
        <Media greaterThan="xs">
          <Box>
            <Separator mb={3} pr={2} />
            {props.me.orders.pageCursors && (
              <LargePagination {...paginationProps} />
            )}
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
          states: {
            type: "[CommerceOrderStateEnum!]"
            defaultValue: [APPROVED, CANCELED, FULFILLED, REFUNDED, SUBMITTED]
          }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        name
        orders(
          states: $states
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
              code
              ...OrderRow_order
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
      $states: [CommerceOrderStateEnum!]
      $first: Int!
      $last: Int
      $after: String
      $before: String
    ) {
      me {
        ...PurchaseHistory_me
          @arguments(
            states: $states
            first: $first
            last: $last
            after: $after
            before: $before
          )
      }
    }
  `
)
