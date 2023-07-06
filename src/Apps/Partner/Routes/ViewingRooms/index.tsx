import * as React from "react"
import { graphql, usePaginationFragment } from "react-relay"
import { ViewingRooms_partner$key } from "__generated__/ViewingRooms_partner.graphql"
import { ViewingRoomsPaginationQuery } from "__generated__/ViewingRoomsPaginationQuery.graphql"
import { Suspense } from "react"
import { Spinner, Text, GridColumns, Column, Box, Button } from "@artsy/palette"

interface ViewingRoomsProps {
  partner: ViewingRooms_partner$key
}

export const ViewingRooms: React.FC<ViewingRoomsProps> = ({ partner }) => {
  const { data, loadNext, hasNext } = usePaginationFragment<
    ViewingRoomsPaginationQuery,
    ViewingRooms_partner$key
  >(
    graphql`
      fragment ViewingRooms_partner on Partner
        @refetchable(queryName: "ViewingRoomsPaginationQuery") {
        name
        viewingRoomsConnection(first: $count, after: $cursor)
          @connection(key: "ViewingRooms_partner_viewingRoomsConnection") {
          edges {
            node {
              title
            }
            cursor
          }
        }
      }
    `,
    partner
  )

  return (
    <>
      <Text color="black" variant="lg-display" mb={6}>
        Current Viewing Rooms for {data.name}
      </Text>

      <Suspense fallback={<Spinner />}>
        <GridColumns mb={6} gridRowGap={[2, 4]}>
          {data?.viewingRoomsConnection?.edges?.map(({ node: viewingRoom }) => {
            if (!viewingRoom) return
            return (
              <Column key={viewingRoom.internalID} span={[6, 6, 3, 3]}>
                <Text>{viewingRoom.title}</Text>
              </Column>
            )
          })}
        </GridColumns>
      </Suspense>

      {hasNext && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="secondaryBlack"
            size="large"
            onClick={() => loadNext(12)}
          >
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}
