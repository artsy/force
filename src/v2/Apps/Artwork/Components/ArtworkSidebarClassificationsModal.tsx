import { Box, SkeletonText, Modal, Button, Join, Spacer } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { SystemQueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { ArtworkSidebarClassificationsModal_viewer } from "v2/__generated__/ArtworkSidebarClassificationsModal_viewer.graphql"
import { ArtworkSidebarClassificationsModalQuery } from "v2/__generated__/ArtworkSidebarClassificationsModalQuery.graphql"
import { Text } from "@artsy/palette"

const ARTWORK_CLASSIFICATIONS_PLACEHOLDER = [...new Array(6)].map((_, i) => {
  return (
    <Box key={i}>
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

interface ArtworkSidebarClassificationsModalProps {
  viewer: ArtworkSidebarClassificationsModal_viewer
  show: boolean
  onClose(): void
}

const ArtworkSidebarClassificationsModal: React.FC<ArtworkSidebarClassificationsModalProps> = ({
  viewer,
  show,
  onClose,
}) => {
  return (
    <Modal
      onClose={onClose}
      show={show}
      title="Artwork classifications"
      FixedButton={
        <Button onClick={onClose} width="100%">
          OK
        </Button>
      }
    >
      <Join separator={<Spacer my={1} />}>
        {viewer
          ? // @ts-expect-error STRICT_NULL_CHECK
            viewer.artworkAttributionClasses.map(classfication => {
              return (
                // @ts-expect-error STRICT_NULL_CHECK
                <Box key={classfication.id} as="dl">
                  <Text as="dt" variant="mediumText">
                    {/* @ts-expect-error STRICT_NULL_CHECK */}
                    {classfication.name}
                  </Text>

                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  <Text as="dd">{classfication.longDescription}</Text>
                </Box>
              )
            })
          : ARTWORK_CLASSIFICATIONS_PLACEHOLDER}

        <Text variant="small" color="black60">
          Our partners are responsible for providing accurate classification
          information for all works.
        </Text>
      </Join>
    </Modal>
  )
}

export const ArtworkSidebarClassificationsModalFragmentContainer = createFragmentContainer(
  ArtworkSidebarClassificationsModal,
  {
    viewer: graphql`
      fragment ArtworkSidebarClassificationsModal_viewer on Viewer {
        artworkAttributionClasses {
          id
          name
          longDescription
        }
      }
    `,
  }
)

export const ARTWORK_SIDEBAR_CLASSIFICATIONS_MODAL_QUERY = graphql`
  query ArtworkSidebarClassificationsModalQuery {
    viewer {
      ...ArtworkSidebarClassificationsModal_viewer
    }
  }
`

export const ArtworkSidebarClassificationsModalQueryRenderer: React.FC<Omit<
  ArtworkSidebarClassificationsModalProps,
  "viewer"
>> = rest => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtworkSidebarClassificationsModalQuery>
      environment={relayEnvironment}
      query={ARTWORK_SIDEBAR_CLASSIFICATIONS_MODAL_QUERY}
      render={({ error, props }) => {
        if (error || !props) {
          return (
            <ArtworkSidebarClassificationsModalFragmentContainer
              {...rest}
              // @ts-expect-error STRICT_NULL_CHECK
              viewer={null}
            />
          )
        }

        return (
          <ArtworkSidebarClassificationsModalFragmentContainer
            {...rest}
            {...props}
          />
        )
      }}
    />
  )
}
