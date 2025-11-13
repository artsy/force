import { ArtistTabs } from "Apps/Artist/Components/ArtistTabs"
import { ArtistOverviewFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { Spacer } from "@artsy/palette"
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

      <ArtistTabs slug={artist.slug} />

      <Spacer y={[2, 4]} />

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
        slug
        href
        meta(page: ABOUT) {
          description
          title
        }
      }
    `,
  }
)
