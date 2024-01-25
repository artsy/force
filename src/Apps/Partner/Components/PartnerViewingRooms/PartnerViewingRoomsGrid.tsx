import * as React from "react"
import { Box, Button, Column, GridColumns, Text } from "@artsy/palette"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { PartnerViewingRoomsGrid_viewingRoomsConnection$data } from "__generated__/PartnerViewingRoomsGrid_viewingRoomsConnection.graphql"
import { extractNodes } from "Utils/extractNodes"
import { ViewingRoomCardFragmentContainer } from "Apps/Partner/Components/PartnerViewingRooms/ViewingRoomCard"
import { useState } from "react"

interface PartnerViewingRoomsGridProps {
  relay: RelayPaginationProp
  viewingRoomsConnection: PartnerViewingRoomsGrid_viewingRoomsConnection$data
  sectionTitle: string
}

export const PAGE_SIZE = 12

const PartnerViewingRoomsGrid: React.FC<PartnerViewingRoomsGridProps> = ({
  sectionTitle,
  viewingRoomsConnection,
  relay,
}) => {
  const [loading, setLoading] = useState(false)

  const viewingRoomNodes = extractNodes(
    viewingRoomsConnection.viewingRoomsConnection
  )

  const loadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)
      setLoading(false)
    })
  }

  if (viewingRoomNodes.length === 0) return null

  return (
    <>
      <Text color="black100" variant="lg-display" mb={6}>
        {sectionTitle}
      </Text>

      <GridColumns mb={6} gridRowGap={[2, 4]}>
        {viewingRoomNodes.map(viewingRoom => {
          return (
            <Column key={viewingRoom.internalID} span={[6, 6, 3, 3]}>
              <ViewingRoomCardFragmentContainer viewingRoom={viewingRoom} />
            </Column>
          )
        })}
      </GridColumns>

      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="secondaryBlack"
            size="large"
            onClick={loadMore}
            loading={loading}
          >
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

export const PartnerViewingRoomsGridFragmentContainer = createPaginationContainer(
  PartnerViewingRoomsGrid,
  {
    viewingRoomsConnection: graphql`
      fragment PartnerViewingRoomsGrid_viewingRoomsConnection on Partner
        @argumentDefinitions(
          count: { type: "Int" }
          after: { type: "String" }
          statuses: { type: "[ViewingRoomStatusEnum!]" }
        ) {
        viewingRoomsConnection(
          first: $count
          after: $after
          statuses: $statuses
        ) @connection(key: "PartnerViewingRoomsGrid_viewingRoomsConnection") {
          edges {
            node {
              internalID
              ...ViewingRoomCard_viewingRoom
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewingRoomsConnection.viewingRoomsConnection
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        after: cursor,
      }
    },
    query: graphql`
      query PartnerViewingRoomsGrid_ViewingRoomsQuery(
        $count: Int!
        $after: String
        $partnerId: String!
        $statuses: [ViewingRoomStatusEnum!]
      ) {
        viewingRoomsConnection: partner(id: $partnerId) {
          ...PartnerViewingRoomsGrid_viewingRoomsConnection
            @arguments(count: $count, after: $after, statuses: $statuses)
        }
      }
    `,
  }
)
