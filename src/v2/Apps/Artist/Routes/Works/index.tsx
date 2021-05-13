import { Col, Row, Separator } from "@artsy/palette"
import { Works_artist } from "v2/__generated__/Works_artist.graphql"
import { ArtistArtworkFilterRefetchContainer as ArtworkFilter } from "v2/Apps/Artist/Routes/Overview/Components/ArtistArtworkFilter"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "v2/Apps/Artist/Routes/Overview/Components/ArtistRecommendations"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "v2/Apps/Artist/Components/ArtistTopWorksRail/ArtistTopWorksRail"
import { V2ArtistSeriesRailFragmentContainer as ArtistSeriesRail } from "../../Components/ArtistSeriesRail/V2ArtistSeriesRail"
import { ContextModule } from "@artsy/cohesion"
import { ArtistCollectionsRailContent as ArtistCollectionsRail } from "v2/Apps/Artist/Components/ArtistCollectionsRail"
import { Title } from "react-head"
import { computeTitle } from "../../Utils/computeTitle"

export interface WorksRouteProps {
  artist: Works_artist
}

export const WorksRoute: React.FC<WorksRouteProps> = props => {
  const { artist } = props
  const { sidebarAggregations } = artist

  const isClient = typeof window !== "undefined"
  const showRecommendations =
    isClient &&
    // @ts-expect-error STRICT_NULL_CHECK
    get(artist, a => a.related.artistsConnection.edges.length, 0) > 0

  const hasArtistSeries =
    // @ts-expect-error STRICT_NULL_CHECK
    get(artist, a => a.artistSeriesConnection.edges.length, 0) > 0

  // @ts-expect-error STRICT_NULL_CHECK
  const titleString = computeTitle(artist.name, artist.counts.forSaleArtworks)

  return (
    <>
      <Title>{titleString}</Title>
      <ArtistTopWorksRail artist={artist} />

      {hasArtistSeries ? (
        <ArtistSeriesRail
          mt={3}
          pt={2}
          borderTop="1px solid"
          borderColor="black10"
          // @ts-expect-error STRICT_NULL_CHECK
          artist={artist}
          contextModule={ContextModule.artistSeriesRail}
        />
      ) : (
        <ArtistCollectionsRail artistID={artist.internalID} />
      )}

      <Row mt={3}>
        <Col>
          <span id="jump--artistArtworkGrid" />

          <ArtworkFilter
            artist={artist}
            sidebarAggregations={sidebarAggregations}
          />
        </Col>
      </Row>

      {showRecommendations && (
        <Row>
          <Col>
            <Separator mt={6} mb={4} />
            <ArtistRecommendations artistID={artist.internalID} />
          </Col>
        </Row>
      )}
    </>
  )
}

export const WorksRouteFragmentContainer = createFragmentContainer(WorksRoute, {
  artist: graphql`
    fragment Works_artist on Artist
      @argumentDefinitions(
        input: { type: "FilterArtworksInput" }
        sort: { type: "String" }
        page: { type: "Int" }
        aggregations: { type: "[ArtworkAggregation]" }
      ) {
      internalID
      slug

      ...ArtistTopWorksRail_artist

      # The below fragment is used for an exist-y check.
      # Since it repeats the 'artistSeriesConnection' selection
      # from the component that actually renders it ('ArtistSeriesRail'),
      # keep the arguments the same ('first: 50').
      artistSeriesConnection(first: 50) {
        edges {
          node {
            internalID
          }
        }
      }

      ...V2ArtistSeriesRail_artist

      related {
        artistsConnection(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }

      name
      counts {
        forSaleArtworks
      }

      sidebarAggregations: filterArtworksConnection(
        sort: $sort
        page: $page
        aggregations: $aggregations
        first: 1
        after: ""
      ) {
        aggregations {
          slice
          counts {
            name
            value
            count
          }
        }
        # FIXME: Might need to reenable the below.
        # Include the below fragment so that this will match
        # the initial load (w/ no filter applied), and thus MP
        # will consolidate aggregations _and_ the grid into one call.
        # Leave out this fragment if navigating to the artist page
        # with a filter applied, as those can't be consolidated and
        # this is extra data.
        # artworks_connection: artworksConnection(first: 30, after: "")
        #   @skip(if: $hasFilter) {
        #   edges {
        #     node {
        #       slug
        #     }
        #   }
        # }
      }
      ...ArtistArtworkFilter_artist @arguments(input: $input)
    }
  `,
})
