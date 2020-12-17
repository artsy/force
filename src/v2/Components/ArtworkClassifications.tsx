import { Box, BoxProps, SkeletonText } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { SystemQueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { ArtworkClassifications_viewer } from "v2/__generated__/ArtworkClassifications_viewer.graphql"
import { ArtworkClassificationsQuery } from "v2/__generated__/ArtworkClassificationsQuery.graphql"
import { Text } from "@artsy/palette"

const ARTWORK_CLASSIFICATIONS_PLACEHOLDER = [...new Array(6)].map((_, i) => {
  return (
    <Box key={i} my={2}>
      <SkeletonText variant="mediumText" borderRadius={2}>
        Pending Name
      </SkeletonText>

      <SkeletonText borderRadius={4}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
        laboriosam perspiciatis natus veniam, tenetur ad cupiditate autem.
      </SkeletonText>
    </Box>
  )
})

interface ArtworkClassificationsProps extends BoxProps {
  viewer: ArtworkClassifications_viewer
}

const ArtworkClassifications: React.FC<ArtworkClassificationsProps> = ({
  viewer,
  ...rest
}) => {
  return (
    <Box {...rest}>
      {viewer
        ? viewer.artworkAttributionClasses.map(classfication => {
            return (
              <Box key={classfication.id} as="dl" my={2}>
                <Text as="dt" variant="mediumText">
                  {classfication.name}
                </Text>

                <Text as="dd">{classfication.longDescription}</Text>
              </Box>
            )
          })
        : ARTWORK_CLASSIFICATIONS_PLACEHOLDER}

      <Text variant="small" color="black60" my={2}>
        Our partners are responsible for providing accurate classification
        information for all works.
      </Text>
    </Box>
  )
}

export const ArtworkClassificationsFragmentContainer = createFragmentContainer(
  ArtworkClassifications,
  {
    viewer: graphql`
      fragment ArtworkClassifications_viewer on Viewer {
        artworkAttributionClasses {
          id
          name
          longDescription
        }
      }
    `,
  }
)

export const ArtworkClassificationsQueryRenderer: React.FC<BoxProps> = rest => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtworkClassificationsQuery>
      environment={relayEnvironment}
      query={graphql`
        query ArtworkClassificationsQuery {
          viewer {
            ...ArtworkClassifications_viewer
          }
        }
      `}
      render={({ error, props }) => {
        if (error || !props) {
          return (
            <ArtworkClassificationsFragmentContainer {...rest} viewer={null} />
          )
        }

        return <ArtworkClassificationsFragmentContainer {...rest} {...props} />
      }}
    />
  )
}
