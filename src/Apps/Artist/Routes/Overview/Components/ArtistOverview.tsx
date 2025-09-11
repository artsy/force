import { Stack } from "@artsy/palette"
import { ArtistSeriesRailQueryRenderer } from "Components/ArtistSeriesRail/ArtistSeriesRail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtistOverviewQueryRendererQuery } from "__generated__/ArtistOverviewQueryRendererQuery.graphql"
import type { ArtistOverview_artist$data } from "__generated__/ArtistOverview_artist.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCareerHighlightsQueryRenderer } from "./ArtistCareerHighlights"
import { ArtistCurrentShowsRailQueryRenderer } from "./ArtistCurrentShowsRail"
import { ArtistEditorialNewsGridQueryRenderer } from "./ArtistEditorialNewsGrid"
import { ArtistOverviewEmpty } from "./ArtistOverviewEmpty"
import { ArtistRelatedArtistsRailQueryRenderer } from "./ArtistRelatedArtistsRail"
import { ArtistRelatedGeneCategoriesQueryRenderer } from "./ArtistRelatedGeneCategories"

type ArtistOverviewQueryRendererProps = {
  id: string
  lazyLoad?: boolean
}

export const ArtistOverviewQueryRenderer: React.FC<
  ArtistOverviewQueryRendererProps
> = ({ id, lazyLoad }) => {
  return (
    <SystemQueryRenderer<ArtistOverviewQueryRendererQuery>
      lazyLoad={lazyLoad}
      query={graphql`
        query ArtistOverviewQueryRendererQuery($artistID: String!) @cacheable {
          artist(id: $artistID) {
            ...ArtistOverview_artist
          }
        }
      `}
      variables={{ artistID: id }}
      render={({ error, props }) => {
        if (error) {
          console.error("[ArtistOverview]: Error loading overview", error)
          return null
        }

        if (!props || !props.artist) return null
        return <ArtistOverviewFragmentContainer artist={props.artist} />
      }}
    />
  )
}

interface ArtistOverviewProps {
  artist: ArtistOverview_artist$data
}

export const ArtistOverview: React.FC<
  React.PropsWithChildren<ArtistOverviewProps>
> = ({ artist }) => {
  const hasCareerHighlights =
    Array.isArray(artist.insights) && artist.insights.length > 0
  const hasArtistSeries = (artist.artistSeriesConnection?.totalCount ?? 0) > 0
  const hasEditorial = (artist.counts?.articles ?? 0) > 0
  const hasCurrentShows = (artist.showsConnection?.totalCount ?? 0) > 0
  const hasRelatedArtists = (artist.counts?.relatedArtists ?? 0) > 0
  const hasRelatedCategories =
    Array.isArray(artist.related?.genes?.edges) &&
    artist.related.genes.edges.length > 0

  if (
    !hasCareerHighlights &&
    !hasArtistSeries &&
    !hasEditorial &&
    !hasCurrentShows &&
    !hasRelatedArtists &&
    !hasRelatedCategories
  ) {
    return <ArtistOverviewEmpty />
  }

  return (
    <Stack gap={6}>
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
    </Stack>
  )
}

export const ArtistOverviewFragmentContainer = createFragmentContainer(
  ArtistOverview,
  {
    artist: graphql`
      fragment ArtistOverview_artist on Artist {
        internalID
        name
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
          relatedArtists
          articles
        }
        related {
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
