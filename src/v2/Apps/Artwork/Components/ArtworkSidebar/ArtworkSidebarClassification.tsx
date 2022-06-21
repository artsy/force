import { ArtworkIcon, Clickable, Flex, Text } from "@artsy/palette"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarClassification_artwork } from "v2/__generated__/ArtworkSidebarClassification_artwork.graphql"
import { AnalyticsSchema, useTracking } from "v2/System/Analytics"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "v2/Apps/Artwork/Components/ArtworkSidebarClassificationsModal"

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
      <Flex mt={2}>
        <ArtworkIcon mr={1} />
        <Text variant="xs" color="black100">
          {shortArrayDescription![0]}{" "}
          <Clickable onClick={openModal} textDecoration="underline">
            {shortArrayDescription![1]}
          </Clickable>
          .
        </Text>
      </Flex>
    </>
  )
}

export const ArtworkSidebarClassificationFragmentContainer = createFragmentContainer(
  ArtworkSidebarClassification,
  {
    artwork: graphql`
      fragment ArtworkSidebarClassification_artwork on Artwork {
        attributionClass {
          shortArrayDescription
        }
      }
    `,
  }
)
