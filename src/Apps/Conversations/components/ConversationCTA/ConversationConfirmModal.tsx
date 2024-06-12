import {
  Button,
  Expandable,
  Flex,
  ModalDialog,
  Spacer,
  Image,
  Text,
  Separator,
  BorderedRadio,
  Box,
} from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import {
  ConversationConfirmModal_artwork$data,
  ConversationConfirmModal_artwork$key,
} from "__generated__/ConversationConfirmModal_artwork.graphql"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { useState } from "react"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { ConversationMakeOfferButton } from "Apps/Conversations/components/ConversationCTA/ConversationMakeOfferButton"
import { ConversationPurchaseButton } from "Apps/Conversations/components/ConversationCTA/ConversationPurchaseButton"
import { useConversationPurchaseButtonData_conversation$key } from "__generated__/useConversationPurchaseButtonData_conversation.graphql"

interface ConversationConfirmModalProps {
  artwork: ConversationConfirmModal_artwork$key
  conversation: useConversationPurchaseButtonData_conversation$key
  partnerOffer: { internalID: string } | null
}

export const ConversationConfirmModal: React.FC<ConversationConfirmModalProps> = ({
  artwork,
  conversation,
  partnerOffer,
}) => {
  const data = useFragment(FRAGMENT, artwork)

  const {
    isCreatingOfferOrder,
    isConfirmModalVisible,
    hideSelectEditionSetModal,
  } = useConversationsContext()

  const firstEditionSet = data.editionSets?.[0]
  const firstEditionSetID = firstEditionSet?.internalID as string

  const [selectedEdition, setSelectedEdition] = useState<string | null>(
    data.editionSets?.length === 1 ? firstEditionSetID : null
  )

  const isActionable =
    !!data?.isEdition ||
    !!data?.isOfferable ||
    !!data?.isOfferableFromInquiry ||
    !!data?.isAcquireable

  if (!isActionable) {
    return null
  }

  if (!isConfirmModalVisible) {
    return null
  }

  const detailItems = getArtworkDetailItems(data)

  const showEditionSetsSelectBox = Boolean(
    data.isEdition && data.editionSets?.length
  )

  return (
    <ModalDialog
      onClose={() => hideSelectEditionSetModal()}
      title="Select edition set"
      footer={
        <Flex flexGrow={1}>
          <Button
            variant="secondaryBlack"
            flexGrow={1}
            onClick={hideSelectEditionSetModal}
          >
            Cancel
          </Button>
          <Spacer x={1} y={1} />

          {isCreatingOfferOrder ? (
            <ConversationMakeOfferButton conversation={conversation} />
          ) : (
            <ConversationPurchaseButton
              conversation={conversation}
              partnerOffer={partnerOffer}
            />
          )}
        </Flex>
      }
    >
      <Expandable
        label={
          <Flex py={1}>
            {!!data.image && (
              <Image
                width={data.image.resized?.width}
                height={data.image.resized?.height}
                src={data.image.resized?.src}
                srcSet={data.image.resized?.srcSet}
                alt={data.title ?? ""}
              />
            )}
            <Flex flexDirection="column" ml={1}>
              <Text mb={0.5}>{data.artistNames}</Text>
              <Text variant="xs" color="black60">
                {data.title}, {data.date}
              </Text>
            </Flex>
          </Flex>
        }
        pb={1}
      >
        <Flex
          flexDirection="column"
          maxHeight="230px"
          overflowY="scroll"
          pr={2}
        >
          {detailItems.map(({ title, value }, index) => {
            return (
              <Flex flexDirection="column" mt={2} key={index}>
                <Text>{title}</Text>
                <Text color="black60" style={{ whiteSpace: "pre-line" }}>
                  {value}
                </Text>
              </Flex>
            )
          })}
        </Flex>
      </Expandable>

      <Separator mb={2} />

      {showEditionSetsSelectBox && (
        <Flex flexDirection="column">
          {data.editionSets?.map((edition, index) => {
            if (!edition) {
              return null
            }

            const selected = edition.internalID === selectedEdition

            const isActionable =
              !!edition.isOfferableFromInquiry ||
              !!edition.isOfferable ||
              !!edition.isAcquireable

            return (
              <BorderedRadio
                key={index}
                onSelect={() => {
                  if (isActionable) {
                    setSelectedEdition(edition.internalID)
                  }
                }}
                disabled={!isActionable}
                selected={selected}
              >
                <Flex flexGrow={1} flexDirection="column">
                  <Text color={isActionable ? "black100" : "black30"}>
                    {edition.dimensions?.in}
                  </Text>
                  <Text color={isActionable ? "black60" : "black30"}>
                    {edition.dimensions?.cm}
                  </Text>
                  <Text color={isActionable ? "black60" : "black30"}>
                    {edition.editionOf}
                  </Text>
                </Flex>

                {isActionable ? (
                  <Text>
                    {edition.listPrice?.display || "Contact for price"}
                  </Text>
                ) : (
                  <Flex flexDirection="row" alignItems="baseline">
                    <UnavailableIndicator />
                    <Text>Unavailable</Text>
                  </Flex>
                )}
              </BorderedRadio>
            )
          })}
        </Flex>
      )}
    </ModalDialog>
  )
}

const FRAGMENT = graphql`
  fragment ConversationConfirmModal_artwork on Artwork {
    category
    artistNames
    date
    internalID
    isEdition
    manufacturer
    medium
    publisher
    saleMessage
    title
    isOfferable
    isAcquireable
    isOfferableFromInquiry
    attributionClass {
      name
    }
    image {
      resized(width: 40, height: 40) {
        src
        srcSet
        width
        height
      }
    }
    conditionDescription {
      details
    }
    certificateOfAuthenticity {
      details
    }
    framed {
      details
    }
    dimensions {
      in
      cm
    }
    signatureInfo {
      details
    }
    editionSets {
      internalID
      editionOf
      isOfferableFromInquiry
      isOfferable
      isAcquireable
      listPrice {
        ... on Money {
          display
        }
        ... on PriceRange {
          display
        }
      }
      dimensions {
        cm
        in
      }
    }
  }
`

const UnavailableIndicator = styled(Box)`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: ${themeGet("colors.red100")};
  margin-right: 6px;
`

const getArtworkDetailItems = (
  artwork: ConversationConfirmModal_artwork$data
) => {
  const items = [
    {
      title: "Price",
      value: artwork.saleMessage,
    },
    {
      title: "Medium",
      value: artwork.category,
    },
    {
      title: "Manufacturer",
      value: artwork.manufacturer,
    },
    {
      title: "Publisher",
      value: artwork.publisher,
    },
    {
      title: "Materials",
      value: artwork.medium,
    },
    {
      title: "Classification",
      value: artwork.attributionClass?.name,
    },
    {
      title: "Dimensions",
      value: [artwork.dimensions?.in, artwork.dimensions?.cm]
        .filter(d => d)
        .join("\n"),
    },
    {
      title: "Signature",
      value: artwork.signatureInfo?.details,
    },
    {
      title: "Frame",
      value: artwork.framed?.details,
    },
    {
      title: "Certificate of Authenticity",
      value: artwork.certificateOfAuthenticity?.details,
    },
    {
      title: "Condition",
      value: artwork.conditionDescription?.details,
    },
  ].filter(item => {
    return item.value != null && item.value !== ""
  })

  return items
}
