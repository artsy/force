import { Column, GridColumns, Join, Spacer, Text } from "@artsy/palette"
import { ShowBannerFragmentContainer } from "Apps/Partner/Components/PartnerShows"
import { ShowPaginatedEventsRenderer } from "Apps/Partner/Components/PartnerShows/ShowPaginatedEvents"
import { CellShowFragmentContainer } from "Components/Cells/CellShow"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import type { Shows_partner$data } from "__generated__/Shows_partner.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface PartnerShowsProps {
  partner: Shows_partner$data
}

export const Shows: React.FC<React.PropsWithChildren<PartnerShowsProps>> = ({
  partner,
}) => {
  const { runningEvents, upcomingEvents, featuredEvents } = partner

  const {
    match: {
      location: { query },
    },
  } = useRouter()

  const [firstFeaturedEvent] = extractNodes(featuredEvents)

  let upcomingEventsList = extractNodes(upcomingEvents)
  let runningEventsList = extractNodes(runningEvents)

  if (firstFeaturedEvent?.isFeatured) {
    const filteredUpcomingEvents = extractNodes(upcomingEvents).filter(
      event => event?.internalID !== firstFeaturedEvent?.internalID,
    )

    const filteredRunningEvents = extractNodes(runningEvents).filter(
      event => event?.internalID !== firstFeaturedEvent?.internalID,
    )

    upcomingEventsList = filteredUpcomingEvents
    runningEventsList = filteredRunningEvents
  }

  return (
    <>
      <Join separator={<Spacer y={6} />}>
        {firstFeaturedEvent?.isFeatured && (
          <ShowBannerFragmentContainer my={4} show={firstFeaturedEvent!} />
        )}

        {runningEventsList.length > 0 && (
          <>
            <Text variant="lg-display">Current Events</Text>

            <GridColumns gridRowGap={[2, 4]}>
              {runningEventsList.map(show => {
                return (
                  <Column key={show.internalID} span={[6, 6, 3, 3]}>
                    <CellShowFragmentContainer
                      show={show}
                      mode="GRID"
                      displayKind
                      displayPartner={false}
                    />
                  </Column>
                )
              })}
            </GridColumns>
          </>
        )}

        {upcomingEventsList.length > 0 && (
          <>
            <Text variant="lg-display">Upcoming Events</Text>

            <GridColumns gridRowGap={[2, 4]}>
              {upcomingEventsList.map(show => {
                return (
                  <Column key={show.internalID} span={[6, 6, 3, 3]}>
                    <CellShowFragmentContainer
                      show={show}
                      mode="GRID"
                      displayKind
                      displayPartner={false}
                    />
                  </Column>
                )
              })}
            </GridColumns>
          </>
        )}

        <ShowPaginatedEventsRenderer
          eventTitle="Past Shows & Fairs"
          partnerId={partner.slug}
          status="CLOSED"
          first={40}
          scrollTo="pastShowsGrid"
          offset={20}
          page={+query.page || 1}
        />
      </Join>
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
      runningEvents: showsConnection(
        first: 12
        status: RUNNING
        sort: END_AT_ASC
        isDisplayable: true
      ) {
        edges {
          node {
            ...CellShow_show
            internalID
          }
        }
      }
      upcomingEvents: showsConnection(
        first: 12
        status: UPCOMING
        isDisplayable: true
      ) {
        edges {
          node {
            ...CellShow_show
            internalID
          }
        }
      }
    }
  `,
})
