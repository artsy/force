import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Box, Separator } from "@artsy/palette"

import { SystemContext } from "v2/Artsy"
import { Footer } from "v2/Components/Footer"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesApp_artistSeries } from "v2/__generated__/ArtistSeriesApp_artistSeries.graphql"
import { ArtistSeriesHeaderFragmentContainer as ArtistSeriesHeader } from "./Components/ArtistSeriesHeader"
import { ArtistSeriesArtworksFilterRefetchContainer as ArtistSeriesArtworksFilter } from "./Components/ArtistSeriesArtworksFilter"
import { userHasLabFeature } from "v2/Utils/user"
import { ErrorPage } from "v2/Components/ErrorPage"
import { ArtistSeriesRailFragmentContainer as OtherArtistSeriesRail } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"

interface ArtistSeriesAppProps {
  artistSeries: ArtistSeriesApp_artistSeries
}

const ArtistSeriesApp: React.FC<ArtistSeriesAppProps> = ({ artistSeries }) => {
  const { user } = React.useContext(SystemContext)
  const isEnabled = userHasLabFeature(user, "Artist Series")

  if (isEnabled && artistSeries) {
    const { railArtist } = artistSeries
    return (
      <AppContainer maxWidth="100%">
        <ArtistSeriesHeader artistSeries={artistSeries} />
        <Box m={3}>
          <ArtistSeriesArtworksFilter artistSeries={artistSeries} />
          <Separator mt={6} mb={3} />
          {railArtist.length && (
            <OtherArtistSeriesRail artist={railArtist[0]} />
          )}
          <Separator mt={6} mb={3} />
          <Footer />
        </Box>
      </AppContainer>
    )
  } else {
    return <ErrorPage code={404} />
  }
}

export default createFragmentContainer(ArtistSeriesApp, {
  artistSeries: graphql`
    fragment ArtistSeriesApp_artistSeries on ArtistSeries
      @argumentDefinitions(
        acquireable: { type: "Boolean" }
        aggregations: { type: "[ArtworkAggregation]" }
        atAuction: { type: "Boolean" }
        attributionClass: { type: "[String]" }
        color: { type: "String" }
        forSale: { type: "Boolean" }
        height: { type: "String" }
        inquireableOnly: { type: "Boolean" }
        keyword: { type: "String" }
        majorPeriods: { type: "[String]" }
        medium: { type: "String", defaultValue: "*" }
        offerable: { type: "Boolean" }
        page: { type: "Int" }
        partnerID: { type: "ID" }
        priceRange: { type: "String" }
        sizes: { type: "[ArtworkSizes]" }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        width: { type: "String" }
      ) {
      ...ArtistSeriesHeader_artistSeries
      railArtist: artists(size: 1) {
        ...ArtistSeriesRail_artist
      }
      ...ArtistSeriesArtworksFilter_artistSeries
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          atAuction: $atAuction
          attributionClass: $attributionClass
          color: $color
          forSale: $forSale
          height: $height
          inquireableOnly: $inquireableOnly
          keyword: $keyword
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          partnerID: $partnerID
          priceRange: $priceRange
          sizes: $sizes
          sort: $sort
          width: $width
        )
    }
  `,
})
