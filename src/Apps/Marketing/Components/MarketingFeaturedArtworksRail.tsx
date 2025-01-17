import { Skeleton } from "@artsy/palette"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import type { MarketingFeaturedArtworksRailQuery } from "__generated__/MarketingFeaturedArtworksRailQuery.graphql"
import type { MarketingFeaturedArtworksRail_viewer$data } from "__generated__/MarketingFeaturedArtworksRail_viewer.graphql"
import { compact } from "lodash"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface MarketingFeaturedArtworksRailProps {
  viewer: MarketingFeaturedArtworksRail_viewer$data
}

const MarketingFeaturedArtworksRail: FC<
  React.PropsWithChildren<MarketingFeaturedArtworksRailProps>
> = ({ viewer }) => {
  const [collection] = compact(viewer.marketingCollections)

  if (!collection) {
    return null
  }

  const artworks = extractNodes(collection.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="Featured artworks"
      viewAllLabel="View All Works"
      viewAllHref="/collection/trending-this-week"
      getItems={() => {
        return artworks.map(artwork => {
          return (
            <ShelfArtworkFragmentContainer
              key={artwork.internalID}
              artwork={artwork}
            />
          )
        })
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Featured artworks"
      viewAllLabel="View All Artists"
      viewAllHref="/artworks"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)

export const MarketingFeaturedArtworksRailFragmentContainer =
  createFragmentContainer(MarketingFeaturedArtworksRail, {
    viewer: graphql`
      fragment MarketingFeaturedArtworksRail_viewer on Viewer {
        marketingCollections(slugs: ["new-this-week"]) {
          artworksConnection(first: 25) {
            edges {
              node {
                ...ShelfArtwork_artwork
                internalID
              }
            }
          }
        }
      }
    `,
  })

export const MarketingFeaturedArtworksRailQueryRenderer: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <SystemQueryRenderer<MarketingFeaturedArtworksRailQuery>
      lazyLoad
      query={graphql`
        query MarketingFeaturedArtworksRailQuery {
          viewer {
            ...MarketingFeaturedArtworksRail_viewer
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.viewer) {
          return PLACEHOLDER
        }

        return (
          <MarketingFeaturedArtworksRailFragmentContainer
            viewer={props.viewer}
          />
        )
      }}
    />
  )
}
