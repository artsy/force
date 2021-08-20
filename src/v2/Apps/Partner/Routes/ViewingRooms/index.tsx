import React from "react"
import compact from "lodash/compact"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRooms_partner } from "v2/__generated__/ViewingRooms_partner.graphql"
import { ViewingRoomsFragmentContainer } from "../../Components/PartnerViewingRooms/ViewingRooms"
import { ViewingRoomsPaginatedRenderer } from "../../Components/PartnerViewingRooms/ViewingRoomsPaginated"

// TODO: Expand viewingRoomsConnection with page argument
// import { useRouter } from "v2/System/Router/useRouter"

interface PartnerShowsProps {
  partner: ViewingRooms_partner
}

export const ViewingRooms: React.FC<PartnerShowsProps> = ({ partner }) => {
  const { currentEvents, upcomingEvents, slug } = partner

  // const {
  //   match: {
  //     location: { query },
  //   },
  // } = useRouter()

  const filteredCurrentEvents = compact(currentEvents?.edges)
  const isCurrentEventsExist = !!filteredCurrentEvents.length
  const filteredUpcomingEvents = compact(upcomingEvents?.edges)
  const isUpcomingEventsExist = !!filteredUpcomingEvents.length

  // const page = +query.page || 1

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
        // page={page}
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
