import { Box } from "@artsy/palette"
import { useSystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React from "react"
import { graphql } from "react-relay"
import { ArtistSeriesRailFragmentContainer as ArtistSeriesRail } from "./ArtistSeriesRail"
import { OtherArtistSeriesQuery } from "v2/__generated__/OtherArtistSeriesQuery.graphql"

interface Props {
  artistID: string
}

export const ArtistSeriesQueryRenderer: React.SFC<Props> = props => {
  const { relayEnvironment } = useSystemContext()
  const { artistID } = props

  return (
    <Box>
      <QueryRenderer<OtherArtistSeriesQuery>
        environment={relayEnvironment}
        variables={{
          artistID,
        }}
        query={graphql`
          query OtherArtistSeriesQuery($artistID: String!) {
            artist(id: $artistID) {
              ...ArtistSeriesRail_artist
            }
          }
        `}
        render={renderWithLoadProgress(ArtistSeriesRail)}
      />
    </Box>
  )
}
