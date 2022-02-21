import { FC, Fragment } from "react"
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Button,
  Column,
  Image,
  Flex,
  Text,
  Box,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { DetailsFragmentContainer } from "v2/Components/Artwork/Details"
import { SettingsAuctionsLotStanding_lotStanding$data } from "v2/__generated__/SettingsAuctionsLotStanding_lotStanding.graphql"

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
              <Text color="black60" variant="xs" textTransform="uppercase">
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
              <ArrowUpCircleIcon height={15} width={15} fill="green100" />
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
              <ArrowDownCircleIcon height={15} width={15} fill="red100" />
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
          variant={sale.isClosed ? "secondaryOutline" : "primaryBlack"}
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
