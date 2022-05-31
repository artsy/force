import { Clickable, Text } from "@artsy/palette"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarClassification_artwork } from "v2/__generated__/ArtworkSidebarClassification_artwork.graphql"
import { AnalyticsSchema, useTracking } from "v2/System/Analytics"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "v2/Apps/Artwork/Components/ArtworkSidebarClassificationsModal"

// TODO:
// - Check classification modal

export interface ArtworkSidebarClassificationProps {
  artwork: ArtworkSidebarClassification_artwork
}

export const ArtworkSidebarClassification: FC<ArtworkSidebarClassificationProps> = ({
  artwork,
}) => {
  const { trackEvent } = useTracking()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.Sidebar,
      subject: AnalyticsSchema.Subject.Classification,
      type: AnalyticsSchema.Type.Link,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return artwork.attributionClass ? (
    <>
      <ArtworkSidebarClassificationsModalQueryRenderer
        onClose={closeModal}
        show={isModalOpen}
      />

      <Text variant="xs" mt={2}>
        <Clickable
          onClick={openModal}
          textDecoration="underline"
          color="black60"
        >
          {artwork.attributionClass.shortDescription}
        </Clickable>
        .
      </Text>
    </>
  ) : null
}

export const ArtworkSidebarClassificationFragmentContainer = createFragmentContainer(
  ArtworkSidebarClassification,
  {
    artwork: graphql`
      fragment ArtworkSidebarClassification_artwork on Artwork {
        attributionClass {
          shortDescription
        }
      }
    `,
  }
)
