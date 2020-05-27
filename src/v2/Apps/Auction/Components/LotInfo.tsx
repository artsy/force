import { Box, Flex, ResponsiveImage, Sans, Serif } from "@artsy/palette"
import { LotInfo_artwork } from "v2/__generated__/LotInfo_artwork.graphql"
import { LotInfo_saleArtwork } from "v2/__generated__/LotInfo_saleArtwork.graphql"
import React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"

interface Props {
  artwork: LotInfo_artwork
  saleArtwork: LotInfo_saleArtwork
  relay: RelayProp
}

export const LotInfo: React.FC<Props> = ({ artwork, saleArtwork }) => {
  const {
    counts: { bidderPositions: bidCount },
  } = saleArtwork
  return (
    <Flex py={4}>
      <Box maxWidth="150px" width="100%" height="auto" p={0}>
        <ResponsiveImage src={artwork.imageUrl} />
      </Box>
      <Flex pl={3} pt={1} flexDirection="column">
        <Sans size="3" weight="medium" color="black100">
          Lot {saleArtwork.lotLabel}
        </Sans>
        <Serif size="3" color="black100">
          <i>{artwork.title}</i>
          {artwork.date && `, ${artwork.date}`}
        </Serif>
        <Serif size="3" color="black100">
          {artwork.artistNames}
        </Serif>
        <br />
        <Serif size="3">
          Current Bid: {saleArtwork.minimumNextBid.display}
        </Serif>
        {bidCount > 0 && (
          <Serif size="3" color="black60">
            ({bidCount} bid{bidCount > 1 && "s"})
          </Serif>
        )}
      </Flex>
    </Flex>
  )
}

export const LotInfoFragmentContainer = createFragmentContainer(LotInfo, {
  artwork: graphql`
    fragment LotInfo_artwork on Artwork {
      internalID
      date
      title
      imageUrl
      artistNames
    }
  `,
  saleArtwork: graphql`
    fragment LotInfo_saleArtwork on SaleArtwork {
      counts {
        bidderPositions
      }
      lotLabel
      minimumNextBid {
        amount
        cents
        display
      }
    }
  `,
})
