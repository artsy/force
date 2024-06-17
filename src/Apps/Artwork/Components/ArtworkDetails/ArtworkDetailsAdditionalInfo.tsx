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
import { ArtworkDetailsAdditionalInfo_artwork$data } from "__generated__/ArtworkDetailsAdditionalInfo_artwork.graphql"
import { useState } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RequestConditionReportQueryRenderer } from "./RequestConditionReport"
import { ArtworkDetailsMediumModalFragmentContainer } from "Apps/Artwork/Components/ArtworkDetailsMediumModal"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkDefinitionList } from "Apps/Artwork/Components/ArtworkDefinitionList"
import { useTracking } from "react-tracking"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import { ConditionInfoModal } from "Apps/Artwork/Components/ArtworkDetails/ConditionInfoModal"
import { useSelectedEditionSetContext } from "Apps/Artwork/Components/SelectedEditionSetContext"
import { PrivateArtworkAdditionalInfo_artwork$data } from "__generated__/PrivateArtworkAdditionalInfo_artwork.graphql"

export interface ArtworkDetailsAdditionalInfoProps extends FlexProps {
  artwork: ArtworkDetailsAdditionalInfo_artwork$data
}

export const ArtworkDetailsAdditionalInfo: React.FC<ArtworkDetailsAdditionalInfoProps> = ({
  artwork,
  ...flexProps
}) => {
  const {
    listItems,
    openConditionModal,
    setOpenConditionModal,
  } = useArtworkDetailsAdditionalInfoFields({ artwork })

  const displayItems = listItems.filter(i => i.value != null && i.value !== "")

  if (displayItems.length === 0) {
    return null
  }

  const Container = artwork.isUnlisted ? Flex : StackableBorderBox

  return (
    <>
      {openConditionModal && (
        <ConditionInfoModal onClose={() => setOpenConditionModal(false)} />
      )}
      <Container flexDirection="column" {...flexProps}>
        <Join separator={<Spacer y={1} />}>
          {displayItems.map(
            ({ title, value, onReadMoreClicked, onTitleClick }, index) => (
              <ArtworkDefinitionList
                key={title + index}
                term={title}
                onTitleClick={onTitleClick}
              >
                <HTML variant="xs" color="black60">
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
              </ArtworkDefinitionList>
            )
          )}
        </Join>
      </Container>
    </>
  )
}

interface UseArtworkDetailsAdditionInfoFieldsProps {
  artwork:
    | ArtworkDetailsAdditionalInfo_artwork$data
    | PrivateArtworkAdditionalInfo_artwork$data
}

export const useArtworkDetailsAdditionalInfoFields = ({
  artwork,
}: UseArtworkDetailsAdditionInfoFieldsProps) => {
  const {
    category,
    series,
    publisher,
    manufacturer,
    image_rights,
    internalID,
    canRequestLotConditionsReport,
    framed,
    signatureInfo,
    conditionDescription,
    certificateOfAuthenticity,
    dimensions,
    attributionClass,
    medium,
  } = artwork

  const { selectedEditionSet } = useSelectedEditionSetContext()

  const { dimensionsLabel } = useArtworkDimensions(
    selectedEditionSet ? selectedEditionSet?.dimensions : dimensions
  )

  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const [openMediumModal, setOpenMediumModal] = useState(false)
  const [openRarityModal, setOpenRarityModal] = useState(false)
  const [openConditionModal, setOpenConditionModal] = useState(false)

  const listItems = [
    {
      title: "Materials",
      value: medium,
    },
    {
      title: "Size",
      value: dimensionsLabel,
    },
    {
      title: "Rarity",
      value: attributionClass?.name && (
        <>
          <Clickable
            onClick={() => {
              setOpenRarityModal(true)

              trackEvent({
                action_type: "Click",
                context_module: ContextModule.aboutTheWork,
                type: DeprecatedAnalyticsSchema.Type.Link,
                subject: "Rarity type info",
                context_page_owner_type: contextPageOwnerType,
                context_page_owner_id: contextPageOwnerId,
                context_page_owner_slug: contextPageOwnerSlug,
              })
            }}
            textDecoration="underline"
            color="black60"
          >
            <Text variant="xs">{attributionClass?.name}</Text>
          </Clickable>

          <ArtworkSidebarClassificationsModalQueryRenderer
            onClose={() => setOpenRarityModal(false)}
            show={openRarityModal}
            showDisclaimer={false}
          />
        </>
      ),
    },
    {
      title: "Medium",
      value: category && (
        <>
          {artwork.mediumType ? (
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
                color="black60"
              >
                <Text variant="xs">{category}</Text>
              </Clickable>

              <ArtworkDetailsMediumModalFragmentContainer
                artwork={artwork}
                show={openMediumModal}
                onClose={() => setOpenMediumModal(false)}
              />
            </>
          ) : (
            <Text variant="xs" color="black60">
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
    {
      title: "Frame",
      value: framed && framed.details,
    },
    { title: "Series", value: series },
    { title: "Publisher", value: publisher },
    { title: "Manufacturer", value: manufacturer },
    { title: "Image rights", value: image_rights },
  ]

  return {
    listItems,
    openConditionModal,
    setOpenConditionModal,
  }
}

export const ArtworkDetailsAdditionalInfoFragmentContainer = createFragmentContainer(
  ArtworkDetailsAdditionalInfo,
  {
    artwork: graphql`
      fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
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
    `,
  }
)
