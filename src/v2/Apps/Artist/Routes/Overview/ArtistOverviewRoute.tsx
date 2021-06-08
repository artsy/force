import { Join, Spacer } from "@artsy/palette"
import React from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistIconicCollectionsRailQueryRenderer } from "v2/Apps/Artist/Routes/Overview/Components/IconicCollectionsRail/ArtistIconicCollectionsRail"
import { ArtistNotableWorksRailFragmentContainer } from "v2/Apps/Artist/Routes/Overview/Components/ArtistNotableWorksRail"
import { ArtistWorksForSaleRailFragmentContainer } from "./Components/ArtistWorksForSaleRail"
import { ArtistCurrentShowsRailFragmentContainer } from "./Components/ArtistCurrentShowsRail"
import { ArtistCurrentArticlesRailFragmentContainer } from "./Components/ArtistCurrentArticlesRail"
import { ArtistCareerHighlightsFragmentContainer } from "./Components/ArtistCareerHighlights"
import { ArtistRelatedArtistsRailFragmentContainer } from "./Components/ArtistRelatedArtistsRail"
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
        <ArtistNotableWorksRailFragmentContainer artist={artist} />
        <ArtistCareerHighlightsFragmentContainer artist={artist} />
        <ArtistIconicCollectionsRailQueryRenderer
          artistID={artist.internalID}
        />
        <ArtistWorksForSaleRailFragmentContainer artist={artist} />
        <ArtistCurrentShowsRailFragmentContainer artist={artist} />
        <ArtistCurrentArticlesRailFragmentContainer artist={artist} />
        <ArtistRelatedArtistsRailFragmentContainer artist={artist} />
      </Join>
    </>
  )
}

export const ArtistOverviewRouteFragmentContainer = createFragmentContainer(
  ArtistOverviewRoute,
  {
    artist: graphql`
      fragment ArtistOverviewRoute_artist on Artist {
        ...ArtistNotableWorksRail_artist
        ...ArtistCareerHighlights_artist
        ...ArtistWorksForSaleRail_artist
        ...ArtistCurrentShowsRail_artist
        ...ArtistCurrentArticlesRail_artist
        ...ArtistRelatedArtistsRail_artist

        name
        counts {
          artworks
        }
        internalID
      }
    `,
  }
)
