import * as React from "react"
import compact from "lodash/compact"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRooms_partner$data } from "v2/__generated__/ViewingRooms_partner.graphql"
import { ViewingRoomsFragmentContainer } from "../../Components/PartnerViewingRooms/ViewingRooms"
import { ViewingRoomsPaginatedRenderer } from "../../Components/PartnerViewingRooms/ViewingRoomsPaginated"

interface PartnerShowsProps {
  partner: ViewingRooms_partner$data
}

export const ViewingRooms: React.FC<PartnerShowsProps> = ({ partner }) => {
  const { currentViewingRooms, upcomingViewingRooms, slug } = partner
  const filteredCurrentViewingRooms = compact(currentViewingRooms?.edges)
  const isCurrentViewingRoomsExist = !!filteredCurrentViewingRooms.length
  const filteredUpcomingViewingRooms = compact(upcomingViewingRooms?.edges)
  const isUpcomingViewingRoomsExist = !!filteredUpcomingViewingRooms.length

  return (
    <>
      {isCurrentViewingRoomsExist && (
        <ViewingRoomsFragmentContainer
          edges={filteredCurrentViewingRooms}
          eventTitle="Current Viewing Rooms"
        />
      )}

      {isUpcomingViewingRoomsExist && (
        <ViewingRoomsFragmentContainer
          edges={filteredUpcomingViewingRooms}
          eventTitle="Upcoming Viewing Rooms"
        />
      )}

      <ViewingRoomsPaginatedRenderer
        eventTitle="Past Viewing Rooms"
        partnerId={slug}
        scrollTo="#jumpto--pastShowsGrid"
        offset={200}
      />
    </>
  )
}

export const ViewingRoomFragmentContainer = createFragmentContainer(
  ViewingRooms,
  {
    partner: graphql`
      fragment ViewingRooms_partner on Partner {
        slug
        currentViewingRooms: viewingRoomsConnection(first: 12, statuses: live) {
          edges {
            node {
              internalID
            }
            ...ViewingRooms_edges
          }
        }
        upcomingViewingRooms: viewingRoomsConnection(
          first: 12
          statuses: scheduled
        ) {
          edges {
            node {
              internalID
            }
            ...ViewingRooms_edges
          }
        }
      }
    `,
  }
)
