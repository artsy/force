import {
  Box,
  LargePagination,
  Text,
  Separator,
  SmallPagination,
  Spinner,
} from "@artsy/palette"
import { data as sd } from "sharify"
import { PurchaseHistory_me } from "v2/__generated__/PurchaseHistory_me.graphql"
import { useState } from "react"
import * as React from "react"
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
    after: cursor,
    before: null,
    first: PAGE_SIZE,
    last: null,
    states: ORDER_STATES,
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
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const pageInfo = me.orders.pageInfo
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const myOrders = me.orders.edges && me.orders.edges.map(x => x.node)

  const paginationProps = {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    hasNextPage: props.me.orders.pageInfo.hasNextPage,
    onClick: cursor => loadAfter(cursor, props.relay, setLoading),
    onNext: () => loadNext(pageInfo, props.relay, setLoading),
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    pageCursors: props.me.orders.pageCursors,
  }

  return !loading ? (
    <Box>
      <Box mx={["0px", "40px", "40px", "40px"]} mt="-5px">
        <UserSettingsTabs route={sd.CURRENT_PATH} username={me.name} />
      </Box>
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      {myOrders.length ? (
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        myOrders.map((order, i) => (
          <OrderRow
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            key={order.code}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            order={order}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            hasDivider={i != myOrders.length - 1}
          />
        ))
      ) : (
        <Text variant="sm" py={2} px={4}>
          No Orders
        </Text>
      )}
      <StyledBox>
        <Media at="xs">
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          {props.me.orders.pageCursors && (
            <SmallPagination
              {...paginationProps}
              getHref={() => {
                // FIXME: wire this up properly
                return ""
              }}
              pageCursors={paginationProps.pageCursors as any}
            />
          )}
        </Media>
        <Media greaterThan="xs">
          <Box>
            <Separator mb={3} pr={2} />
            {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
            {props.me.orders.pageCursors && (
              <LargePagination
                {...paginationProps}
                getHref={() => {
                  // FIXME: wire this up properly
                  return ""
                }}
                pageCursors={paginationProps.pageCursors as any}
              />
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
