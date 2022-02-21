import { Box, SkeletonText, Modal, Button, Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArtworkSidebarClassificationsModal_viewer$data } from "v2/__generated__/ArtworkSidebarClassificationsModal_viewer.graphql"
import { ArtworkSidebarClassificationsModalQuery } from "v2/__generated__/ArtworkSidebarClassificationsModalQuery.graphql"
import { Text } from "@artsy/palette"

const ARTWORK_CLASSIFICATIONS_PLACEHOLDER = [...new Array(6)].map((_, i) => {
  return (
    <Box key={i}>
      <SkeletonText variant="md" borderRadius={2}>
        Pending Name
      </SkeletonText>

      <SkeletonText variant="md" borderRadius={4}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
        laboriosam perspiciatis natus veniam, tenetur ad cupiditate autem.
      </SkeletonText>
    </Box>
  )
})

interface ArtworkSidebarClassificationsModalProps {
  viewer: ArtworkSidebarClassificationsModal_viewer$data
  show: boolean
  onClose(): void
  showDisclaimer?: boolean
}

const ArtworkSidebarClassificationsModal: React.FC<ArtworkSidebarClassificationsModalProps> = ({
  viewer,
  show,
  onClose,
  showDisclaimer = true,
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
          ? // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            viewer.artworkAttributionClasses.map(classification => {
              if (!classification) return null

              return (
                <Box key={classification.id} as="dl">
                  <Text as="dt" variant="xs" textTransform="uppercase">
                    {classification.name}
                  </Text>

                  <Text as="dd" variant="md">
                    {classification.longDescription}
                  </Text>
                </Box>
              )
            })
          : ARTWORK_CLASSIFICATIONS_PLACEHOLDER}

        {showDisclaimer && (
          <Text variant="xs" color="black60">
            Our partners are responsible for providing accurate classification
            information for all works.
          </Text>
        )}
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
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              viewer={null}
            />
          )
        }

        return (
          <ArtworkSidebarClassificationsModalFragmentContainer
            {...rest}
            viewer={props.viewer!}
          />
        )
      }}
    />
  )
}
