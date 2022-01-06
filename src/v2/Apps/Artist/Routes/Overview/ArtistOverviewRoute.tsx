import { Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistIconicCollectionsRailQueryRenderer } from "v2/Apps/Artist/Routes/Overview/Components/ArtistIconicCollectionsRail"
import { ArtistNotableWorksRailQueryRenderer } from "v2/Apps/Artist/Routes/Overview/Components/ArtistNotableWorksRail"
import { ArtistWorksForSaleRailQueryRenderer } from "./Components/ArtistWorksForSaleRail"
import { ArtistCurrentShowsRailQueryRenderer } from "./Components/ArtistCurrentShowsRail"
import { ArtistCurrentArticlesRailQueryRenderer } from "./Components/ArtistCurrentArticlesRail"
import { ArtistCareerHighlightsQueryRenderer } from "./Components/ArtistCareerHighlights"
import { ArtistRelatedArtistsRailQueryRenderer } from "./Components/ArtistRelatedArtistsRail"
import { ArtistSellWithArtsyQueryRenderer } from "./Components/ArtistSellWithArtsy"
import { computeTitle } from "../../Utils/computeTitle"

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
