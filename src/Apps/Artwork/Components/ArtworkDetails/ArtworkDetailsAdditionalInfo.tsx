import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Clickable,
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
import { useAnalyticsContext } from "System/Analytics"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkDefinitionList } from "Apps/Artwork/Components/ArtworkDefinitionList"
import { useTracking } from "react-tracking"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { ArtworkSidebarClassificationsModalQueryRenderer } from "Apps/Artwork/Components/ArtworkSidebarClassificationsModal"

export interface ArtworkDetailsAdditionalInfoProps {
  artwork: ArtworkDetailsAdditionalInfo_artwork$data
}

export const ArtworkDetailsAdditionalInfo: React.FC<ArtworkDetailsAdditionalInfoProps> = ({
  artwork,
}) => {
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

  const [openMediumModal, setOpenMediumModal] = useState(false)
  const [openRarityModal, setOpenRarityModal] = useState(false)

  const { dimensionsLabel } = useArtworkDimensions(dimensions)

  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

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

  const displayItems = listItems.filter(i => i.value != null && i.value !== "")

  if (displayItems.length === 0) {
    return null
  }

  return (
    <StackableBorderBox flexDirection="column">
      <Join separator={<Spacer y={1} />}>
        {displayItems.map(({ title, value }, index) => (
          <ArtworkDefinitionList key={title + index} term={title}>
            <HTML variant="xs" color="black60">
              {/* TODO: not sure why this check is here */}
              {React.isValidElement(value) ? (
                value
              ) : (
                <ReadMore maxChars={140} content={value as string} />
              )}
            </HTML>
          </ArtworkDefinitionList>
        ))}
      </Join>
    </StackableBorderBox>
  )
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
