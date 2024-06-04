import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
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
import { useState } from "react"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { ArtworkDetailsMediumModalFragmentContainer } from "Apps/Artwork/Components/ArtworkDetailsMediumModal"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { ContextModule } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { ConditionInfoModal } from "Apps/Artwork/Components/ArtworkDetails/ConditionInfoModal"
import { RequestConditionReportQueryRenderer } from "Apps/Artwork/Components/ArtworkDetails/RequestConditionReport"
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

  const {
    category,
    series,
    publisher,
    manufacturer,
    image_rights,
    internalID,
    canRequestLotConditionsReport,
    signatureInfo,
    conditionDescription,
    certificateOfAuthenticity,
    mediumType,
    isUnlisted,
  } = data

  const [openMediumModal, setOpenMediumModal] = useState(false)

  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const listItems = [
    {
      title: "Medium",
      value: category && (
        <>
          {mediumType ? (
            <>
              <Clickable
                onClick={() => {
                  setOpenMediumModal(true)

                  trackEvent({
                    action_type: "Click",
                    context_module: ContextModule.aboutTheWork,
                    type: DeprecatedAnalyticsSchema.Type.Link,
                    subject: "Medium type info",
                    context_page_owner_type: contextPageOwnerType,
                    context_page_owner_id: contextPageOwnerId,
                    context_page_owner_slug: contextPageOwnerSlug,
                  })
                }}
                textDecoration="underline"
                color="black100"
              >
                <Text variant="xs">{category}</Text>
              </Clickable>

              <ArtworkDetailsMediumModalFragmentContainer
                artwork={data}
                show={openMediumModal}
                onClose={() => setOpenMediumModal(false)}
              />
            </>
          ) : (
            <Text variant="xs" color="black100">
              {category}
            </Text>
          )}
        </>
      ),
    },
    {
      title: "Condition",
      value: canRequestLotConditionsReport ? (
        <RequestConditionReportQueryRenderer artworkID={internalID} />
      ) : (
        conditionDescription && conditionDescription.details
      ),
      onReadMoreClicked: () => {
        trackEvent({
          action_type: "Click",
          context_module: "Condition",
          subject: "Read more",
        })
      },
      onTitleClick: () => {
        setOpenConditionModal(true)
      },
    },

    {
      title: "Signature",
      value: signatureInfo && signatureInfo.details,
    },
    {
      title: "Certificate of authenticity",
      value: certificateOfAuthenticity && certificateOfAuthenticity.details,
    },
    { title: "Series", value: series },
    { title: "Publisher", value: publisher },
    { title: "Manufacturer", value: manufacturer },
    { title: "Image rights", value: image_rights },
  ]

  const allDisplayItems = listItems.filter(
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

  const Container = isUnlisted ? Flex : StackableBorderBox

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
