import { FC, Fragment } from "react"
import { Button, Column, Image, Flex, Text, Box } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { DetailsFragmentContainer } from "Components/Artwork/Details"
import { SettingsAuctionsLotStanding_lotStanding$data } from "__generated__/SettingsAuctionsLotStanding_lotStanding.graphql"
import ChevronCircleUpIcon from "@artsy/icons/ChevronCircleUpIcon"
import ChevronCircleDownIcon from "@artsy/icons/ChevronCircleDownIcon"

interface SettingsAuctionsLotStandingProps {
  lotStanding: SettingsAuctionsLotStanding_lotStanding$data
}

const SettingsAuctionsLotStanding: FC<SettingsAuctionsLotStandingProps> = ({
  lotStanding,
}) => {
  if (!lotStanding) return null

  const { saleArtwork, isLeadingBidder } = lotStanding

  if (!saleArtwork) return null

  const { artwork, sale } = saleArtwork

  if (!artwork || !sale) return null

  const image = artwork.image?.cropped

  return (
    <Fragment>
      <Column span={8}>
        <RouterLink to={artwork.href} display="flex" textDecoration="none">
          <Box flexShrink={0}>
            {image ? (
              <Image
                lazyLoad
                width={100}
                height={100}
                src={image.src}
                srcSet={image.srcSet}
                alt=""
              />
            ) : (
              <Box width={100} height={100} bg="black10" />
            )}
          </Box>

          <Flex
            ml={2}
            justifyContent="center"
            flexDirection="column"
            minWidth={0}
          >
            {saleArtwork.lotLabel && (
              <Text color="black60" variant="xs">
                Lot {saleArtwork.lotLabel}
              </Text>
            )}

            <DetailsFragmentContainer includeLinks={false} artwork={artwork} />
          </Flex>
        </RouterLink>
      </Column>

      <Column span={2}>
        <Flex alignItems="center">
          {isLeadingBidder ? (
            <Text
              variant="xs"
              color="green100"
              overflowEllipsis
              display="flex"
              alignItems="center"
            >
              <ChevronCircleUpIcon height={15} width={15} fill="green100" />
              &nbsp; Highest Bid
            </Text>
          ) : (
            <Text
              variant="xs"
              color="red100"
              overflowEllipsis
              display="flex"
              alignItems="center"
            >
              <ChevronCircleDownIcon height={15} width={15} fill="red100" />
              &nbsp; Outbid
            </Text>
          )}
        </Flex>
      </Column>

      <Column span={2}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to={artwork.href}
          width="100%"
          variant={sale.isClosed ? "secondaryBlack" : "primaryBlack"}
        >
          {sale.isClosed ? "View Lot" : "Bid"}
        </Button>
      </Column>
    </Fragment>
  )
}

export const SettingsAuctionsLotStandingFragmentContainer = createFragmentContainer(
  SettingsAuctionsLotStanding,
  {
    lotStanding: graphql`
      fragment SettingsAuctionsLotStanding_lotStanding on LotStanding {
        isLeadingBidder
        saleArtwork {
          lotLabel
          sale {
            isClosed
          }
          artwork {
            ...Details_artwork
            href
            image {
              cropped(height: 100, width: 100) {
                src
                srcSet
              }
            }
          }
        }
      }
    `,
  }
)
