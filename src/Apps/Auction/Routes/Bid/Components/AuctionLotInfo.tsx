import { Box, BoxProps, Flex, Image, Text } from "@artsy/palette"
import { AuctionLotInfo_saleArtwork$data } from "__generated__/AuctionLotInfo_saleArtwork.graphql"
import * as React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"

interface AuctionLotInfoProps extends BoxProps {
  hideLotInfo?: boolean
  saleArtwork: AuctionLotInfo_saleArtwork$data
  relay: RelayProp
}

const AuctionLotInfo: React.FC<AuctionLotInfoProps> = ({
  hideLotInfo = false,
  saleArtwork,
  ...rest
}) => {
  const artwork = saleArtwork.artwork
  const bidCount = saleArtwork.counts?.bidderPositions

  if (!artwork) {
    return null
  }

  return (
    <Flex alignItems="center" {...rest}>
      <RouterLink
        to={`/artwork/${artwork?.slug}`}
        flexShrink={0}
        width={150} // keep the box area consistent
        display="flex"
        justifyContent="center"
        bg="white100"
      >
        <Image
          src={artwork?.image?.resized?.src}
          srcSet={artwork?.image?.resized?.srcSet}
          width={artwork?.image?.resized?.width}
          height={artwork?.image?.resized?.height}
          lazyLoad
        />
      </RouterLink>

      <Box pl={1}>
        <Text variant="sm-display">
          Lot {saleArtwork.lotLabel}{" "}
          {saleArtwork.formattedEndDateTime &&
            `• ${saleArtwork.formattedEndDateTime}`}
        </Text>
        <Text variant="sm-display">
          <i>{artwork.title}</i>
          {artwork.date && `, ${artwork.date}`}
        </Text>
        <Text variant="sm-display">{artwork.artistNames}</Text>

        {!hideLotInfo && (
          <>
            <Text variant="sm-display" fontWeight="bold" mt={1}>
              Current Bid: {saleArtwork.currentBid?.display}
            </Text>

            {bidCount > 0 && (
              <Text variant="sm-display" color="black60">
                ({bidCount} bid{bidCount > 1 && "s"})
              </Text>
            )}
          </>
        )}
      </Box>
    </Flex>
  )
}

export const AuctionLotInfoFragmentContainer = createFragmentContainer(
  AuctionLotInfo,
  {
    saleArtwork: graphql`
      fragment AuctionLotInfo_saleArtwork on SaleArtwork
        @argumentDefinitions(
          imageWidth: { type: "Int", defaultValue: 100 }
          imageHeight: { type: "Int", defaultValue: 100 }
        ) {
        counts {
          bidderPositions
        }
        lotLabel
        currentBid {
          display
        }
        formattedEndDateTime
        artwork {
          internalID
          date
          title
          image {
            resized(
              width: $imageWidth
              height: $imageHeight
              version: "medium"
            ) {
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
