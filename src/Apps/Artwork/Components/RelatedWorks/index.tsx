import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

import { ContextModule } from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, Skeleton, Spacer } from "@artsy/palette"

import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  Header,
  HeaderPlaceholder,
} from "Apps/Artwork/Components/OtherWorks/Header"
import ArtworkGrid, {
  ArtworkGridPlaceholder,
} from "Components/ArtworkGrid/ArtworkGrid"
import { RelatedWorksQuery } from "__generated__/RelatedWorksQuery.graphql"
import { RelatedWorks_artwork$data } from "__generated__/RelatedWorks_artwork.graphql"

interface RelatedWorksProps {
  artwork: RelatedWorks_artwork$data
}

export const RelatedWorks: React.FC<RelatedWorksProps> = ({ artwork }) => {
  const { trackEvent } = useTracking()

  const artworksConnection = artwork.layer?.artworksConnection

  if (!artworksConnection?.edges?.length) {
    return null
  }

  return (
    <Box data-testid={ContextModule.relatedWorksRail}>
      <Header title="Related works" />

      <Spacer y={4} />

      <ArtworkGrid
        contextModule={ContextModule.relatedWorksRail}
        artworks={artworksConnection}
        columnCount={[2, 3, 4]}
        onBrickClick={() =>
          trackEvent({
            type: DeprecatedSchema.Type.ArtworkBrick,
            action_type: DeprecatedSchema.ActionType.Click,
            context_module: DeprecatedSchema.ContextModule.RelatedWorks,
          })
        }
      />
    </Box>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Box>
      <HeaderPlaceholder title="Related works" />

      <Spacer y={4} />

      <ArtworkGridPlaceholder columnCount={[2, 3, 4]} />
    </Box>
  </Skeleton>
)

export const RelatedWorksFragmentContainer = createFragmentContainer(
  RelatedWorks,
  {
    artwork: graphql`
      fragment RelatedWorks_artwork on Artwork {
        slug
        title
        layer(id: "main") {
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
    `,
  }
)

export const RelatedWorksQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="RelatedWorksQueryRenderer">
      <SystemQueryRenderer<RelatedWorksQuery>
        lazyLoad
        lazyLoadThreshold={500}
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query RelatedWorksQuery($slug: String!) {
            artwork(id: $slug) {
              ...RelatedWorks_artwork
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
            return <RelatedWorksFragmentContainer artwork={props.artwork} />
          }
        }}
      />
    </Box>
  )
}
