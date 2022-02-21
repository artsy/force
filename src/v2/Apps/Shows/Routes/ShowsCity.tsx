import {
  Join,
  Spacer,
  Column,
  GridColumns,
  Text,
  Sup,
  Message,
} from "@artsy/palette"
import { useMemo, useRef, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ShowsHeaderFragmentContainer } from "../Components/ShowsHeader"
import { ShowsCity_viewer$data } from "v2/__generated__/ShowsCity_viewer.graphql"
import { ShowsCity_city$data } from "v2/__generated__/ShowsCity_city.graphql"
import { ShowsMeta } from "../Components/ShowsMeta"
import { ShowsFeaturedShowFragmentContainer } from "../Components/ShowsFeaturedShow"
import { DateTime } from "luxon"
import { extractNodes } from "v2/Utils/extractNodes"
import { FragmentRefs } from "relay-runtime"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { useScrollTo } from "v2/Utils/Hooks/useScrollTo"

interface ShowsCityProps {
  viewer: ShowsCity_viewer$data
  city: ShowsCity_city$data
  relay: RelayRefetchProp
}

type Shows = {
  internalID: string
  startAt: string | null
  " $fragmentRefs": FragmentRefs<"ShowsFeaturedShow_show">
}[]

export const ShowsCity: React.FC<ShowsCityProps> = ({
  viewer,
  city,
  relay,
}) => {
  const currentShows = extractNodes(city.currentShows)
  const pastShows = extractNodes(city.pastShows)

  const [openingThisWeek, upcomingShows] = useMemo(() => {
    return extractNodes(city.upcomingShows).reduce(
      ([openingThisWeek, upcomingShows]: [Shows, Shows], show) => {
        // Split upcomingShows into shows opening this week...
        if (
          DateTime.fromISO(show.startAt!) < DateTime.local().plus({ day: 7 })
        ) {
          return [[...openingThisWeek, show], upcomingShows]
        }

        // ...and the remainder
        return [openingThisWeek, [...upcomingShows, show]]
      },
      [[], []]
    )
  }, [city.upcomingShows])

  const [loading, setLoading] = useState(false)

  const currentShowsRef = useRef<HTMLDivElement | null>(null)
  const { scrollTo } = useScrollTo({
    selectorOrRef: currentShowsRef,
    offset: 20,
  })

  const handleClick = (cursor: string, page: number) => {
    scrollTo()

    setLoading(true)

    relay.refetch(
      { slug: city.slug, first: 18, after: cursor, page: null },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        setLoading(false)

        window.history.replaceState({}, "", `?page=${page}`)
      }
    )
  }

  const handleNext = (page: number) => {
    if (!city.currentShows?.pageInfo) return

    const { hasNextPage, endCursor } = city.currentShows.pageInfo

    if (!(hasNextPage && endCursor)) return

    scrollTo()

    handleClick(endCursor, page)
  }

  return (
    <>
      <ShowsMeta cityName={city.name} />

      <Spacer mt={4} />

      <Join separator={<Spacer mt={6} />}>
        <ShowsHeaderFragmentContainer viewer={viewer} />

        {openingThisWeek.length > 0 && (
          <>
            <Text as="h2" variant="xl">
              {city.slug === "online"
                ? "Opening This Week"
                : `Opening This Week in ${city.name}`}

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

        <Text as="h2" variant="xl" ref={currentShowsRef as any}>
          {city.slug === "online"
            ? "Current Shows"
            : `Current Shows in ${city.name}`}

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
          <GridColumns
            gridRowGap={4}
            style={{ opacity: loading ? 0.5 : undefined }}
          >
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

        {city.currentShows?.pageCursors && (
          <PaginationFragmentContainer
            hasNextPage={!!city.currentShows.pageInfo.hasNextPage}
            pageCursors={city.currentShows.pageCursors}
            onClick={handleClick}
            onNext={handleNext}
          />
        )}

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

export const ShowsCityRefetchContainer = createRefetchContainer(
  ShowsCity,
  {
    viewer: graphql`
      fragment ShowsCity_viewer on Viewer {
        ...ShowsHeader_viewer
      }
    `,
    city: graphql`
      fragment ShowsCity_city on City
        @argumentDefinitions(after: { type: "String" }, page: { type: "Int" }) {
        name
        slug
        upcomingShows: showsConnection(
          first: 18
          status: UPCOMING
          sort: START_AT_ASC
        ) {
          edges {
            node {
              internalID
              startAt
              ...ShowsFeaturedShow_show
            }
          }
        }
        currentShows: showsConnection(
          first: 18
          status: RUNNING
          after: $after
          page: $page
          sort: END_AT_ASC
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
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
  },
  graphql`
    query ShowsCityQuery($slug: String!, $after: String, $page: Int) {
      city(slug: $slug) {
        ...ShowsCity_city @arguments(after: $after, page: $page)
      }
    }
  `
)
