import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Expandable, Flex, Image, Text } from "@artsy/palette"
import styled from "styled-components"

import { CollapsibleArtworkDetails_artwork$data } from "v2/__generated__/CollapsibleArtworkDetails_artwork.graphql"

const artworkDetailItems = (
  artwork: CollapsibleArtworkDetails_artwork$data
) => {
  const items = [
    { title: "Price", value: artwork.saleMessage },
    { title: "Medium", value: artwork.category },
    { title: "Manufacturer", value: artwork.manufacturer },
    { title: "Publisher", value: artwork.publisher },
    { title: "Materials", value: artwork.medium },
    { title: "Classification", value: artwork.attributionClass?.name },
    {
      title: "Dimensions",
      value: [artwork.dimensions?.in, artwork.dimensions?.cm]
        .filter(d => d)
        .join("\n"),
    },
    { title: "Signature", value: artwork.signatureInfo?.details },
    { title: "Frame", value: artwork.framed?.details },
    {
      title: "Certificate of Authenticity",
      value: artwork.certificateOfAuthenticity?.details,
    },
    { title: "Condition", value: artwork.conditionDescription?.details },
  ]

  return items.filter(i => i.value != null && i.value !== "")
}

// Needed for line break on Dimensions field
const WrappedText = styled(Text)`
  white-space: pre-line;
`

const Field: React.FC<{ title: string }> = ({ title, children }) => (
  <Flex flexDirection="column" mt={2}>
    <Text>{title}</Text>
    <WrappedText color="black60">{children}</WrappedText>
  </Flex>
)

export interface CollapsibleArtworkDetailsProps {
  artwork: CollapsibleArtworkDetails_artwork$data
}

export const CollapsibleArtworkDetails: React.FC<CollapsibleArtworkDetailsProps> = ({
  artwork,
}) => {
  const detailItems = artwork && artworkDetailItems(artwork)
  return (
    artwork && (
      <Expandable
        pb={1}
        label={
          <Flex alignItems="center" mt={1} mx={2} pb={1}>
            {!!artwork.image && (
              <Image
                width={artwork.image.resized?.width}
                height={artwork.image.resized?.height}
                src={artwork.image.resized?.src}
                srcSet={artwork.image.resized?.srcSet}
                alt={artwork.title ?? ""}
              />
            )}
            <Flex flexDirection="column" ml={1}>
              <Text mb={0.5}>{artwork.artistNames}</Text>
              <Text variant="xs" color="black60">
                {artwork.title}, {artwork.date}
              </Text>
            </Flex>
          </Flex>
        }
      >
        <Flex
          flexDirection="column"
          ml={2}
          pr={2}
          maxHeight="230px"
          overflowY="scroll"
        >
          {detailItems.map(({ title, value }, index) => (
            <Field key={index.toString()} title={title}>
              {value}
            </Field>
          ))}
        </Flex>
      </Expandable>
    )
  )
}

export const CollapsibleArtworkDetailsFragmentContainer = createFragmentContainer(
  CollapsibleArtworkDetails,
  {
    artwork: graphql`
      fragment CollapsibleArtworkDetails_artwork on Artwork {
        image {
          resized(width: 40, height: 40) {
            src
            srcSet
            width
            height
          }
        }
        internalID
        title
        date
        saleMessage
        attributionClass {
          name
        }
        category
        manufacturer
        publisher
        medium
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
        artistNames
      }
    `,
  }
)
