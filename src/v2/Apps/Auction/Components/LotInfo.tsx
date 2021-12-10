import { Box, Flex, Text } from "@artsy/palette"
import { LotInfo_artwork } from "v2/__generated__/LotInfo_artwork.graphql"
import { LotInfo_saleArtwork } from "v2/__generated__/LotInfo_saleArtwork.graphql"
import * as React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"

interface Props {
  artwork: LotInfo_artwork
  saleArtwork: LotInfo_saleArtwork
  relay: RelayProp
}

export const LotInfo: React.FC<Props> = ({ artwork, saleArtwork }) => {
  const {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    counts: { bidderPositions: bidCount },
  } = saleArtwork
  return (
    <Flex py={4}>
      <Box maxWidth="150px" width="100%" height="auto" p={0}>
        <div
          style={{
            width: "100%",
            paddingBottom: "100%",
            backgroundImage: `url(${artwork.imageUrl})`,
            backgroundSize: "contain",
          }}
        />
      </Box>
      <Flex pl={2} pt={1} flexDirection="column">
        <Text variant="md" color="black100">
          Lot {saleArtwork.lotLabel}
        </Text>
        <Text variant="md" color="black100">
          <i>{artwork.title}</i>
          {artwork.date && `, ${artwork.date}`}
        </Text>
        <Text variant="md" color="black100">
          {artwork.artistNames}
        </Text>
        <br />
        <Text variant="md" color="black100" fontWeight="bold">
          Current Bid: {saleArtwork.minimumNextBid?.display}
        </Text>
        {bidCount > 0 && (
          <Text variant="md" color="black60">
            ({bidCount} bid{bidCount > 1 && "s"})
          </Text>
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
