import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Join,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { OtherWorks_artwork$data } from "__generated__/OtherWorks_artwork.graphql"
import { OtherAuctionsQueryRenderer } from "Apps/Artwork/Components/OtherAuctions"
import { Header } from "Apps/Artwork/Components/OtherWorks/Header"
import { RelatedWorksArtworkGridRefetchContainer } from "Apps/Artwork/Components/OtherWorks/RelatedWorksArtworkGrid"
import { SystemContextProps, withSystemContext } from "System"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import ArtworkGrid from "Components/ArtworkGrid"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { Mediator } from "Server/mediator"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { OtherWorksQuery } from "__generated__/OtherWorksQuery.graphql"
import { useSystemContext } from "System"
import { random } from "lodash"
import { Rail } from "Components/Rail"
import track, { useTracking } from "react-tracking"

export interface OtherWorksContextProps {
  artwork: OtherWorks_artwork$data
  mediator?: Mediator
}

/**
 * Check to see if a connection's edges have a length; if false hide the grid.
 */
export function hideGrid(artworksConnection): boolean {
  return Boolean(get(artworksConnection, p => !p?.edges.length))
}

const populatedGrids = (grids: OtherWorks_artwork$data["contextGrids"]) => {
  if (grids && grids.length > 0) {
    return grids.filter(grid => {
      return (
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        grid.artworksConnection &&
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        grid.artworksConnection.edges &&
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        grid.artworksConnection.edges.length > 0 &&
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        grid.__typename !== "RelatedArtworkGrid"
      )
    })
  }
}

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
  (props: { artwork: OtherWorks_artwork$data } & SystemContextProps) => {
    const { context, contextGrids, sale } = props.artwork
    const gridsToShow = populatedGrids(contextGrids)
    const tracking = useTracking()

    return (
      <>
        {gridsToShow && gridsToShow.length > 0 && (
          <Join separator={<Spacer mt={6} />}>
            {gridsToShow.map((grid, index) => {
              const contextModule = contextGridTypeToV2ContextModule(
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                grid.__typename
              )

              return (
                <Box key={`Grid-${index}`} data-test={contextModule}>
                  {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                  <Header title={grid.title} buttonHref={grid.ctaHref} />

                  <Spacer mt={4} />

                  <ArtworkGrid
                    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                    artworks={grid.artworksConnection}
                    columnCount={[2, 3, 4, 4]}
                    mediator={props.mediator}
                    contextModule={contextModule}
                    onBrickClick={() =>
                      tracking.trackEvent({
                        type: DeprecatedSchema.Type.ArtworkBrick,
                        action_type: DeprecatedSchema.ActionType.Click,
                        context_module: contextGridTypeToContextModule(
                          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
          <>
            <Spacer mt={6} />
            {/* @ts-ignore RELAY UPGRADE 13 */}
            <RelatedWorksArtworkGridRefetchContainer artwork={props.artwork} />
          </>
        )}

        {context && context.__typename === "ArtworkContextAuction" && (
          <>
            <Spacer mt={6} />
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
        slug
        internalID
        sale {
          is_closed: isClosed
        }
        context {
          __typename
        }
        seriesArtist: artist(shallow: true) {
          ...ArtistSeriesRail_artist
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Other works by Pablo Picasso"
      viewAllLabel="View All"
      showProgress={false}
      getItems={() => {
        return [...new Array(4)].map((_, i) => {
          return (
            <Box key={i} p={1}>
              <SkeletonBox width={random(200, 400)} height={400} />
              <Spacer mt={1} />
              <SkeletonText variant="xs">Pablo Picasso</SkeletonText>
              <SkeletonText variant="xs">
                Paysage (Landscape), 1953
              </SkeletonText>
              <SkeletonText variant="xs">
                Paysage (Landscape), 1953
              </SkeletonText>
            </Box>
          )
        })
      }}
    />
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
