import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/Artsy"
import { MyBids_me } from "v2/__generated__/MyBids_me.graphql"

import {
  AlertIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Box,
  CalendarIcon,
  Flex,
  Image,
  Join,
  Separator,
  Spacer,
  StackableBorderBox,
  Text,
  WatchingIcon,
} from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"

interface MyBidsProps {
  me: MyBids_me
}

export const MyBids: React.FC<MyBidsProps> = props => {
  const {
    me: { myBids },
  } = props

  const active = myBids?.active ?? []

  return (
    <Carousel arrowHeight={240}>
      {active.map(activeSale => {
        return (
          <Box width={330}>
            <StackableBorderBox flexDirection="column" overflow="hidden" p={0}>
              <Box minHeight={100}>
                <Image
                  width="100%"
                  height={100}
                  style={{ objectFit: "cover" }}
                  src={activeSale.sale.coverImage?.resized.src}
                  srcSet={activeSale.sale.coverImage?.resized.srcSet}
                />
              </Box>
              <Box px={2} pb={2} pt={1}>
                <Text variant="small" color="black60">
                  {activeSale.sale.partner?.name}
                  Tate Ward
                </Text>
                <Text variant="title">{activeSale.sale.name}</Text>
                <Flex>
                  <CalendarIcon width={15} height={15} top="1px" mr={0.3} />
                  <Text variant="text" color="black60">
                    {activeSale.sale.formattedStartDateTime}
                  </Text>
                </Flex>
              </Box>
            </StackableBorderBox>
            <StackableBorderBox p={2} flexDirection="column">
              <Join separator={<Separator my={1} />}>
                {activeSale.saleArtworks.map(saleArtwork => {
                  return (
                    <Flex width="100%">
                      <Flex alignItems="center" width="100%">
                        <Box backgroundColor="black60" width={50} height={50}>
                          <Image
                            src={saleArtwork.artwork.image?.resized.src}
                            srcSet={saleArtwork.artwork.image?.resized.srcSet}
                          />
                        </Box>
                        <Spacer mr={1} />
                        <Flex justifyContent="space-between" width="100%">
                          <Box>
                            <Text variant="text">
                              {saleArtwork.artwork.artistNames}
                            </Text>
                            <Text variant="caption" color="black60">
                              Lot {saleArtwork.position}
                            </Text>
                          </Box>

                          <Box>
                            {saleArtwork.isWatching ? (
                              <>
                                <Text
                                  variant="text"
                                  display="inline-block"
                                  pr={0.3}
                                >
                                  {saleArtwork.highestBid.amount ||
                                    saleArtwork.estimate}
                                </Text>
                                <Watching />
                              </>
                            ) : (
                              <>
                                <Box style={{ whiteSpace: "nowrap" }}>
                                  <Text
                                    variant="text"
                                    display="inline-block"
                                    pr={0.3}
                                  >
                                    {saleArtwork.lot?.sellingPrice.display}
                                  </Text>
                                  <Text color="black60" display="inline-block">
                                    {saleArtwork.lot?.bidCount === 1
                                      ? `${saleArtwork.lot?.bidCount} bid`
                                      : `${saleArtwork.lot?.bidCount} bids`}
                                  </Text>
                                </Box>

                                {saleArtwork.isHighestBidder ? (
                                  <HighestBid />
                                ) : (
                                  <Outbid />
                                )}
                              </>
                            )}
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  )
                })}
              </Join>
            </StackableBorderBox>
          </Box>
        )
      })}
    </Carousel>
  )
}

export const MyBidsFragmentContainer = createFragmentContainer(MyBids, {
  me: graphql`
    fragment MyBids_me on Me {
      myBids {
        active {
          sale {
            name
            slug
            liveStartAt
            endAt
            displayTimelyAt
            formattedStartDateTime
            requireIdentityVerification
            partner {
              name
            }
            coverImage {
              resized(width: 300, height: 100) {
                src
                srcSet
              }
            }
          }
          saleArtworks {
            artwork {
              artistNames
              image {
                resized(width: 50, height: 50) {
                  src
                  srcSet
                }
              }
            }

            slug
            position
            isHighestBidder
            isWatching
            highestBid {
              amount
            }
            estimate

            lot {
              bidCount
              floorSellingPrice {
                display
              }
              internalID
              onlineAskingPrice {
                display
              }
              reserveStatus
              saleId
              sellingPrice {
                display
              }
              soldStatus
            }
          }
        }
        closed {
          sale {
            liveStartAt
            endAt
            requireIdentityVerification
          }
          saleArtworks {
            position
            lot {
              bidCount
              floorSellingPrice {
                display
              }
              internalID
              onlineAskingPrice {
                display
              }
              reserveStatus
              saleId
              sellingPrice {
                display
              }
              soldStatus
            }
            slug
          }
        }
      }
    }
  `,
})

export const MyBidsQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <>
      <Text py={3}>Active Bids and Watched Lots</Text>
      <SystemQueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query MyBidsQuery {
            me {
              ...MyBids_me
            }
          }
        `}
        variables={{}}
        render={({ props }) => {
          if (props) {
            return <MyBidsFragmentContainer me={props.me} />
          } else {
            return <Text>Loading...</Text>
          }
        }}
      />
    </>
  )
}

const ReserveNotMet: React.FC = () => (
  <Flex>
    <Box pr={0.3}>
      <AlertIcon />
    </Box>
    <Text variant="text" color="black60">
      Reserve not met
    </Text>
  </Flex>
)

const HighestBid: React.FC = () => (
  <Flex>
    <Box pr={0.3}>
      <ArrowUpCircleIcon fill="green100" />
    </Box>
    <Text variant="text" color="green100">
      Highest bid
    </Text>
  </Flex>
)

const Outbid: React.FC = () => (
  <Flex>
    <Box pr={0.3}>
      <ArrowDownCircleIcon fill="red100" />
    </Box>
    <Text variant="text" color="red100">
      Outbid
    </Text>
  </Flex>
)

const Watching: React.FC = () => (
  <Flex>
    <Box pr={0.3}>
      <WatchingIcon width={12} height={12} top="1px" />
    </Box>
    <Text variant="text" color="black60">
      Watching
    </Text>
  </Flex>
)
