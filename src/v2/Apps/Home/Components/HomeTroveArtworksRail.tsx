import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { Rail } from "v2/Components/Rail/Rail"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"
import { HomeTroveArtworksRail_viewer } from "v2/__generated__/HomeTroveArtworksRail_viewer.graphql"
import { HomeTroveArtworksRailQuery } from "v2/__generated__/HomeTroveArtworksRailQuery.graphql"

interface HomeTroveArtworksRailProps {
  viewer: HomeTroveArtworksRail_viewer
}

export const HomeTroveArtworksRail: React.FC<HomeTroveArtworksRailProps> = ({
  viewer,
}) => {
  const artworks = extractNodes(viewer.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="Trove"
      subTitle="A weekly curated selection of the best works on Artsy by emerging and sought after artists."
      viewAllLabel="View All Works"
      viewAllHref="/gene/trove"
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.internalID}
            lazyLoad
            contextModule={ContextModule.featuredArtists}
          />
        ))
      }}
    />
  )
}

export const HomeTroveArtworksRailFragmentContainer = createFragmentContainer(
  HomeTroveArtworksRail,
  {
    viewer: graphql`
      fragment HomeTroveArtworksRail_viewer on Viewer {
        artworksConnection(first: 12, geneIDs: "trove") {
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

export const HomeTroveArtworksRailQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<HomeTroveArtworksRailQuery>
      placeholder={PLACEHOLDER}
      lazyLoad
      query={graphql`
        query HomeTroveArtworksRailQuery {
          viewer {
            ...HomeTroveArtworksRail_viewer
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

        return <HomeTroveArtworksRailFragmentContainer viewer={props.viewer} />
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Trove"
      subTitle="A weekly curated selection of the best works on Artsy by emerging and sought after artists."
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return (
            <Box width={200} key={i}>
              <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />
              <Spacer mt={1} />
              <SkeletonText variant="md">Artist Name</SkeletonText>
              <SkeletonText variant="md">Artwork Title</SkeletonText>
              <SkeletonText variant="xs">Partner</SkeletonText>
              <SkeletonText variant="xs">Price</SkeletonText>
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)
