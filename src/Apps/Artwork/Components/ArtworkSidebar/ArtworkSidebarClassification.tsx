import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import { Clickable, Flex, Text } from "@artsy/palette"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import type { ArtworkSidebarClassification_artwork$data } from "__generated__/ArtworkSidebarClassification_artwork.graphql"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtworkSidebarClassificationProps {
  artwork: ArtworkSidebarClassification_artwork$data
}

const ArtworkSidebarClassification: React.FC<
  React.PropsWithChildren<ArtworkSidebarClassificationProps>
> = ({ artwork }) => {
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

  if (!artwork.attributionClass?.shortArrayDescription?.length) {
    return null
  }

  const shortArrayDescription = artwork.attributionClass?.shortArrayDescription

  return (
    <>
      <ArtworkSidebarClassificationsModalQueryRenderer
        onClose={closeModal}
        show={isModalOpen}
      />
      <Flex alignItems="center" data-testid="artwork-classification">
        <ArtworkIcon mr={1} />
        <Text variant="sm" color="mono60">
          {shortArrayDescription![0]}{" "}
          <Clickable onClick={openModal} textDecoration="underline">
            {shortArrayDescription![1]}
          </Clickable>
        </Text>
      </Flex>
    </>
  )
}

export const ArtworkSidebarClassificationFragmentContainer =
  createFragmentContainer(ArtworkSidebarClassification, {
    artwork: graphql`
      fragment ArtworkSidebarClassification_artwork on Artwork {
        attributionClass {
          shortArrayDescription
        }
      }
    `,
  })
