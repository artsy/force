import { Col, Row, Separator } from "@artsy/palette"
import { Works_artist } from "v2/__generated__/Works_artist.graphql"
import { ArtistArtworkFilterRefetchContainer as ArtworkFilter } from "v2/Apps/Artist/Routes/Overview/Components/ArtistArtworkFilter"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "v2/Apps/Artist/Routes/Overview/Components/ArtistRecommendations"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "v2/Apps/Artist/Components/ArtistTopWorksRail/ArtistTopWorksRail"
import { ArtistSeriesRailFragmentContainer as ArtistSeriesRail } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"
import { ContextModule } from "@artsy/cohesion"
import { ArtistCollectionsRailContent as ArtistCollectionsRail } from "v2/Apps/Artist/Components/ArtistCollectionsRail"

export interface WorksRouteProps {
  artist: Works_artist
}

export const WorksRoute: React.FC<WorksRouteProps> = props => {
  const { artist } = props
  const { sidebarAggregations } = artist

  const isClient = typeof window !== "undefined"
  const showRecommendations =
    isClient &&
    get(artist, a => a.related.artistsConnection.edges.length, 0) > 0

  const hasArtistSeries =
    get(artist, a => a.artistSeriesConnection.edges.length, 0) > 0

  return (
    <>
      <ArtistTopWorksRail artist={artist} />

      {hasArtistSeries ? (
        <ArtistSeriesRail
          mt={3}
          pt={2}
          borderTop="1px solid"
          borderColor="black10"
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
        acquireable: { type: "Boolean" }
        aggregations: { type: "[ArtworkAggregation]" }
        artistID: { type: "String" }
        atAuction: { type: "Boolean" }
        attributionClass: { type: "[String]" }
        color: { type: "String" }
        forSale: { type: "Boolean" }
        height: { type: "String" }
        inquireableOnly: { type: "Boolean" }
        keyword: { type: "String" }
        majorPeriods: { type: "[String]" }
        medium: { type: "String", defaultValue: "*" }
        offerable: { type: "Boolean" }
        page: { type: "Int" }
        partnerID: { type: "ID" }
        priceRange: { type: "String" }
        sizes: { type: "[ArtworkSizes]" }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        width: { type: "String" }
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
      ...ArtistSeriesRail_artist

      related {
        artistsConnection(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }

      sidebarAggregations: filterArtworksConnection(
        sort: $sort
        page: $page
        aggregations: $aggregations
        first: 30
        after: ""
      ) {
        aggregations {
          slice
          counts {
            name
            value
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
      ...ArtistArtworkFilter_artist
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          artistID: $artistID
          atAuction: $atAuction
          attributionClass: $attributionClass
          color: $color
          forSale: $forSale
          height: $height
          inquireableOnly: $inquireableOnly
          keyword: $keyword
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          partnerID: $partnerID
          priceRange: $priceRange
          sizes: $sizes
          sort: $sort
          width: $width
        )
    }
  `,
})

// Top-level route needs to be exported for bundle splitting in the router
export default WorksRouteFragmentContainer
