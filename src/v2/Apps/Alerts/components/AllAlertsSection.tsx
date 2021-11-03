import { useState } from "react"
import * as React from "react"
import { Box, Button, GridColumns, Column } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { AllAlertsSection_me } from "v2/__generated__/AllAlertsSection_me.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

export interface AllAlertsSectionProps {
  me: AllAlertsSection_me
  relay: RelayPaginationProp
}

const AllAlertsSection: React.FC<AllAlertsSectionProps> = ({ me, relay }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setIsLoading(true)

    const previousScrollY = window.scrollY

    relay.loadMore(10, err => {
      setIsLoading(false)

      if (window.scrollY > previousScrollY) {
        window.scrollTo({
          behavior: "auto",
          top: previousScrollY,
        })
      }

      if (err) {
        console.error(err)
      }
    })
  }

  const nodes = extractNodes(me.savedSearchesConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      {nodes.map((node, index) => {
        return (
          <Box my={6} key={index}>
            {node.userAlertSettings.name}
          </Box>
        )
      })}

      <GridColumns my={6}>
        <Column span={12} mx="auto">
          <Button
            width="100%"
            variant="secondaryGray"
            onClick={handleClick}
            loading={isLoading}
            disabled={!relay.hasMore()}
          >
            Show more
          </Button>
        </Column>
      </GridColumns>
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
              userAlertSettings {
                name
              }
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
