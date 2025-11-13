import { ArtistSeriesArtworkFilterQueryRenderer } from "Apps/ArtistSeries/Components/ArtistSeriesArtworksFilter"
import { ArtistSeriesRailFragmentContainer as OtherArtistSeriesRail } from "Components/ArtistSeriesRail/ArtistSeriesRail"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { ContextModule } from "@artsy/cohesion"
import { Spacer } from "@artsy/palette"
import type { ArtistSeriesApp_artistSeries$data } from "__generated__/ArtistSeriesApp_artistSeries.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesHeaderFragmentContainer as ArtistSeriesHeader } from "./Components/ArtistSeriesHeader"
import { ArtistSeriesMetaFragmentContainer as ArtistSeriesMeta } from "./Components/ArtistSeriesMeta"

interface ArtistSeriesAppProps {
  artistSeries: ArtistSeriesApp_artistSeries$data
}

const ArtistSeriesApp: React.FC<
  React.PropsWithChildren<ArtistSeriesAppProps>
> = ({ artistSeries }) => {
  const { railArtist, internalID } = artistSeries

  return (
    <Analytics contextPageOwnerId={internalID}>
      <ArtistSeriesMeta artistSeries={artistSeries} />

      <ArtistSeriesHeader artistSeries={artistSeries} />

      <Spacer y={6} />

      <ArtistSeriesArtworkFilterQueryRenderer />

      {(railArtist?.length ?? 0) > 0 && (
        <>
          <Spacer y={6} />

          <OtherArtistSeriesRail
            artist={(railArtist ?? [])[0]}
            title="Series by this artist"
            contextModule={ContextModule.moreSeriesByThisArtist}
          />
        </>
      )}
    </Analytics>
  )
}

export const ArtistSeriesAppFragmentContainer = createFragmentContainer(
  ArtistSeriesApp,
  {
    artistSeries: graphql`
      fragment ArtistSeriesApp_artistSeries on ArtistSeries {
        ...ArtistSeriesMeta_artistSeries
        ...ArtistSeriesHeader_artistSeries
        railArtist: artists(size: 1) {
          ...ArtistSeriesRail_artist
        }
        internalID
        slug
      }
    `,
  }
)
