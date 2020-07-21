import { ContextModule } from "@artsy/cohesion"
import { Box, Join, Spacer } from "@artsy/palette"
import { OtherWorks_artwork } from "v2/__generated__/OtherWorks_artwork.graphql"
import { OtherAuctionsQueryRenderer as OtherAuctions } from "v2/Apps/Artwork/Components/OtherAuctions"
import { Header } from "v2/Apps/Artwork/Components/OtherWorks/Header"
import { RelatedWorksArtworkGridRefetchContainer as RelatedWorksArtworkGrid } from "v2/Apps/Artwork/Components/OtherWorks/RelatedWorksArtworkGrid"
import {
  Mediator,
  SystemContext,
  SystemContextProps,
  withSystemContext,
} from "v2/Artsy"
import { track, useTracking } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { ArtistSeriesArtworkRailFragmentContainer as ArtistSeriesArtworkRail } from "./ArtistSeriesArtworkRail"
import { userHasLabFeature } from "v2/Utils/user"

export interface OtherWorksContextProps {
  artwork: OtherWorks_artwork
  mediator?: Mediator
}

/**
 * Check to see if a connection's edges have a length; if false hide the grid.
 */
export function hideGrid(artworksConnection): boolean {
  return Boolean(get(artworksConnection, p => !p?.edges.length))
}

const populatedGrids = (grids: OtherWorks_artwork["contextGrids"]) => {
  if (grids && grids.length > 0) {
    return grids.filter(grid => {
      return (
        grid.artworksConnection &&
        grid.artworksConnection.edges &&
        grid.artworksConnection.edges.length > 0 &&
        grid.__typename !== "RelatedArtworkGrid"
      )
    })
  }
}

const contextGridTypeToContextModule = contextGridType => {
  switch (contextGridType) {
    case "ArtistArtworkGrid": {
      return Schema.ContextModule.OtherWorksByArtist
    }
    case "PartnerArtworkGrid": {
      return Schema.ContextModule.OtherWorksFromGallery
    }
    case "AuctionArtworkGrid": {
      return Schema.ContextModule.OtherWorksInAuction
    }
    case "ShowArtworkGrid": {
      return Schema.ContextModule.OtherWorksFromShow
    }
  }
}

const contextGridTypeToV2ContextModule = contextGridType => {
  switch (contextGridType) {
    case "ArtistArtworkGrid": {
      return ContextModule.otherWorksByArtistRail
    }
    case "PartnerArtworkGrid": {
      return ContextModule.otherWorksFromPartnerRail
    }
    case "AuctionArtworkGrid": {
      return ContextModule.otherWorksInAuctionRail
    }
    case "ShowArtworkGrid": {
      return ContextModule.otherWorksFromShowRail
    }
  }
}

export const OtherWorks = track()(
  (props: { artwork: OtherWorks_artwork } & SystemContextProps) => {
    const { context, contextGrids, sale } = props.artwork
    const gridsToShow = populatedGrids(contextGrids)
    const tracking = useTracking()
    const { user } = React.useContext(SystemContext)
    const artistSeriesIsEnabled = userHasLabFeature(user, "Artist Series")

    return (
      <>
        {gridsToShow && gridsToShow.length > 0 && (
          <Join separator={<Spacer my={3} />}>
            {gridsToShow.map((grid, index) => {
              const contextModule = contextGridTypeToV2ContextModule(
                grid.__typename
              )
              return (
                <Box key={`Grid-${index}`} data-test={contextModule}>
                  {artistSeriesIsEnabled &&
                    grid.__typename === "ArtistArtworkGrid" && (
                      <>
                        <ArtistSeriesArtworkRail artwork={props.artwork} />
                      </>
                    )}

                  <Header title={grid.title} buttonHref={grid.ctaHref} />
                  <ArtworkGrid
                    artworks={grid.artworksConnection}
                    columnCount={[2, 3, 4]}
                    preloadImageCount={0}
                    mediator={props.mediator}
                    contextModule={contextModule}
                    onBrickClick={() =>
                      tracking.trackEvent({
                        type: Schema.Type.ArtworkBrick,
                        action_type: Schema.ActionType.Click,
                        context_module: contextGridTypeToContextModule(
                          grid.__typename
                        ),
                      })
                    }
                  />
                </Box>
              )
            })}
          </Join>
        )}
        {!(
          context &&
          context.__typename === "ArtworkContextAuction" &&
          !(sale && sale.is_closed)
        ) && (
          <Box mt={3}>
            <RelatedWorksArtworkGrid artwork={props.artwork} />
          </Box>
        )}
        {context && context.__typename === "ArtworkContextAuction" && (
          <OtherAuctions />
        )}
      </>
    )
  }
)

export const OtherWorksFragmentContainer = createFragmentContainer<{
  artwork: OtherWorks_artwork
}>(withSystemContext(OtherWorks), {
  artwork: graphql`
    fragment OtherWorks_artwork on Artwork
      @argumentDefinitions(
        shouldFetchArtistSeriesData: { type: "Boolean!", defaultValue: false }
      ) {
      contextGrids {
        __typename
        title
        ctaTitle
        ctaHref
        artworksConnection(first: 8) {
          ...ArtworkGrid_artworks
          edges {
            node {
              slug
            }
          }
        }
      }
      ...RelatedWorksArtworkGrid_artwork
      ...ArtistSeriesArtworkRail_artwork
        @include(if: $shouldFetchArtistSeriesData)
      slug
      internalID
      sale {
        is_closed: isClosed
      }
      context {
        __typename
      }
    }
  `,
})
