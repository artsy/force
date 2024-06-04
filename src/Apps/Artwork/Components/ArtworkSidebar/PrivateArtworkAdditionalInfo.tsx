import {
  Clickable,
  Flex,
  FlexProps,
  HTML,
  Join,
  ReadMore,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { PrivateArtworkAdditionalInfo_artwork$key } from "__generated__/PrivateArtworkAdditionalInfo_artwork.graphql"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { ConditionInfoModal } from "Apps/Artwork/Components/ArtworkDetails/ConditionInfoModal"
import { PrivateArtworkDefinitionList } from "Apps/Artwork/Components/ArtworkSidebar/PrivateArtworkDefinitionList"
import { useArtworkDetailsAdditionalInfoFields } from "Apps/Artwork/Components/ArtworkDetails/ArtworkDetailsAdditionalInfo"

// Number of items to display when read more is visible
const COLLAPSED_COUNT = 3

export interface PrivateArtworkAdditionalInfoProps extends FlexProps {
  artwork: PrivateArtworkAdditionalInfo_artwork$key
}

export const PrivateArtworkAdditionalInfo: React.FC<PrivateArtworkAdditionalInfoProps> = ({
  artwork,
  ...flexProps
}) => {
  const data = useFragment(privateArtworkAdditionalInfoFragment, artwork)

  const {
    listItems,
    openConditionModal,
    setOpenConditionModal,
  } = useArtworkDetailsAdditionalInfoFields({ artwork: data })

  const itemsToRemove = ["Materials", "Size", "Rarity", "Frame"]

  const privateListItems = listItems.filter(item => {
    return !itemsToRemove.includes(item.title)
  })

  const { trackEvent } = useTracking()

  const allDisplayItems = privateListItems.filter(
    i => i.value != null && i.value !== ""
  )

  const [isCollapsed, setIsCollapsed] = React.useState(
    allDisplayItems.length > COLLAPSED_COUNT
  )

  const displayItems = isCollapsed
    ? allDisplayItems.slice(0, COLLAPSED_COUNT)
    : allDisplayItems

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
        <Join separator={<Spacer y={1} />}>
          {displayItems.map(
            ({ title, value, onReadMoreClicked, onTitleClick }, index) => (
              <PrivateArtworkDefinitionList
                key={title + index}
                term={title}
                onTitleClick={onTitleClick}
              >
                <HTML variant="xs" color="black100">
                  {/* TODO: not sure why this check is here */}
                  {React.isValidElement(value) ? (
                    value
                  ) : (
                    <ReadMore
                      onReadMoreClicked={onReadMoreClicked}
                      maxChars={140}
                      content={value as string}
                    />
                  )}
                </HTML>
              </PrivateArtworkDefinitionList>
            )
          )}
        </Join>
        {!!isCollapsed && (
          <Flex flexDirection="row" justifyContent="flex-start">
            {/* <Box width={150}></Box> */}
            <Spacer x={150} />
            <Clickable
              mt={1}
              ml={2}
              onClick={() => handleReadMoreClick()}
              textDecoration="underline"
            >
              <Text variant="xs" color="black100" textAlign="left">
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
    image_rights: imageRights
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
