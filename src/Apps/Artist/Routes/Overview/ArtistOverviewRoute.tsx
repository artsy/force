import { Flex, Spacer } from "@artsy/palette"
import * as React from "react"
import { Title, Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistRelatedGeneCategoriesQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistRelatedGeneCategories"
import { ArtistCareerHighlightsQueryRenderer } from "./Components/ArtistCareerHighlights"
import { ArtistCurrentShowsRailQueryRenderer } from "./Components/ArtistCurrentShowsRail"
import { ArtistRelatedArtistsRailQueryRenderer } from "./Components/ArtistRelatedArtistsRail"
import { ArtistSeriesRailQueryRenderer } from "Components/ArtistSeriesRail/ArtistSeriesRail"
import { ArtistOverviewRoute_artist$data } from "__generated__/ArtistOverviewRoute_artist.graphql"
import { ArtistEditorialNewsGridQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistEditorialNewsGrid"
import { ArtistOverviewEmpty } from "Apps/Artist/Routes/Overview/Components/ArtistOverviewEmpty"
import { extractNodes } from "Utils/extractNodes"

interface ArtistOverviewRouteProps {
  artist: ArtistOverviewRoute_artist$data
}

const ArtistOverviewRoute: React.FC<ArtistOverviewRouteProps> = ({
  artist,
}) => {
  const { title, description } = artist.meta

  const hasFeaturedWorks =
    extractNodes(artist.filterArtworksConnection).length > 0
  const hasCareerHighlights = artist.insights.length > 0
  // If totalCount is null or undefined default to 0
  const hasArtistSeries = artist.artistSeriesConnection?.totalCount ?? 0 > 0
  const hasEditorial = artist.articlesConnection?.totalCount ?? 0 > 0
  const hasCurrentShows = artist.showsConnection?.totalCount ?? 0 > 0

  if (
    !hasFeaturedWorks &&
    !hasCareerHighlights &&
    !hasArtistSeries &&
    !hasEditorial &&
    !hasCurrentShows
  ) {
    return <ArtistOverviewEmpty />
  }

  return (
    <>
      <Title>{title}</Title>
      <Meta name="title" content={title} />
      <Meta name="description" content={description} />

      <Spacer y={[2, 0]} />

      <Flex flexDirection="column" gap={6}>
        <ArtistCareerHighlightsQueryRenderer id={artist.internalID} />

        <ArtistSeriesRailQueryRenderer
          id={artist.internalID}
          title={`${artist.name} Series`}
        />

        <ArtistEditorialNewsGridQueryRenderer id={artist.internalID} />

        <ArtistCurrentShowsRailQueryRenderer id={artist.internalID} />

        <ArtistRelatedArtistsRailQueryRenderer slug={artist.internalID} />

        <ArtistRelatedGeneCategoriesQueryRenderer slug={artist.internalID} />
      </Flex>
    </>
  )
}

export const ArtistOverviewRouteFragmentContainer = createFragmentContainer(
  ArtistOverviewRoute,
  {
    artist: graphql`
      fragment ArtistOverviewRoute_artist on Artist {
        internalID
        name
        filterArtworksConnection(first: 1) {
          edges {
            node {
              internalID
            }
          }
        }
        insights {
          __typename
        }
        artistSeriesConnection(first: 0) {
          totalCount
        }
        articlesConnection(first: 0) {
          totalCount
        }
        showsConnection(first: 0, status: "running") {
          totalCount
        }
        meta(page: ABOUT) {
          description
          title
        }
        counts {
          artworks
        }
      }
    `,
  }
)
