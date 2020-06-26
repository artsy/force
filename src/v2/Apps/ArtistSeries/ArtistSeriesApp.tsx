import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Box, Separator } from "@artsy/palette"

import { SystemContext } from "v2/Artsy"
import { Footer } from "v2/Components/Footer"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesApp_artistSeries } from "v2/__generated__/ArtistSeriesApp_artistSeries.graphql"
import { ArtistSeriesHeaderFragmentContainer as ArtistSeriesHeader } from "./Components/ArtistSeriesHeader"
import { userHasLabFeature } from "v2/Utils/user"
import { ErrorPage } from "v2/Components/ErrorPage"

interface ArtistSeriesAppProps {
  artistSeries: ArtistSeriesApp_artistSeries
}

const ArtistSeriesApp: React.FC<ArtistSeriesAppProps> = ({ artistSeries }) => {
  const { user } = React.useContext(SystemContext)
  const isEnabled = userHasLabFeature(user, "Artist Series")

  if (isEnabled) {
    return (
      <AppContainer maxWidth="100%">
        <Box m={3}>
          <ArtistSeriesHeader artistSeries={artistSeries} />
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
    fragment ArtistSeriesApp_artistSeries on ArtistSeries {
      ...ArtistSeriesHeader_artistSeries
    }
  `,
})
