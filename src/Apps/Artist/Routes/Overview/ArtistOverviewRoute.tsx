import { Join, Spacer } from "@artsy/palette"
import { ArtistEditorialNewsGridQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistEditorialNewsGrid"
import { ArtistMetaFragmentContainer } from "Apps/Artist/Components/ArtistMeta/ArtistMeta"
import { ArtistOverviewEmpty } from "Apps/Artist/Routes/Overview/Components/ArtistOverviewEmpty"
import { ArtistRelatedGeneCategoriesQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistRelatedGeneCategories"
import { ArtistSeriesRailQueryRenderer } from "Components/ArtistSeriesRail/ArtistSeriesRail"
import type { ArtistOverviewRoute_artist$data } from "__generated__/ArtistOverviewRoute_artist.graphql"
import type * as React from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlightsQueryRenderer } from "./Components/ArtistCareerHighlights"
import { ArtistCurrentShowsRailQueryRenderer } from "./Components/ArtistCurrentShowsRail"
import { ArtistRelatedArtistsRailQueryRenderer } from "./Components/ArtistRelatedArtistsRail"

interface ArtistOverviewRouteProps {
  artist: ArtistOverviewRoute_artist$data
}

const ArtistOverviewRoute: React.FC<
  React.PropsWithChildren<ArtistOverviewRouteProps>
> = ({ artist }) => {
  const { title, description } = artist.meta

  const hasCareerHighlights = artist.insights.length > 0
  const hasArtistSeries = artist.artistSeriesConnection?.totalCount ?? 0 > 0
  const hasEditorial = artist.counts?.articles ?? 0 > 0
  const hasCurrentShows = artist.showsConnection?.totalCount ?? 0 > 0
  const hasRelatedArtists = artist.counts?.relatedArtists ?? 0 > 0
  const hasRelatedCategories = artist.related?.genes?.edges?.length ?? 0 > 0

  if (
    !hasCareerHighlights &&
    !hasArtistSeries &&
    !hasEditorial &&
    !hasCurrentShows &&
    !hasRelatedArtists &&
    !hasRelatedCategories
  ) {
    return (
      <>
        <ArtistMetaFragmentContainer artist={artist} />
        <Title>{title}</Title>
        <Meta name="title" content={title} />
        <Meta name="description" content={description} />

        <Spacer y={[2, 0]} />

        <ArtistOverviewEmpty />
      </>
    )
  }

  return (
    <>
      <ArtistMetaFragmentContainer artist={artist} />
      <Title>{title}</Title>
      <Meta name="title" content={title} />
      <Meta name="description" content={description} />

      <Spacer y={[2, 0]} />

      <Join separator={<Spacer y={6} />}>
        {hasCareerHighlights && (
          <ArtistCareerHighlightsQueryRenderer id={artist.internalID} />
        )}

        {hasArtistSeries && (
          <ArtistSeriesRailQueryRenderer
            id={artist.internalID}
            title={`${artist.name} Series`}
          />
        )}

        {hasEditorial && (
          <ArtistEditorialNewsGridQueryRenderer id={artist.internalID} />
        )}

        {hasCurrentShows && (
          <ArtistCurrentShowsRailQueryRenderer id={artist.internalID} />
        )}

        {hasRelatedArtists && (
          <ArtistRelatedArtistsRailQueryRenderer slug={artist.internalID} />
        )}

        {hasRelatedCategories && (
          <ArtistRelatedGeneCategoriesQueryRenderer slug={artist.internalID} />
        )}
      </Join>
    </>
  )
}

export const ArtistOverviewRouteFragmentContainer = createFragmentContainer(
  ArtistOverviewRoute,
  {
    artist: graphql`
      fragment ArtistOverviewRoute_artist on Artist {
        ...ArtistMeta_artist
        internalID
        name
        meta(page: ABOUT) {
          description
          title
        }
        insights {
          __typename
        }
        artistSeriesConnection(first: 0) {
          totalCount
        }
        showsConnection(first: 0, status: "running") {
          totalCount
        }
        counts {
          artworks
          relatedArtists
          articles
        }
        related {
          # Pagination is not correctly implemented so we can't use totalCount
          genes(first: 1) {
            edges {
              node {
                __typename
              }
            }
          }
        }
      }
    `,
  },
)
