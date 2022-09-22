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
import React, { Dispatch, SetStateAction } from "react"
import { ArtworkSidebar2SizeInfoFragmentContainer } from "./ArtworkSidebar2SizeInfo"

const Row: React.FC<FlexProps> = ({ children, ...others }) => (
  <Flex justifyContent="left" {...others}>
    {children}
  </Flex>
)

export type EditionSet = NonNullable<
  ArtworkSidebar2EditionSets_artwork$data["editionSets"]
>[0]

interface ArtworkSidebar2EditionSetsProps {
  artwork: ArtworkSidebar2EditionSets_artwork$data
  selectedEditionSet?: EditionSet
  onSelectEditionSet?: Dispatch<SetStateAction<EditionSet>>
}

const ArtworkSidebar2EditionSets: React.FC<ArtworkSidebar2EditionSetsProps> = ({
  artwork,
  selectedEditionSet,
  onSelectEditionSet,
}) => {
  const { editionSets, isInquireable, isOfferable, isAcquireable } = artwork

  const renderEditionSet = (editionSet: EditionSet) => {
    const editionEcommerceAvailable =
      editionSet?.isAcquireable || editionSet?.isOfferable || isInquireable

    const editionFragment = (
      <Flex justifyContent="space-between" flex={1}>
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
              onSelectEditionSet?.(editionSet)
            }}
            selected={selectedEditionSet?.id === editionSet?.id}
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
          internalID
          isOfferable
          isAcquireable
          saleMessage
          ...ArtworkSidebar2SizeInfo_piece
        }
      }
    `,
  }
)
