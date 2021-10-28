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
  const { lotStandings } = me

  if (!lotStandings || lotStandings.length === 0) {
    return <SectionContainer title="Active Bids"></SectionContainer>
  }

  return (
    <SectionContainer title="Active Bids">
      {lotStandings.map((lot, i, a) => {
        if (!lot?.saleArtwork?.artwork) {
          return null
        }

        return (
          <Column
            key={i}
            span={12}
            pb={2}
            display="flex"
            justifyContent="space-between"
            borderBottom={i + 1 < a.length ? "1px solid" : ""}
            borderColor="black10"
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

            <Flex alignItems="center">
              {lot.isLeadingBidder ? (
                <Text
                  variant="xs"
                  color="green100"
                  overflowEllipsis
                  display="flex"
                  alignItems="center"
                  mr={2}
                  mt={1}
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
                  mr={2}
                  mt={1}
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
                width="150px"
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
