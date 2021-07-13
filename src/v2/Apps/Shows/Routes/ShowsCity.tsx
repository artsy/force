import {
  Join,
  Spacer,
  Column,
  GridColumns,
  Text,
  Sup,
  Message,
} from "@artsy/palette"
import React, { useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowsHeaderFragmentContainer } from "../Components/ShowsHeader"
import { ShowsCity_viewer } from "v2/__generated__/ShowsCity_viewer.graphql"
import { ShowsCity_city } from "v2/__generated__/ShowsCity_city.graphql"
import { ShowsMeta } from "../Components/ShowsMeta"
import { ShowsFeaturedShowFragmentContainer } from "../Components/ShowsFeaturedShow"
import moment from "moment"
import { extractNodes } from "v2/Utils/extractNodes"
import { FragmentRefs } from "relay-runtime"

interface ShowsCityProps {
  viewer: ShowsCity_viewer
  city: ShowsCity_city
}

type Shows = {
  internalID: string
  startAt: string | null
  " $fragmentRefs": FragmentRefs<"ShowsFeaturedShow_show">
}[]

export const ShowsCity: React.FC<ShowsCityProps> = ({ viewer, city }) => {
  const currentShows = extractNodes(city.currentShows)
  const pastShows = extractNodes(city.pastShows)

  const [openingThisWeek, upcomingShows] = useMemo(() => {
    return extractNodes(city.upcomingShows).reduce(
      ([openingThisWeek, upcomingShows]: [Shows, Shows], show) => {
        // Split upcomingShows into shows opening this week...
        if (moment(show.startAt!).isBefore(moment().add(7, "days"))) {
          return [[...openingThisWeek, show], upcomingShows]
        }

        // ...and the remainder
        return [openingThisWeek, [...upcomingShows, show]]
      },
      [[], []]
    )
  }, [city.upcomingShows])

  return (
    <>
      <ShowsMeta cityName={city.name} />

      <Spacer mt={4} />

      <Join separator={<Spacer mt={6} />}>
        {openingThisWeek.length > 0 && (
          <>
            <Text as="h2" variant="xl">
              Opening This Week in {city.name}
              {openingThisWeek.length > 0 && (
                <>
                  &nbsp;
                  <Sup color="brand">{openingThisWeek.length}</Sup>
                </>
              )}
            </Text>

            <GridColumns gridRowGap={4}>
              {openingThisWeek.map(show => {
                return (
                  <Column key={show.internalID} span={4}>
                    <ShowsFeaturedShowFragmentContainer
                      show={show}
                      size="small"
                    />
                  </Column>
                )
              })}
            </GridColumns>
          </>
        )}

        <Text as="h2" variant="xl">
          Current Shows in {city.name}
          {(city.currentShows?.totalCount ?? 0) > 0 && (
            <>
              &nbsp;
              <Sup color="brand">{city.currentShows?.totalCount}</Sup>
            </>
          )}
        </Text>

        {currentShows.length === 0 && (
          <Message>
            There are currently no shows in {city.name} on Artsy
          </Message>
        )}

        {currentShows.length > 0 && (
          <GridColumns gridRowGap={4}>
            {currentShows.map(show => {
              return (
                <Column key={show.internalID} span={4}>
                  <ShowsFeaturedShowFragmentContainer
                    show={show}
                    size="small"
                  />
                </Column>
              )
            })}
          </GridColumns>
        )}

        {/* TODO: Pagination */}

        {upcomingShows.length > 0 && (
          <>
            <Text as="h2" variant="xl">
              Upcoming Shows
            </Text>

            <GridColumns gridRowGap={4}>
              {upcomingShows.map(show => {
                return (
                  <Column key={show.internalID} span={4}>
                    <ShowsFeaturedShowFragmentContainer
                      show={show}
                      size="small"
                    />
                  </Column>
                )
              })}
            </GridColumns>
          </>
        )}

        {openingThisWeek.length + upcomingShows.length + currentShows.length <
          6 &&
          pastShows.length > 0 && (
            <>
              <Text as="h2" variant="xl">
                Past Shows in {city.name}
              </Text>

              <GridColumns gridRowGap={4}>
                {pastShows.map(show => {
                  return (
                    <Column key={show.internalID} span={4}>
                      <ShowsFeaturedShowFragmentContainer
                        show={show}
                        size="small"
                      />
                    </Column>
                  )
                })}
              </GridColumns>
            </>
          )}

        <ShowsHeaderFragmentContainer viewer={viewer} />
      </Join>
    </>
  )
}

export const ShowsCityFragmentContainer = createFragmentContainer(ShowsCity, {
  viewer: graphql`
    fragment ShowsCity_viewer on Viewer {
      ...ShowsHeader_viewer
    }
  `,
  city: graphql`
    fragment ShowsCity_city on City {
      name
      upcomingShows: showsConnection(first: 18, status: UPCOMING) {
        edges {
          node {
            internalID
            startAt
            ...ShowsFeaturedShow_show
          }
        }
      }
      currentShows: showsConnection(first: 18, status: CURRENT) {
        totalCount
        edges {
          node {
            internalID
            ...ShowsFeaturedShow_show
          }
        }
      }
      pastShows: showsConnection(first: 18, status: CLOSED) {
        edges {
          node {
            internalID
            ...ShowsFeaturedShow_show
          }
        }
      }
    }
  `,
})
