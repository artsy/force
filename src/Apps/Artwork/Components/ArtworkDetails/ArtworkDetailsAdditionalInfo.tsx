import { ContextModule } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Clickable,
  Flex,
  type FlexProps,
  ReadMore,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { ConditionInfoModal } from "Apps/Artwork/Components/ArtworkDetails/ConditionInfoModal"
import { ArtworkDetailsMediumModalFragmentContainer } from "Apps/Artwork/Components/ArtworkDetailsMediumModal"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"
import {
  DefinitionList,
  type DefinitionListItem,
} from "Components/DefinitionList"
import { useSelectedEditionSetContext } from "Apps/Artwork/Components/SelectedEditionSetContext"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtworkDetailsAdditionalInfo_artwork$data } from "__generated__/ArtworkDetailsAdditionalInfo_artwork.graphql"
import type { PrivateArtworkAdditionalInfo_artwork$data } from "__generated__/PrivateArtworkAdditionalInfo_artwork.graphql"
import { useState } from "react"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { RequestConditionReportQueryRenderer } from "./RequestConditionReport"

export interface ArtworkDetailsAdditionalInfoProps extends FlexProps {
  artwork: ArtworkDetailsAdditionalInfo_artwork$data
}

export const ArtworkDetailsAdditionalInfo: React.FC<
  React.PropsWithChildren<ArtworkDetailsAdditionalInfoProps>
> = ({ artwork, ...flexProps }) => {
  const { listItems, openConditionModal, setOpenConditionModal } =
    useArtworkDetailsAdditionalInfoFields({ artwork })

  if (listItems.length === 0) {
    return null
  }

  const Container = artwork.isUnlisted ? Flex : StackableBorderBox

  return (
    <>
      {openConditionModal && (
        <ConditionInfoModal onClose={() => setOpenConditionModal(false)} />
      )}
      <Container flexDirection="column" {...flexProps}>
        <DefinitionList items={listItems} aria-label="Artwork details" />
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
    imageRights,
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
    selectedEditionSet ? selectedEditionSet?.dimensions : dimensions,
  )

  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const [openMediumModal, setOpenMediumModal] = useState(false)
  const [openRarityModal, setOpenRarityModal] = useState(false)
  const [openConditionModal, setOpenConditionModal] = useState(false)

  const allListItems: DefinitionListItem[] = [
    {
      term: "Materials",
      value: medium,
    },
    {
      term: "Size",
      value: dimensionsLabel,
    },
    {
      term: "Rarity",
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
            color="mono60"
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
      term: "Medium",
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
                color="mono60"
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
            <Text variant="xs" color="mono60">
              {category}
            </Text>
          )}
        </>
      ),
    },
    {
      term: "Condition",
      value: canRequestLotConditionsReport ? (
        <RequestConditionReportQueryRenderer artworkID={internalID} />
      ) : conditionDescription?.details ? (
        <Text variant="xs">
          <ReadMore
            onReadMoreClicked={() => {
              trackEvent({
                action_type: "Click",
                context_module: "Condition",
                subject: "Read more",
              })
            }}
            maxLines={2}
            content={conditionDescription.details}
          />
        </Text>
      ) : null,
      onTermClick: () => {
        setOpenConditionModal(true)
      },
    },

    {
      term: "Signature",
      value: signatureInfo && signatureInfo.details,
    },
    {
      term: "Certificate of authenticity",
      value: certificateOfAuthenticity && certificateOfAuthenticity.details,
    },
    {
      term: "Frame",
      value: framed && framed.details,
    },
    { term: "Series", value: series },
    { term: "Publisher", value: publisher },
    { term: "Manufacturer", value: manufacturer },
    { term: "Image rights", value: imageRights },
  ]

  const listItems = allListItems.filter(
    item => item.value != null && item.value !== "",
  )

  return {
    listItems,
    openConditionModal,
    setOpenConditionModal,
  }
}

export const ArtworkDetailsAdditionalInfoFragmentContainer =
  createFragmentContainer(ArtworkDetailsAdditionalInfo, {
    artwork: graphql`
      fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
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
    `,
  })
