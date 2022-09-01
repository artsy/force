import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtworkSidebar2Classification_artwork } from "__generated__/ArtworkSidebar2Classification_artwork.graphql"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "../ArtworkSidebarClassificationsModal"
import { ArtworkIcon, Clickable, Flex, Text } from "@artsy/palette"

interface ArtworkSidebar2ClassificationProps {
  artwork: ArtworkSidebar2Classification_artwork
}

const ArtworkSidebar2Classification: React.FC<ArtworkSidebar2ClassificationProps> = ({
  artwork,
}) => {
  const { trackEvent } = useTracking()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: DeprecatedAnalyticsSchema.ContextModule.Sidebar,
      subject: DeprecatedAnalyticsSchema.Subject.Classification,
      type: DeprecatedAnalyticsSchema.Type.Link,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  if (!artwork.attributionClass) {
    return null
  }

  const { shortArrayDescription } = artwork.attributionClass

  return (
    <>
      <ArtworkSidebarClassificationsModalQueryRenderer
        onClose={closeModal}
        show={isModalOpen}
      />
      <Flex alignItems="center">
        <ArtworkIcon mr={1} />
        <Text variant="sm-display" color="black60">
          {shortArrayDescription![0]}{" "}
          <Clickable onClick={openModal} textDecoration="underline">
            {shortArrayDescription![1]}
          </Clickable>
        </Text>
      </Flex>
    </>
  )
}

export const ArtworkSidebar2ClassificationFragmentContainer = createFragmentContainer(
  ArtworkSidebar2Classification,
  {
    artwork: graphql`
      fragment ArtworkSidebar2Classification_artwork on Artwork {
        attributionClass {
          shortArrayDescription
        }
      }
    `,
  }
)
