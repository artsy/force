import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { AboutArtworksRailQuery } from "v2/__generated__/AboutArtworksRailQuery.graphql"
import { AboutArtworksRail_viewer } from "v2/__generated__/AboutArtworksRail_viewer.graphql"
import { Rail } from "v2/Components/Rail"
import { extractNodes } from "v2/Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"

interface AboutArtworksRailProps {
  viewer: AboutArtworksRail_viewer
}

export const AboutArtworksRail: React.FC<AboutArtworksRailProps> = props => {
  const artworks = extractNodes(props.viewer.artworks)
  return (
    <Rail
      title="Discover Artworks Just for You"
      subTitle="On Artsy"
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.internalID}
            //TODO: make this optional?
            contextModule={ContextModule.featuredArtists}
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
        artworks(
          ids: [
            "5f3b5f320a69fc000de1b7ea" # pragma: allowlist secret
            "59e61ee8a09a6749ab69e49d" # pragma: allowlist secret
            "5d9b926cce2ff90011a84978" # pragma: allowlist secret
            "5e5572e72dbb7d000e386988" # pragma: allowlist secret
          ]
        ) {
          edges {
            node {
              internalID
              ...ShelfArtwork_artwork
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
      title="Discover Artworks Just for You"
      subTitle="On Artsy"
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
