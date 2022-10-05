import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { AboutArtworksRailQuery } from "__generated__/AboutArtworksRailQuery.graphql"
import { AboutArtworksRail_viewer$data } from "__generated__/AboutArtworksRail_viewer.graphql"
import { Rail } from "Components/Rail"
import { extractNodes } from "Utils/extractNodes"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { Skeleton } from "@artsy/palette"

interface AboutArtworksRailProps {
  viewer: AboutArtworksRail_viewer$data
}

export const AboutArtworksRail: React.FC<AboutArtworksRailProps> = props => {
  const artworks = extractNodes(props.viewer.artworksConnection)
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
    viewer: graphql`
      fragment AboutArtworksRail_viewer on Viewer {
        artworksConnection(first: 50, geneIDs: "trending-this-week") {
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
      placeholder={PLACEHOLDER}
      query={graphql`
        query AboutArtworksRailQuery {
          viewer {
            ...AboutArtworksRail_viewer
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.viewer) {
          return PLACEHOLDER
        }

        return <AboutArtworksRailFragmentContainer viewer={props.viewer} />
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
