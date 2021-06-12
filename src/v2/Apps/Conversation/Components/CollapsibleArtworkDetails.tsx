import { Expandable, Flex, Image, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { CollapsibleArtworkDetails_artwork } from "v2/__generated__/CollapsibleArtworkDetails_artwork.graphql"

const artworkDetailItems = (artwork: CollapsibleArtworkDetails_artwork) => {
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
  <Flex flexDirection="column" mt="20px">
    <Text>{title}</Text>
    <WrappedText color="black60">{children}</WrappedText>
  </Flex>
)

export interface CollapsibleArtworkDetailsProps {
  artwork: CollapsibleArtworkDetails_artwork
}

export const CollapsibleArtworkDetails: React.FC<CollapsibleArtworkDetailsProps> = ({
  artwork,
}) => {
  const detailItems = artwork && artworkDetailItems(artwork)
  return (
    artwork && (
      <Expandable
        pb="10px"
        label={
          <Flex alignItems="center" mt="10px" mx="20px" pb="10px">
            {!!artwork.image && (
              <Image
                width={artwork.image.resized?.width}
                height={artwork.image.resized?.height}
                // @ts-expect-error STRICT_NULL_CHECK
                src={artwork.image.resized?.src}
                srcSet={artwork.image.resized?.srcSet}
                alt={artwork.title ?? ""}
              />
            )}
            <Flex flexDirection="column" ml="15px">
              <Text>{artwork.artistNames}</Text>
              <Text color="black60">
                {artwork.title}, {artwork.date}
              </Text>
            </Flex>
          </Flex>
        }
      >
        <Flex flexDirection="column" mx="20px">
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
