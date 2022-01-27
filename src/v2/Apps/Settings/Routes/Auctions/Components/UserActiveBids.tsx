import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Button,
  Column,
  Image,
  Flex,
  Text,
  Box,
  Separator,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SectionContainer } from "./SectionContainer"
import { UserActiveBids_me } from "v2/__generated__/UserActiveBids_me.graphql"
import { DetailsFragmentContainer } from "v2/Components/Artwork/Details"

interface UserActiveBidsProps {
  me: UserActiveBids_me
}

export const UserActiveBids: React.FC<UserActiveBidsProps> = ({
  me: { lotStandings },
}) => {
  if (!lotStandings || lotStandings.length === 0) {
    return <SectionContainer title="Active Bids"></SectionContainer>
  }

  return (
    <SectionContainer title="Active Bids">
      {lotStandings.map((lot, i) => {
        if (!lot) return null

        const { saleArtwork } = lot

        if (!saleArtwork) return null

        const { artwork } = saleArtwork

        if (!artwork) return null

        const image = artwork.image?.cropped

        return (
          <React.Fragment key={i}>
            <Column span={8}>
              <RouterLink
                to={artwork.href}
                display="flex"
                textDecoration="none"
              >
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
                    <Text
                      color="black60"
                      variant="xs"
                      textTransform="uppercase"
                    >
                      Lot {saleArtwork.lotLabel}
                    </Text>
                  )}

                  <DetailsFragmentContainer
                    includeLinks={false}
                    artwork={artwork}
                  />
                </Flex>
              </RouterLink>
            </Column>

            <Column span={2}>
              <Flex alignItems="center">
                {lot.isLeadingBidder ? (
                  <Text
                    variant="xs"
                    color="green100"
                    overflowEllipsis
                    display="flex"
                    alignItems="center"
                  >
                    <ArrowUpCircleIcon height={15} width={15} fill="green100" />
                    &nbsp; Highest bid
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
                to={lot?.saleArtwork?.artwork?.href ?? ""}
                width="100%"
              >
                Bid
              </Button>
            </Column>

            {i !== lotStandings.length - 1 && (
              <Column span={12}>
                <Separator />
              </Column>
            )}
          </React.Fragment>
        )
      })}
    </SectionContainer>
  )
}

export const UserActiveBidsFragmentContainer = createFragmentContainer(
  UserActiveBids,
  {
    me: graphql`
      fragment UserActiveBids_me on Me {
        lotStandings(live: true) {
          isLeadingBidder
          saleArtwork {
            lotLabel
            highestBid {
              display
            }
            counts {
              bidderPositions
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
      }
    `,
  }
)
