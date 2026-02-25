import {
  Clickable,
  Flex,
  type FlexProps,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { useArtworkDetailsAdditionalInfoFields } from "Apps/Artwork/Components/ArtworkDetails/ArtworkDetailsAdditionalInfo"
import { ConditionInfoModal } from "Apps/Artwork/Components/ArtworkDetails/ConditionInfoModal"
import { DefinitionList } from "Components/DefinitionList"
import type { PrivateArtworkAdditionalInfo_artwork$key } from "__generated__/PrivateArtworkAdditionalInfo_artwork.graphql"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

// Number of items to display when read more is visible
const COLLAPSED_COUNT = 3

export interface PrivateArtworkAdditionalInfoProps extends FlexProps {
  artwork: PrivateArtworkAdditionalInfo_artwork$key
}

export const PrivateArtworkAdditionalInfo: React.FC<
  React.PropsWithChildren<PrivateArtworkAdditionalInfoProps>
> = ({ artwork, ...flexProps }) => {
  const data = useFragment(privateArtworkAdditionalInfoFragment, artwork)

  const { listItems, openConditionModal, setOpenConditionModal } =
    useArtworkDetailsAdditionalInfoFields({ artwork: data })

  const itemsToRemove = ["Materials", "Size", "Rarity", "Frame"]

  const privateListItems = listItems.filter(
    item => !itemsToRemove.includes(item.term),
  )

  const { trackEvent } = useTracking()

  const [isCollapsed, setIsCollapsed] = React.useState(
    privateListItems.length > COLLAPSED_COUNT,
  )

  const displayItems = isCollapsed
    ? privateListItems.slice(0, COLLAPSED_COUNT)
    : privateListItems

  if (displayItems.length === 0) {
    return null
  }

  const handleReadMoreClick = () => {
    const properties = {
      action_type: "Click",
      context_module: "artworkDetails",
      subject: "Read more",
      type: "Link",
    }
    trackEvent(properties)
    setIsCollapsed(false)
  }

  const Container = data.isUnlisted ? Flex : StackableBorderBox

  return (
    <>
      {openConditionModal && (
        <ConditionInfoModal onClose={() => setOpenConditionModal(false)} />
      )}
      <Container flexDirection="column" {...flexProps}>
        <DefinitionList items={displayItems} aria-label="Artwork details" />
        {!!isCollapsed && (
          <Flex flexDirection="row" justifyContent="flex-start">
            <Spacer x={150} />
            <Clickable
              mt={1}
              ml={2}
              onClick={() => handleReadMoreClick()}
              textDecoration="underline"
            >
              <Text variant="xs" color="mono100" textAlign="left">
                Read More
              </Text>
            </Clickable>
          </Flex>
        )}
      </Container>
    </>
  )
}

const privateArtworkAdditionalInfoFragment = graphql`
  fragment PrivateArtworkAdditionalInfo_artwork on Artwork {
    category
    series
    publisher
    manufacturer
    imageRights
    canRequestLotConditionsReport
    internalID
    isUnlisted
    framed {
      label
      details
    }
    signatureInfo {
      label
      details
    }
    conditionDescription {
      label
      details
    }
    certificateOfAuthenticity {
      label
      details
    }
    mediumType {
      __typename
    }
    dimensions {
      in
      cm
    }
    attributionClass {
      name
    }
    medium
    ...ArtworkDetailsMediumModal_artwork
  }
`
