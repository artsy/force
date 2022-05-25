import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Flex, Text, BorderedRadio } from "@artsy/palette"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

import { EditionSelectBox_edition } from "v2/__generated__/EditionSelectBox_edition.graphql"

const UnavailableIndicator = styled(Box)`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background-color: ${themeGet("colors.red100")};
  margin-right: 6px;
`

interface Props {
  edition: EditionSelectBox_edition
  selected: boolean
  onSelect: (editionSetId: string, isAvailable: boolean) => void
}

export const EditionSelectBox: React.FC<Props> = ({
  edition,
  selected,
  onSelect,
}) => {
  const isOfferable = !!edition.isOfferableFromInquiry || !!edition.isOfferable

  return (
    <BorderedRadio
      onSelect={() => {
        onSelect(edition.internalID, isOfferable)
      }}
      disabled={!isOfferable}
      selected={selected}
    >
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
    </BorderedRadio>
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
        isOfferable
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
