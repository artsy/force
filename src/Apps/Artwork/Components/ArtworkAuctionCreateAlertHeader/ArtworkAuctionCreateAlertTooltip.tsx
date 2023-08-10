import { Box, Flex, Pill, Text, Tooltip } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import InfoIcon from "@artsy/icons/InfoIcon"
import { compact } from "lodash"
import { ArtworkAuctionCreateAlertTooltip_artwork$data } from "__generated__/ArtworkAuctionCreateAlertTooltip_artwork.graphql"

interface ArtworkAuctionCreateAlertTooltipProps {
  artwork: ArtworkAuctionCreateAlertTooltip_artwork$data
}

const ArtworkAuctionCreateAlertTooltip: React.FC<ArtworkAuctionCreateAlertTooltipProps> = ({
  artwork,
}) => {
  const labels = compact([
    artwork.artistNames,
    artwork.mediumType?.filterGene?.name,
    artwork.attributionClass?.name,
  ])

  const pills = labels.map((label, index) => ({
    id: `${artwork.internalID}-pill-${index}`,
    label,
  }))

  if (pills.length === 0) {
    return null
  }

  return (
    <Flex justifyContent="center" alignItems="center" mt={4}>
      <Text variant="sm">
        Available works by {artwork.artistNames} based on similar tags and
        auction activity.
      </Text>
      <Tooltip
        width="auto"
        content={
          <>
            <Text variant="xs" mb={0.5}>
              We are showing you works you may have missed that match the
              similar tags. <br />
              All works are available and ready to purchase.
            </Text>
            {pills.map(pill => {
              return (
                <Pill
                  key={pill.id}
                  variant="filter"
                  disabled
                  width="auto"
                  mr={0.5}
                >
                  {pill.label}
                </Pill>
              )
            })}
          </>
        }
        placement="bottom"
      >
        <Box as="span" ml={0.5}>
          <InfoIcon />
        </Box>
      </Tooltip>
    </Flex>
  )
}
export const ArtworkAuctionCreateAlertTooltipFragmentContainer = createFragmentContainer(
  ArtworkAuctionCreateAlertTooltip,
  {
    artwork: graphql`
      fragment ArtworkAuctionCreateAlertTooltip_artwork on Artwork {
        artistNames
        internalID
        attributionClass {
          name
        }
        mediumType {
          filterGene {
            name
          }
        }
      }
    `,
  }
)
