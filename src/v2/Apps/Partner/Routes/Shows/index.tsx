import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Shows_partner } from "v2/__generated__/Shows_partner.graphql"
import { ShowEventsFragmentContainer } from "../../Components/PartnerShows/ShowEvents"
import { ShowPaginatedEventsRenderer } from "../../Components/PartnerShows/ShowPaginatedEvents"
import { Box } from "@artsy/palette"

interface PartnerShowsProps {
  partner: Shows_partner
}

export const Shows: React.FC<PartnerShowsProps> = ({
  partner,
}): JSX.Element => {
  const { currentEvents, upcomingEvents } = partner
  const isCurrentEventsExist = !!currentEvents.edges.length
  const isUpcomingEventsExist = !!upcomingEvents.edges.length

  return (
    <Box>
      {isCurrentEventsExist && (
        <ShowEventsFragmentContainer
          edges={currentEvents.edges}
          eventTitle="Current Events"
        />
      )}
      {isUpcomingEventsExist && (
        <ShowEventsFragmentContainer
          edges={upcomingEvents.edges}
          eventTitle="Upcoming Events"
        />
      )}
      <ShowPaginatedEventsRenderer
        eventTitle="Past Events"
        partnerId={partner.slug}
        status="CLOSED"
        first={24}
        scrollTo="#jumpto--pastShowsGrid"
        offset={200}
      />
    </Box>
  )
}

export const ShowsFragmentContainer = createFragmentContainer(Shows, {
  partner: graphql`
    fragment Shows_partner on Partner {
      slug
      currentEvents: showsConnection(first: 12, status: RUNNING) {
        edges {
          ...ShowEvents_edges
        }
      }
      upcomingEvents: showsConnection(first: 12, status: UPCOMING) {
        edges {
          ...ShowEvents_edges
        }
      }
    }
  `,
})
