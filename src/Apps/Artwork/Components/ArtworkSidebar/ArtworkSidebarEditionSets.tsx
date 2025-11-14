import { useSelectedEditionSetContext } from "Apps/Artwork/Components/SelectedEditionSetContext"
import {
  Box,
  Flex,
  type FlexProps,
  Radio,
  RadioGroup,
  Separator,
  Text,
} from "@artsy/palette"
import type { ArtworkSidebarEditionSets_artwork$data } from "__generated__/ArtworkSidebarEditionSets_artwork.graphql"
import React, { type Dispatch, type SetStateAction } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarSizeInfoFragmentContainer } from "./ArtworkSidebarSizeInfo"

const Row: React.FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  ...others
}) => (
  <Flex justifyContent="left" {...others}>
    {children}
  </Flex>
)

export type EditionSet = NonNullable<
  ArtworkSidebarEditionSets_artwork$data["editionSets"]
>[0]

interface ArtworkSidebarEditionSetsProps {
  artwork: ArtworkSidebarEditionSets_artwork$data
  selectedEditionSet?: EditionSet
  onSelectEditionSet?: Dispatch<SetStateAction<EditionSet>>
}

const ArtworkSidebarEditionSets: React.FC<
  React.PropsWithChildren<ArtworkSidebarEditionSetsProps>
> = ({ artwork, selectedEditionSet, onSelectEditionSet }) => {
  const { editionSets, isInquireable, isOfferable, isAcquireable } = artwork

  const { setSelectedEditionSet } = useSelectedEditionSetContext()

  const renderEditionSet = (editionSet: EditionSet) => {
    const editionEcommerceAvailable =
      editionSet?.isAcquireable || editionSet?.isOfferable || isInquireable

    const editionFragment = (
      <Flex justifyContent="space-between" flex={1}>
        <ArtworkSidebarSizeInfoFragmentContainer piece={editionSet!} />

        <Text
          ml={1}
          variant="sm-display"
          color="mono100"
          data-test="SaleMessage"
        >
          {editionSet?.saleMessage}
        </Text>
      </Flex>
    )

    if (isOfferable || isAcquireable || isInquireable) {
      return (
        <Row>
          <Radio
            flex={1}
            onSelect={() => {
              onSelectEditionSet?.(editionSet)
              setSelectedEditionSet(editionSet)
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
        )) as any
      }
    </RadioGroup>
  )
}

export const ArtworkSidebarEditionSetFragmentContainer =
  createFragmentContainer(ArtworkSidebarEditionSets, {
    artwork: graphql`
      fragment ArtworkSidebarEditionSets_artwork on Artwork {
        isInquireable
        isOfferable
        isAcquireable
        editionSets {
          id
          internalID
          isOfferable
          isAcquireable
          saleMessage
          dimensions {
            cm
            in
          }
          ...ArtworkSidebarSizeInfo_piece
        }
      }
    `,
  })
