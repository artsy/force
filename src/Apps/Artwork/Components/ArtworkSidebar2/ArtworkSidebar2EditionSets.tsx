import {
  Box,
  Flex,
  RadioGroup,
  Radio,
  Separator,
  Text,
  FlexProps,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebar2EditionSets_artwork$data } from "__generated__/ArtworkSidebar2EditionSets_artwork.graphql"
import React from "react"
import { ArtworkSidebar2SizeInfoFragmentContainer } from "./ArtworkSidebar2SizeInfo"

const Row: React.FC<FlexProps> = ({ children, ...others }) => (
  <Flex justifyContent="left" {...others}>
    {children}
  </Flex>
)

type EditionSet = NonNullable<
  ArtworkSidebar2EditionSets_artwork$data["editionSets"]
>[0]

interface ArtworkSidebar2EditionSetsProps {
  artwork: ArtworkSidebar2EditionSets_artwork$data
  selectedEditionSet?: EditionSet
  onSelectEditionSet?: (editionSet: EditionSet) => void
}

const ArtworkSidebar2EditionSets: React.FC<ArtworkSidebar2EditionSetsProps> = ({
  artwork,
}) => {
  const { editionSets, isInquireable, isOfferable, isAcquireable } = artwork

  const renderEditionSet = (editionSet: EditionSet) => {
    const editionEcommerceAvailable =
      editionSet?.isAcquireable || editionSet?.isOfferable || isInquireable

    const editionFragment = (
      <Flex justifyContent="space-between" flex={1}>
        {/* @ts-ignore RELAY UPGRADE 13 */}
        <ArtworkSidebar2SizeInfoFragmentContainer piece={editionSet!} />

        <Text
          ml={1}
          variant="sm-display"
          color="black100"
          data-test="SaleMessage"
        >
          {editionSet?.saleMessage}
        </Text>
      </Flex>
    )

    if (!!(isOfferable || isAcquireable || isInquireable)) {
      return (
        <Row>
          <Radio
            flex={1}
            onSelect={() => {
              // TODO: will be added in the next pr
              // this.setState({ selectedEditionSet: editionSet })
            }}
            selected={
              // TODO: will be added in the next pr
              false
            }
            disabled={!editionEcommerceAvailable}
            label={editionFragment}
          />
        </Row>
      )
    } else {
      return <Row>{editionFragment}</Row>
    }
  }

  return (
    <RadioGroup>
      {
        editionSets?.map((editionSet, index) => (
          <React.Fragment key={editionSet?.id}>
            <Box py={2}>{renderEditionSet(editionSet)}</Box>
            {index !== editionSets.length - 1 && <Separator />}
          </React.Fragment>
        ))!
      }
    </RadioGroup>
  )
}

export const ArtworkSidebar2EditionSetFragmentContainer = createFragmentContainer(
  ArtworkSidebar2EditionSets,
  {
    artwork: graphql`
      fragment ArtworkSidebar2EditionSets_artwork on Artwork {
        isInquireable
        isOfferable
        isAcquireable
        editionSets {
          id
          isOfferable
          isAcquireable
          saleMessage
          ...ArtworkSidebar2SizeInfo_piece
        }
      }
    `,
  }
)
