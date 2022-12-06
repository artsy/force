import { Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { computeTitle } from "Apps/Artist/Utils/computeTitle"
import loadable from "@loadable/component"
import { ArtistRelatedGeneCategoriesQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistRelatedGeneCategories"

const ArtistIconicCollectionsRailQueryRenderer = loadable(
  () => import("./Components/ArtistIconicCollectionsRail"),
  {
    resolveComponent: component =>
      component.ArtistIconicCollectionsRailQueryRenderer,
  }
)
const ArtistFeaturedWorksRailQueryRenderer = loadable(
  () => import("./Components/ArtistFeaturedWorksRail"),
  {
    resolveComponent: component =>
      component.ArtistFeaturedWorksRailQueryRenderer,
  }
)
const ArtistWorksForSaleRailQueryRenderer = loadable(
  () => import("./Components/ArtistWorksForSaleRail"),
  {
    resolveComponent: component =>
      component.ArtistWorksForSaleRailQueryRenderer,
  }
)
const ArtistCurrentShowsRailQueryRenderer = loadable(
  () => import("./Components/ArtistCurrentShowsRail"),
  {
    resolveComponent: component =>
      component.ArtistCurrentShowsRailQueryRenderer,
  }
)
const ArtistCurrentArticlesRailQueryRenderer = loadable(
  () => import("./Components/ArtistCurrentArticlesRail"),
  {
    resolveComponent: component =>
      component.ArtistCurrentArticlesRailQueryRenderer,
  }
)
const ArtistCareerHighlightsQueryRenderer = loadable(
  () => import("./Components/ArtistCareerHighlights"),
  {
    resolveComponent: component =>
      component.ArtistCareerHighlightsQueryRenderer,
  }
)
const ArtistRelatedArtistsRailQueryRenderer = loadable(
  () => import("./Components/ArtistRelatedArtistsRail"),
  {
    resolveComponent: component =>
      component.ArtistRelatedArtistsRailQueryRenderer,
  }
)
const ArtistSellWithArtsyQueryRenderer = loadable(
  () => import("./Components/ArtistSellWithArtsy"),
  {
    resolveComponent: component => component.ArtistSellWithArtsyQueryRenderer,
  }
)

interface ArtistOverviewRouteProps {
  artist: any
}

const ArtistOverviewRoute: React.FC<ArtistOverviewRouteProps> = ({
  artist,
}) => {
  const title = computeTitle(artist.name, artist.counts.artworks)

  return (
    <>
      <Title>{title}</Title>

      <Join separator={<Spacer y={6} />}>
        <ArtistFeaturedWorksRailQueryRenderer slug={artist.slug} />
        <ArtistCareerHighlightsQueryRenderer slug={artist.slug} />
        <ArtistSellWithArtsyQueryRenderer slug={artist.slug} />
        <ArtistIconicCollectionsRailQueryRenderer
          internalID={artist.internalID}
        />
        <ArtistWorksForSaleRailQueryRenderer slug={artist.slug} />
        <ArtistCurrentShowsRailQueryRenderer slug={artist.slug} />
        <ArtistCurrentArticlesRailQueryRenderer slug={artist.slug} />
        <ArtistRelatedArtistsRailQueryRenderer slug={artist.slug} />
        <ArtistRelatedGeneCategoriesQueryRenderer slug={artist.slug} />
      </Join>
    </>
  )
}

export const ArtistOverviewRouteFragmentContainer = createFragmentContainer(
  ArtistOverviewRoute,
  {
    artist: graphql`
      fragment ArtistOverviewRoute_artist on Artist {
        slug
        name
        counts {
          artworks
        }
        internalID
      }
    `,
  }
)
