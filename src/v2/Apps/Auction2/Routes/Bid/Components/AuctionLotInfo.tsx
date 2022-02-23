import { Box, Flex, Image, Text } from "@artsy/palette"
import { AuctionLotInfo_saleArtwork } from "v2/__generated__/AuctionLotInfo_saleArtwork.graphql"
import * as React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"

interface AuctionLotInfoProps {
  saleArtwork: AuctionLotInfo_saleArtwork
  relay: RelayProp
}

const AuctionLotInfo: React.FC<AuctionLotInfoProps> = ({ saleArtwork }) => {
  const artwork = saleArtwork.artwork
  const bidCount = saleArtwork.counts?.bidderPositions!

  if (!artwork) {
    return null
  }

  return (
    <Flex alignItems="center">
      <RouterLink to={`/artwork/${artwork?.slug}`}>
        <Image
          src={artwork?.image?.resized?.src}
          srcSet={artwork?.image?.resized?.srcSet}
          width={artwork?.image?.resized?.width}
          height={artwork?.image?.resized?.height}
          mr={1}
          lazyLoad
        />
      </RouterLink>

      <Box>
        <Text variant="md">Lot {saleArtwork.lotLabel}</Text>
        <Text variant="md">
          <i>{artwork.title}</i>
          {artwork.date && `, ${artwork.date}`}
        </Text>
        <Text variant="md">{artwork.artistNames}</Text>

        <Text variant="md" fontWeight="bold" mt={1}>
          Current Bid: {saleArtwork.currentBid?.display}
        </Text>

        {bidCount > 0 && (
          <Text variant="md" color="black60">
            ({bidCount} bid{bidCount > 1 && "s"})
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export const AuctionLotInfoFragmentContainer = createFragmentContainer(
  AuctionLotInfo,
  {
    saleArtwork: graphql`
      fragment AuctionLotInfo_saleArtwork on SaleArtwork {
        counts {
          bidderPositions
        }
        lotLabel
        currentBid {
          display
        }
        artwork {
          internalID
          date
          title
          image {
            resized(width: 150, height: 150, version: "square") {
              src
              srcSet
              width
              height
            }
          }
          imageUrl
          artistNames
          slug
        }
      }
    `,
  }
)
