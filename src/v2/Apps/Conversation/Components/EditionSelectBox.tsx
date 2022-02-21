import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, BorderBox, Flex, Text, Radio } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { EditionSelectBox_edition$data } from "v2/__generated__/EditionSelectBox_edition.graphql"

const UnavailableIndicator = styled(Box)`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: ${themeGet("colors.red100")};
  margin-right: 6px;
`

interface Props {
  edition: EditionSelectBox_edition$data
  selected: boolean
  onSelect: (editionSetId: string, isAvailable: boolean) => void
}

export const EditionSelectBox: React.FC<Props> = ({
  edition,
  selected,
  onSelect,
}) => {
  const isOfferable = !!edition.isOfferableFromInquiry

  return (
    <BorderBox
      onClick={() => {
        onSelect(edition.internalID, isOfferable)
      }}
      mx={2}
      mb={1}
      flexDirection="row"
      alignItems="start"
    >
      <Radio disabled={!isOfferable} selected={selected} />
      <Flex flexGrow={1} flexDirection="column">
        <Text color={isOfferable ? "black100" : "black30"}>
          {edition.dimensions?.in}
        </Text>
        <Text color={isOfferable ? "black60" : "black30"}>
          {edition.dimensions?.cm}
        </Text>
        <Text color={isOfferable ? "black60" : "black30"}>
          {edition.editionOf}
        </Text>
      </Flex>
      {isOfferable ? (
        <Text>{edition.listPrice?.display || "Contact for price"}</Text>
      ) : (
        <Flex flexDirection="row" alignItems="baseline">
          <UnavailableIndicator />
          <Text>Unavailable</Text>
        </Flex>
      )}
    </BorderBox>
  )
}

export const EditionSelectBoxFragmentContainer = createFragmentContainer(
  EditionSelectBox,
  {
    edition: graphql`
      fragment EditionSelectBox_edition on EditionSet {
        internalID
        editionOf
        isOfferableFromInquiry
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
    `,
  }
)
