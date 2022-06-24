import { Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { computeTitle } from "../../Utils/computeTitle"
import loadable from "@loadable/component"
import { ArtistRelatedCategoriesFragmentContainer } from "v2/Apps/Artist/Routes/Overview/Components/ArtistRelatedCategories"

const ArtistIconicCollectionsRailQueryRenderer = loadable(
  () => import("./Components/ArtistIconicCollectionsRail"),
  {
    resolveComponent: component =>
      component.ArtistIconicCollectionsRailQueryRenderer,
  }
)
const ArtistNotableWorksRailQueryRenderer = loadable(
  () => import("./Components/ArtistNotableWorksRail"),
  {
    resolveComponent: component =>
      component.ArtistNotableWorksRailQueryRenderer,
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

      <Join separator={<Spacer mb={6} />}>
        <ArtistNotableWorksRailQueryRenderer slug={artist.slug} />
        <ArtistCareerHighlightsQueryRenderer slug={artist.slug} />
        <ArtistSellWithArtsyQueryRenderer slug={artist.slug} />
        <ArtistIconicCollectionsRailQueryRenderer
          internalID={artist.internalID}
        />
        <ArtistWorksForSaleRailQueryRenderer slug={artist.slug} />
        <ArtistCurrentShowsRailQueryRenderer slug={artist.slug} />
        <ArtistCurrentArticlesRailQueryRenderer slug={artist.slug} />
        <ArtistRelatedArtistsRailQueryRenderer slug={artist.slug} />
        <ArtistRelatedCategoriesFragmentContainer artist={artist} />
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
        ...ArtistRelatedCategories_artist
      }
    `,
  }
)
