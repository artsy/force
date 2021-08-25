import React from "react"
import compact from "lodash/compact"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRooms_partner } from "v2/__generated__/ViewingRooms_partner.graphql"
import { ViewingRoomsFragmentContainer } from "../../Components/PartnerViewingRooms/ViewingRooms"
import { ViewingRoomsPaginatedRenderer } from "../../Components/PartnerViewingRooms/ViewingRoomsPaginated"

interface PartnerShowsProps {
  partner: ViewingRooms_partner
}

export const ViewingRooms: React.FC<PartnerShowsProps> = ({ partner }) => {
  const { currentEvents, upcomingEvents, slug } = partner
  const filteredCurrentEvents = compact(currentEvents?.edges)
  const isCurrentEventsExist = !!filteredCurrentEvents.length
  const filteredUpcomingEvents = compact(upcomingEvents?.edges)
  const isUpcomingEventsExist = !!filteredUpcomingEvents.length

  return (
    <>
      {isCurrentEventsExist && (
        <ViewingRoomsFragmentContainer
          edges={filteredCurrentEvents}
          eventTitle="Current Events"
        />
      )}

      {isUpcomingEventsExist && (
        <ViewingRoomsFragmentContainer
          edges={filteredUpcomingEvents}
          eventTitle="Upcoming Events"
        />
      )}

      <ViewingRoomsPaginatedRenderer
        eventTitle="Past Events"
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
        currentEvents: viewingRoomsConnection(first: 12, statuses: live) {
          edges {
            node {
              internalID
            }
            ...ViewingRooms_edges
          }
        }
        upcomingEvents: viewingRoomsConnection(first: 12, statuses: scheduled) {
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
