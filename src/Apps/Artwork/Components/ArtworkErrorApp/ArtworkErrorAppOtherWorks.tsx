import { Box, Join, Skeleton, Spacer } from "@artsy/palette"
import { OtherWorks } from "Apps/Artwork/Components/OtherWorks"
import { HeaderPlaceholder } from "Apps/Artwork/Components/OtherWorks/Header"
import { ArtworkGridPlaceholder } from "Components/ArtworkGrid/ArtworkGrid"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ArtworkErrorAppOtherWorksQuery } from "__generated__/ArtworkErrorAppOtherWorksQuery.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { withSystemContext } from "System/Contexts/SystemContext"

const OtherWorksFragmentContainer = createFragmentContainer(
  withSystemContext(OtherWorks),
  {
    artwork: graphql`
      fragment ArtworkErrorAppOtherWorks_artwork on PartialArtwork {
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
    <Box>
      <SystemQueryRenderer<ArtworkErrorAppOtherWorksQuery>
        lazyLoad
        lazyLoadThreshold={200}
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtworkErrorAppOtherWorksQuery($slug: String!) {
            artworkResult(id: $slug) {
              ... on ArtworkError {
                artwork {
                  ...ArtworkErrorAppOtherWorks_artwork
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
            return (
              <OtherWorksFragmentContainer
                artwork={props.artworkResult.artwork}
              />
            )
          }
        }}
      />
    </Box>
  )
}
