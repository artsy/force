import { Skeleton, Box, Spacer } from "@artsy/palette"
import {
  Header,
  HeaderPlaceholder,
} from "Apps/Artwork/Components/OtherWorks/Header"
import ArtworkGrid, {
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ArtworkErrorAppRelatedWorksQuery } from "__generated__/ArtworkErrorAppRelatedWorksQuery.graphql"
import { graphql, useFragment } from "react-relay"
import { ArtworkErrorAppRelatedWorks_artwork$key } from "__generated__/ArtworkErrorAppRelatedWorks_artwork.graphql"

interface RelatedWorksProps {
  artwork: ArtworkErrorAppRelatedWorks_artwork$key
}

const RelatedWorks: React.FC<RelatedWorksProps> = ({ artwork }) => {
  const data = useFragment(RelatedWorksFragment, artwork)

  const artworksConnection = data.layer?.artworksConnection

  if (!artworksConnection?.edges?.length) {
    return null
  }

  return (
    <>
      <Header title="Related works" />

      <Spacer y={4} />

      <ArtworkGrid artworks={artworksConnection} columnCount={[2, 3, 4]} />
    </>
  )
}

const RelatedWorksFragment = graphql`
  fragment ArtworkErrorAppRelatedWorks_artwork on PartialArtwork {
    slug
    layer {
      name
      artworksConnection(first: 8) {
        ...ArtworkGrid_artworks
        # Used to check for content
        edges {
          node {
            slug
          }
        }
      }
    }
  }
`

const PLACEHOLDER = (
  <Skeleton>
    <Box>
      <HeaderPlaceholder title="Related works" />

      <Spacer y={4} />

      <ArtworkGridPlaceholder columnCount={[2, 3, 4]} />
    </Box>
  </Skeleton>
)

export const RelatedWorksQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box>
      <SystemQueryRenderer<ArtworkErrorAppRelatedWorksQuery>
        lazyLoad
        lazyLoadThreshold={500}
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtworkErrorAppRelatedWorksQuery($slug: String!) {
            artworkResult(id: $slug) {
              ... on ArtworkError {
                artwork {
                  slug
                  ...ArtworkErrorAppRelatedWorks_artwork
                }
              }
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

          if (props.artworkResult?.artwork) {
            return <RelatedWorks artwork={props.artworkResult.artwork} />
          }
        }}
      />
    </Box>
  )
}
