import { useState } from "react"
import * as React from "react"
import { Button, GridColumns, Column, Text } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { AllAlertsSection_me } from "v2/__generated__/AllAlertsSection_me.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { AlertItemFragmentContainer } from "./AlertItem"

export interface AllAlertsSectionProps {
  me: AllAlertsSection_me
  relay: RelayPaginationProp
}

const AllAlertsSection: React.FC<AllAlertsSectionProps> = ({ me, relay }) => {
  const [isLoading, setIsLoading] = useState(false)
  const nodes = extractNodes(me.savedSearchesConnection)

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    setIsLoading(true)

    relay.loadMore(10, err => {
      setIsLoading(false)

      if (err) {
        console.error(err)
      }
    })
  }

  if (nodes.length === 0) {
    return (
      <Text mb={4} variant="sm">
        No alerts
      </Text>
    )
  }

  return (
    <>
      <GridColumns my={4}>
        {nodes.map(node => {
          return (
            <AlertItemFragmentContainer key={node.internalID} item={node} />
          )
        })}
      </GridColumns>

      {relay.hasMore() && (
        <GridColumns my={6}>
          <Column span={12} mx="auto">
            <Button
              width="100%"
              variant="secondaryGray"
              onClick={handleClick}
              loading={isLoading}
              disabled={isLoading}
            >
              Show more
            </Button>
          </Column>
        </GridColumns>
      )}
    </>
  )
}

export const AllAlertsPaginationContainer = createPaginationContainer(
  AllAlertsSection,
  {
    me: graphql`
      fragment AllAlertsSection_me on Me
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
        ) {
        savedSearchesConnection(first: $count, after: $cursor)
          @connection(key: "AllAlerts_savedSearchesConnection") {
          edges {
            node {
              internalID
              ...AlertItem_item
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getVariables(_, { count, cursor }) {
      return {
        count,
        cursor,
      }
    },
    query: graphql`
      query AllAlertsSectionQuery($count: Int!, $cursor: String) {
        me {
          ...AllAlertsSection_me @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
