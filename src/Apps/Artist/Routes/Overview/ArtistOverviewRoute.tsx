import { Spacer } from "@artsy/palette"
import { ArtistOverviewFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import type { ArtistOverviewRoute_artist$data } from "__generated__/ArtistOverviewRoute_artist.graphql"
import type * as React from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistOverviewRouteProps {
  artist: ArtistOverviewRoute_artist$data
}

const ArtistOverviewRoute: React.FC<
  React.PropsWithChildren<ArtistOverviewRouteProps>
> = ({ artist }) => {
  const { title, description } = artist.meta

  return (
    <>
      <Title>{title}</Title>
      <Meta name="title" content={title} />
      <Meta name="description" content={description} />

      <Spacer y={[2, 0]} />

      <ArtistOverviewFragmentContainer artist={artist} />
    </>
  )
}

export const ArtistOverviewRouteFragmentContainer = createFragmentContainer(
  ArtistOverviewRoute,
  {
    artist: graphql`
      fragment ArtistOverviewRoute_artist on Artist {
        ...ArtistOverview_artist
        internalID
        href
        meta(page: ABOUT) {
          description
          title
        }
      }
    `,
  },
)
