import { groupBy } from "lodash"
import * as React from "react"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistCVGroup_artist } from "v2/__generated__/ArtistCVGroup_artist.graphql"
import {
  Text,
  Box,
  GridColumns,
  Column,
  Button,
  Spacer,
  Join,
} from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useState } from "react"

const REFETCH_PAGE_SIZE = 10

interface ArtistCVGroupProps {
  artist: ArtistCVGroup_artist
  relay: RelayPaginationProp
  title: string
}

const ArtistCVGroup: React.FC<ArtistCVGroupProps> = ({
  artist,
  relay,
  title,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const hasMore = artist.showsConnection?.pageInfo.hasNextPage

  const loadMore = () => {
    setIsLoading(true)

    relay.loadMore(REFETCH_PAGE_SIZE, error => {
      setIsLoading(false)

      if (error) {
        console.error(error)
      }
    })
  }

  const nodes = extractNodes(artist.showsConnection)

  if (nodes.length === 0) {
    return null
  }

  const groupedByYear = groupBy(nodes, show => show.startAt)

  return (
    <>
      <Join separator={<Spacer my={[1, 4]} />} data-test="artistCVGroup">
        {Object.keys(groupedByYear)
          .sort()
          .reverse()
          .map((year, index) => {
            const isFirst = index === 0
            const yearGroup = groupedByYear[year]

            return (
              <GridColumns key={index}>
                <Column span={2} mb={[2, 0]}>
                  {isFirst && <Text variant="lg-display">{title}</Text>}
                </Column>

                <Column span={2}>
                  <Text
                    variant="sm-display"
                    textAlign={["left", "right"]}
                    pr={[2, 4]}
                  >
                    {year}
                  </Text>
                </Column>

                <Column span={5}>
                  {yearGroup.map((show, yearKey) => {
                    return (
                      <Box mb={1} key={yearKey}>
                        <Text variant="sm-display" display="inline">
                          {show.href ? (
                            <RouterLink to={show.href}>{show.name}</RouterLink>
                          ) : (
                            <>{show.name}</>
                          )}

                          {show.partner && (
                            <>
                              ,{" "}
                              {show.partner.href ? (
                                <RouterLink to={show.partner.href}>
                                  {show.partner.name}
                                </RouterLink>
                              ) : (
                                <span>{show.partner.name}</span>
                              )}
                            </>
                          )}
                        </Text>
                      </Box>
                    )
                  })}
                </Column>
              </GridColumns>
            )
          })}
      </Join>

      {hasMore && (
        <GridColumns>
          <Column start={5}>
            <Button
              variant="secondaryGray"
              size="medium"
              my={1}
              loading={isLoading}
              onClick={loadMore}
            >
              Load More
            </Button>
          </Column>
        </GridColumns>
      )}
    </>
  )
}

export const ArtistCVGroupRefetchContainer = createPaginationContainer(
  ArtistCVGroup,
  {
    artist: graphql`
      fragment ArtistCVGroup_artist on Artist
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          sort: { type: "ShowSorts", defaultValue: START_AT_DESC }
          atAFair: { type: "Boolean", defaultValue: false }
          soloShow: { type: "Boolean", defaultValue: false }
          isReference: { type: "Boolean", defaultValue: true }
          visibleToPublic: { type: "Boolean", defaultValue: false }
        ) {
        slug
        showsConnection(
          first: $count
          after: $cursor
          sort: $sort
          atAFair: $atAFair
          soloShow: $soloShow
          isReference: $isReference
          visibleToPublic: $visibleToPublic
        ) @connection(key: "ArtistCVGroup_showsConnection") {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                  href
                }
              }
              name
              startAt(format: "YYYY")
              city
              href
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
        slug: props.artist.slug,
      }
    },
    query: graphql`
      query ArtistCVGroupQuery(
        $count: Int
        $cursor: String
        $slug: String!
        $sort: ShowSorts
        $atAFair: Boolean
        $soloShow: Boolean
        $isReference: Boolean
        $visibleToPublic: Boolean
      ) {
        artist(id: $slug) {
          ...ArtistCVGroup_artist
            @arguments(
              sort: $sort
              count: $count
              cursor: $cursor
              atAFair: $atAFair
              soloShow: $soloShow
              isReference: $isReference
              visibleToPublic: $visibleToPublic
            )
        }
      }
    `,
  }
)
