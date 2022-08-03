import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { AboutArtworksRail2Query } from "__generated__/AboutArtworksRail2Query.graphql"
import { AboutArtworksRail2_viewer } from "__generated__/AboutArtworksRail2_viewer.graphql"
import { Rail } from "Components/Rail"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import {
  Box,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"

interface AboutArtworksRail2Props {
  viewer: AboutArtworksRail2_viewer
}

export const AboutArtworksRail2: React.FC<AboutArtworksRail2Props> = props => {
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

export const AboutArtworksRail2FragmentContainer = createFragmentContainer(
  AboutArtworksRail2,
  {
    viewer: graphql`
      fragment AboutArtworksRail2_viewer on Viewer {
        artworksConnection(first: 50, geneIDs: "trending-this-week") {
          edges {
            node {
              ...ShelfArtwork_artwork @arguments(width: 210)
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

export const AboutArtworksRail2QueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<AboutArtworksRail2Query>
      placeholder={PLACEHOLDER}
      query={graphql`
        query AboutArtworksRail2Query {
          viewer {
            ...AboutArtworksRail2_viewer
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

        return <AboutArtworksRail2FragmentContainer viewer={props.viewer} />
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
          return (
            <Box width={200} key={i}>
              <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />
              <Spacer mt={1} />
              <SkeletonText variant="sm-display">Artist Name</SkeletonText>
              <SkeletonText variant="sm-display">Artwork Title</SkeletonText>
              <SkeletonText variant="xs">Partner</SkeletonText>
              <SkeletonText variant="xs">Price</SkeletonText>
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)
