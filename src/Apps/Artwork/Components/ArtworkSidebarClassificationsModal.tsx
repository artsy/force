import {
  Box,
  Button,
  Join,
  ModalDialog,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtworkSidebarClassificationsModalQuery } from "__generated__/ArtworkSidebarClassificationsModalQuery.graphql"
import { ArtworkSidebarClassificationsModal_viewer$data } from "__generated__/ArtworkSidebarClassificationsModal_viewer.graphql"

const ARTWORK_CLASSIFICATIONS_PLACEHOLDER = [...new Array(3)].map((_, i) => {
  return (
    <Box key={i}>
      <SkeletonText variant="sm-display" borderRadius={2}>
        Pending Name
      </SkeletonText>

      <SkeletonText variant="sm-display" borderRadius={4}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
        laboriosam perspiciatis natus veniam, tenetur ad cupiditate autem.
      </SkeletonText>
    </Box>
  )
})

interface ArtworkSidebarClassificationsModalProps {
  viewer?: ArtworkSidebarClassificationsModal_viewer$data
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
  if (!show) return null

  return (
    <ModalDialog
      onClose={onClose}
      title="Rarity classifications"
      footer={
        <Button onClick={onClose} width="100%">
          OK
        </Button>
      }
    >
      <Join separator={<Spacer y={1} />}>
        {viewer && viewer.artworkAttributionClasses
          ? viewer.artworkAttributionClasses.map(classification => {
              if (!classification) return null

              return (
                <Box key={classification.id} as="dl">
                  <Text as="dt" variant="xs">
                    {classification.name}
                  </Text>

                  <Text as="dd" variant="sm-display">
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
    </ModalDialog>
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
        if (error || !props?.viewer) {
          return (
            <ArtworkSidebarClassificationsModalFragmentContainer {...rest} />
          )
        }

        return (
          <ArtworkSidebarClassificationsModalFragmentContainer
            {...rest}
            viewer={props.viewer}
          />
        )
      }}
    />
  )
}
