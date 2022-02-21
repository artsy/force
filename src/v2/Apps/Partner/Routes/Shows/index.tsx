import * as React from "react"
import compact from "lodash/compact"
import { createFragmentContainer, graphql } from "react-relay"
import { Shows_partner$data } from "v2/__generated__/Shows_partner.graphql"
import { ShowEventsFragmentContainer } from "../../Components/PartnerShows/ShowEvents"
import { ShowPaginatedEventsRenderer } from "../../Components/PartnerShows/ShowPaginatedEvents"
import { ShowBannerFragmentContainer } from "../../Components/PartnerShows"
import { useRouter } from "v2/System/Router/useRouter"

interface PartnerShowsProps {
  partner: Shows_partner$data
}

export const Shows: React.FC<PartnerShowsProps> = ({
  partner,
}): JSX.Element => {
  const { currentEvents, upcomingEvents, featuredEvents } = partner

  const {
    match: {
      location: { query },
    },
  } = useRouter()

  const firstFeaturedEvent = compact(featuredEvents?.edges)[0]?.node
  const isEventFeatured = firstFeaturedEvent && firstFeaturedEvent.isFeatured
  const filteredUpcomingEvents = compact(upcomingEvents?.edges)?.filter(
    ({ node }) => node?.internalID !== firstFeaturedEvent?.internalID
  )
  const filteredCurrentEvents = compact(currentEvents?.edges)?.filter(
    ({ node }) => node?.internalID !== firstFeaturedEvent?.internalID
  )
  const isUpcomingEventsExist = !!filteredUpcomingEvents.length
  const isCurrentEventsExist = !!filteredCurrentEvents.length

  const page = +query.page || 1

  return (
    <>
      {isEventFeatured && (
        <ShowBannerFragmentContainer my={4} show={firstFeaturedEvent!} />
      )}
      {isCurrentEventsExist && (
        <ShowEventsFragmentContainer
          edges={filteredCurrentEvents}
          eventTitle="Current Events"
        />
      )}
      {isUpcomingEventsExist && (
        <ShowEventsFragmentContainer
          edges={compact(upcomingEvents?.edges)}
          eventTitle="Upcoming Events"
        />
      )}
      <ShowPaginatedEventsRenderer
        eventTitle="Past Events"
        partnerId={partner.slug}
        status="CLOSED"
        first={40}
        scrollTo="#jumpto--pastShowsGrid"
        offset={200}
        page={page}
      />
    </>
  )
}

export const ShowsFragmentContainer = createFragmentContainer(Shows, {
  partner: graphql`
    fragment Shows_partner on Partner {
      slug
      featuredEvents: showsConnection(
        first: 1
        status: ALL
        sort: FEATURED_DESC_END_AT_DESC
        isDisplayable: true
      ) {
        edges {
          node {
            isFeatured
            internalID
            ...ShowBanner_show
          }
        }
      }
      currentEvents: showsConnection(
        first: 12
        status: RUNNING
        isDisplayable: true
      ) {
        edges {
          node {
            internalID
          }
          ...ShowEvents_edges
        }
      }
      upcomingEvents: showsConnection(
        first: 12
        status: UPCOMING
        isDisplayable: true
      ) {
        edges {
          node {
            internalID
          }
          ...ShowEvents_edges
        }
      }
    }
  `,
})
