import { ContextModule } from "@artsy/cohesion"
import { Box, Join, Skeleton, Spacer } from "@artsy/palette"
import { OtherWorks_artwork$data } from "__generated__/OtherWorks_artwork.graphql"
import { OtherAuctionsQueryRenderer } from "Apps/Artwork/Components/OtherAuctions"
import {
  Header,
  HeaderPlaceholder,
} from "Apps/Artwork/Components/OtherWorks/Header"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import ArtworkGrid, {
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { OtherWorksQuery } from "__generated__/OtherWorksQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { compact } from "lodash"
import track, { useTracking } from "react-tracking"
import {
  SystemContextProps,
  withSystemContext,
} from "System/Contexts/SystemContext"

/**
 * Check to see if a connection's edges have a length; if false hide the grid.
 * FIXME: Fix `any`. Also has nothing to do with this file? Etc...
 */
export function hideGrid(artworksConnection): boolean {
  return Boolean(get(artworksConnection, p => !p?.edges.length))
}

// FIXME: `any`
const contextGridTypeToContextModule = contextGridType => {
  switch (contextGridType) {
    case "ArtistArtworkGrid": {
      return DeprecatedSchema.ContextModule.OtherWorksByArtist
    }
    case "PartnerArtworkGrid": {
      return DeprecatedSchema.ContextModule.OtherWorksFromGallery
    }
    case "AuctionArtworkGrid": {
      return DeprecatedSchema.ContextModule.OtherWorksInAuction
    }
    case "ShowArtworkGrid": {
      return DeprecatedSchema.ContextModule.OtherWorksFromShow
    }
  }
}

// FIXME: Why is this a `string`?
const contextGridTypeToV2ContextModule = (contextGridType: string) => {
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
  ({ artwork }: { artwork: OtherWorks_artwork$data } & SystemContextProps) => {
    const { context, contextGrids } = artwork

    const tracking = useTracking()

    const gridsToShow = compact(
      (contextGrids ?? []).filter(grid => {
        return !!grid && (grid.artworksConnection?.edges ?? []).length > 0
      })
    )

    return (
      <>
        {gridsToShow && gridsToShow.length > 0 && (
          <Join separator={<Spacer y={6} />}>
            {gridsToShow.map((grid, index) => {
              const contextModule = contextGridTypeToV2ContextModule(
                grid.__typename
              )

              return (
                <Box key={`Grid-${index}`} data-test={contextModule}>
                  {grid.title && grid.ctaHref && (
                    <Header title={grid.title} buttonHref={grid.ctaHref} />
                  )}

                  {grid.artworksConnection && (
                    <>
                      <Spacer y={4} />

                      <ArtworkGrid
                        artworks={grid.artworksConnection}
                        columnCount={[2, 3, 4]}
                        contextModule={contextModule}
                        onBrickClick={() =>
                          tracking.trackEvent({
                            type: DeprecatedSchema.Type.ArtworkBrick,
                            action_type: DeprecatedSchema.ActionType.Click,
                            context_module: contextGridTypeToContextModule(
                              grid.__typename
                            ),
                          })
                        }
                      />
                    </>
                  )}
                </Box>
              )
            })}
          </Join>
        )}

        {/*
        TODO: Appears to never be true? Maybe this was supposed to match
        context.__typename === "Sale"
        or contextGrids[i] === "ArtworkContextAuction"
        */}
        {context && context.__typename === "ArtworkContextAuction" && (
          <>
            <Spacer y={6} />
            <OtherAuctionsQueryRenderer />
          </>
        )}
      </>
    )
  }
)

export const OtherWorksFragmentContainer = createFragmentContainer(
  withSystemContext(OtherWorks),
  {
    artwork: graphql`
      fragment OtherWorks_artwork on Artwork {
        contextGrids(includeRelatedArtworks: false) {
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
        slug
        context {
          __typename
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Join separator={<Spacer y={6} />}>
      {[...new Array(2)].map((_, i) => {
        return (
          <Box key={i}>
            <HeaderPlaceholder
              title="Other works by Pablo Picasso"
              buttonHref
            />

            <Spacer y={4} />

            <ArtworkGridPlaceholder columnCount={[2, 3, 4]} />
          </Box>
        )
      })}
    </Join>
  </Skeleton>
)

export const OtherWorksQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="OtherWorksQueryRenderer">
      <SystemQueryRenderer<OtherWorksQuery>
        lazyLoad
        lazyLoadThreshold={200}
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query OtherWorksQuery($slug: String!) {
            artwork(id: $slug) {
              ...OtherWorks_artwork
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }

          if (!props) {
            return PLACEHOLDER
          }

          if (props.artwork) {
            return <OtherWorksFragmentContainer artwork={props.artwork} />
          }
        }}
      />
    </Box>
  )
}
