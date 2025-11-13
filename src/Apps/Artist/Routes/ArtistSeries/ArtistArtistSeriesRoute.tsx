import { CellArtistSeriesFragmentContainer } from "Components/Cells/CellArtistSeries"
import { EmptyState } from "Components/EmptyState"
import { extractNodes } from "Utils/extractNodes"
import { Jump } from "Utils/Hooks/useJump"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import type { ArtistArtistSeriesRoute_artist$data } from "__generated__/ArtistArtistSeriesRoute_artist.graphql"
import type { FC } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistArtistSeriesRouteProps {
  artist: ArtistArtistSeriesRoute_artist$data
}

const ArtistArtistSeriesRoute: FC<
  React.PropsWithChildren<ArtistArtistSeriesRouteProps>
> = ({ artist }) => {
  const artistSeries = extractNodes(artist.artistSeriesConnection)

  if (artistSeries.length === 0) {
    return (
      <EmptyState title="There aren’t any series available at this time." />
    )
  }

  return (
    <>
      <Title>{artist.meta.title}</Title>
      <Meta name="title" content={artist.meta.title} />
      <Meta name="description" content={artist.meta.description} />

      <Jump id="top" />

      <Text variant="xl">{artist.name} Series</Text>

      <Spacer y={6} />

      <GridColumns gridRowGap={[2, 4]}>
        {artistSeries.map(series => {
          return (
            <Column key={series.internalID} span={[6, 4, 3]}>
              <CellArtistSeriesFragmentContainer
                artistSeries={series}
                mode="GRID"
              />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const ArtistArtistSeriesRouteFragmentContainer = createFragmentContainer(
  ArtistArtistSeriesRoute,
  {
    artist: graphql`
      fragment ArtistArtistSeriesRoute_artist on Artist {
        internalID
        name
        slug
        meta(page: ARTIST_SERIES) {
          description
          title
        }
        artistSeriesConnection(first: 50) {
          edges {
            node {
              ...CellArtistSeries_artistSeries
              internalID
            }
          }
        }
      }
    `,
  }
)
