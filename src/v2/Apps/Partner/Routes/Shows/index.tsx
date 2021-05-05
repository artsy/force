import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Shows_partner } from "v2/__generated__/Shows_partner.graphql"

import { ShowEventsFragmentContainer } from "../../Components/PartnerShows/ShowEvents"
import { ShowPaginatedEventsRenderer } from "../../Components/PartnerShows/ShowPaginatedEvents"

import { ShowBannerFragmentContainer } from "../../Components/PartnerShows"
import { useRouter } from "v2/Artsy/Router/useRouter"

interface PartnerShowsProps {
  partner: Shows_partner
}

export const Shows: React.FC<PartnerShowsProps> = ({
  partner,
}): JSX.Element => {
  const {
    currentEvents,
    upcomingEvents,
    featured: { edges: featuredShows },
  } = partner

  const {
    match: {
      location: { query },
    },
  } = useRouter()

  const isCurrentEventsExist = !!currentEvents.edges.length
  const isUpcomingEventsExist = !!upcomingEvents.edges.length

  return (
    <>
      {featuredShows.length > 0 &&
        featuredShows[0].node &&
        featuredShows[0].node.isFeatured && (
          <ShowBannerFragmentContainer my={4} show={featuredShows[0].node} />
        )}
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
        page={query?.page}
      />
    </>
  )
}

export const ShowsFragmentContainer = createFragmentContainer(Shows, {
  partner: graphql`
    fragment Shows_partner on Partner {
      slug
      featured: showsConnection(
        first: 1
        status: ALL
        sort: FEATURED_DESC_END_AT_DESC
        isDisplayable: true
      ) {
        edges {
          node {
            isFeatured
            ...ShowBanner_show
          }
        }
      }
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
