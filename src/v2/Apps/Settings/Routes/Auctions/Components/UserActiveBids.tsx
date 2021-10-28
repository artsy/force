import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Button,
  Column,
  Image,
  Flex,
  Spacer,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SectionContainer } from "./SectionContainer"
import { UserActiveBids_me } from "v2/__generated__/UserActiveBids_me.graphql"

interface UserActiveBidsProps {
  me: UserActiveBids_me
}

export const UserActiveBids: React.FC<UserActiveBidsProps> = ({ me }) => {
  if (!me?.lotStandings) {
    return <SectionContainer title="Active Bids"></SectionContainer>
  }

  return (
    <SectionContainer title="Active Bids">
      {me.lotStandings.map((lot, i) => {
        if (!lot?.saleArtwork?.artwork) {
          return null
        }

        return (
          <Column
            key={i}
            span={8}
            pb={2}
            display="flex"
            justifyContent="space-between"
          >
            <Flex>
              <RouterLink to={lot.saleArtwork.artwork.href ?? ""} noUnderline>
                <Image
                  lazyLoad
                  width={100}
                  height={100}
                  src={lot.saleArtwork.artwork.image?.cropped?.src ?? ""}
                  srcSet={lot.saleArtwork.artwork.image?.cropped?.srcSet ?? ""}
                  alt=""
                />
              </RouterLink>

              <Flex ml={1} mr={1} flexDirection="column">
                <Text color="black60" variant="xs">
                  Lot {lot.saleArtwork.lotLabel ?? ""}
                </Text>

                <Spacer mb={0.5} />

                <Text color="black80" variant="sm">
                  {lot.saleArtwork.artwork.artist?.name ?? ""}
                </Text>

                <Text color="black60" variant="sm" fontStyle="italic">
                  {lot.saleArtwork.artwork.title ?? ""}
                </Text>

                <Spacer mb={0.5} />

                <Text color="black60" variant="xs">
                  {lot.saleArtwork.highestBid?.display ?? ""} (
                  {lot.saleArtwork.counts?.bidderPositions ?? ""} Bid)
                </Text>
              </Flex>
            </Flex>

            <Flex flexDirection="column" alignItems="center">
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

              <Button
                // @ts-ignore
                as={RouterLink}
                to={lot?.saleArtwork?.artwork?.href ?? ""}
                mt={1}
                size="medium"
              >
                Bid
              </Button>
            </Flex>
          </Column>
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
        lotStandings {
          isLeadingBidder
          activeBid {
            id
          }
          saleArtwork {
            lotLabel
            highestBid {
              display
            }
            counts {
              bidderPositions
            }
            artwork {
              title
              href
              image {
                cropped(height: 100, width: 100) {
                  src
                  srcSet
                }
              }
              artist {
                name
              }
            }
          }
        }
      }
    `,
  }
)
