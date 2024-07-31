import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { AboutArtworksRailQuery } from "__generated__/AboutArtworksRailQuery.graphql"
import { AboutArtworksRail_marketingCollection$data } from "__generated__/AboutArtworksRail_marketingCollection.graphql"
import { Rail } from "Components/Rail/Rail"
import { extractNodes } from "Utils/extractNodes"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { Skeleton } from "@artsy/palette"

interface AboutArtworksRailProps {
  marketingCollection: AboutArtworksRail_marketingCollection$data
}

export const AboutArtworksRail: React.FC<AboutArtworksRailProps> = props => {
  const artworks = extractNodes(props.marketingCollection.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="Trending Now"
      viewAllLabel="View All"
      viewAllHref="/gene/trending-this-week"
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.internalID}
          />
        ))
      }}
    />
  )
}

export const AboutArtworksRailFragmentContainer = createFragmentContainer(
  AboutArtworksRail,
  {
    marketingCollection: graphql`
      fragment AboutArtworksRail_marketingCollection on MarketingCollection {
        artworksConnection(first: 50) {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
              slug
              href
            }
          }
        }
      }
    `,
  }
)

export const AboutArtworksRailQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<AboutArtworksRailQuery>
      lazyLoad
      placeholder={PLACEHOLDER}
      query={graphql`
        query AboutArtworksRailQuery {
          marketingCollection(slug: "trending-this-week") {
            ...AboutArtworksRail_marketingCollection
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.marketingCollection) {
          return PLACEHOLDER
        }

        return (
          <AboutArtworksRailFragmentContainer
            marketingCollection={props.marketingCollection}
          />
        )
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Trending Now"
      viewAllLabel="View All"
      viewAllHref="/gene/trending-this-week"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
