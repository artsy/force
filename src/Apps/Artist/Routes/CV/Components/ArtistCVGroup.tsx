import { groupBy } from "lodash"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { ArtistCVGroup_artist$data } from "__generated__/ArtistCVGroup_artist.graphql"
import { Text, Box, GridColumns, Column, Button } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useState, Fragment, FC } from "react"
import { useTranslation } from "react-i18next"

const REFETCH_PAGE_SIZE = 10

interface ArtistCVGroupProps {
  artist: ArtistCVGroup_artist$data
  relay: RelayPaginationProp
  title: string
}

const ArtistCVGroup: FC<ArtistCVGroupProps> = ({ artist, relay, title }) => {
  const { t } = useTranslation()

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
    return (
      <GridColumns>
        <Column span={12}>
          <Text variant="lg-display">{title}</Text>
        </Column>

        <Column span={8} start={4}>
          <Text variant="sm-display">
            {t("artistPage.cv.emptyState", { groupName: title.toLowerCase() })}
          </Text>
        </Column>
      </GridColumns>
    )
  }

  const groupedByYear = groupBy(nodes, show => show.startAt)

  return (
    <GridColumns>
      {Object.keys(groupedByYear)
        .sort()
        .reverse()
        .map((year, index) => {
          const isFirst = index === 0
          const yearGroup = groupedByYear[year]

          return (
            <Fragment key={index}>
              <Column span={12}>
                {isFirst && <Text variant="lg-display">{title}</Text>}
              </Column>

              <Column span={1} start={4}>
                <Text variant="sm-display">{year}</Text>
              </Column>

              <Column span={8}>
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
            </Fragment>
          )
        })}

      {hasMore && (
        <Column start={5} span={8}>
          <Button
            variant="primaryGray"
            size="small"
            loading={isLoading}
            onClick={loadMore}
          >
            Load More
          </Button>
        </Column>
      )}
    </GridColumns>
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
          soloShow: { type: "Boolean" }
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
