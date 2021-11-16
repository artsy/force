import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyBids_me } from "v2/__generated__/MyBids_me.graphql"
import { MyBidsBidHeaderFragmentContainer } from "./MyBidsBidHeader"
import { MyBidsBidItemFragmentContainer } from "./MyBidsBidItem"
import {
  Box,
  Flex,
  Button,
  Join,
  Separator,
  Shelf,
  Spacer,
  StackableBorderBox,
  Text,
  Skeleton,
  SkeletonText,
  SkeletonBox,
} from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "react-tracking"
import { useAnalyticsContext, useSystemContext } from "v2/System"
import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { MyBidsQuery } from "v2/__generated__/MyBidsQuery.graphql"

interface MyBidsProps {
  me: MyBids_me
}

const MyBids: React.FC<MyBidsProps> = props => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const { me } = props
  const active = me?.myBids?.active ?? []

  if (active.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="lg">Your Auctions and Bids</Text>

      <Spacer mt={4} />

      <Shelf alignItems="flex-start">
        {active.map((activeSale, index) => {
          if (!activeSale) return <></>

          const { saleArtworks, sale } = activeSale

          if (!sale || !saleArtworks) return <></>

          return (
            // TODO: Re-assess width
            <Box width={330} key={index}>
              <StackableBorderBox flexDirection="column" p={0} pb={1}>
                <MyBidsBidHeaderFragmentContainer sale={sale} />
              </StackableBorderBox>

              <StackableBorderBox p={0} flexDirection="column">
                <Join separator={<Separator />}>
                  {saleArtworks.length > 0 ? (
                    <>
                      {saleArtworks.map((saleArtwork, saleArtworkIndex) => {
                        if (!saleArtwork) return null

                        return (
                          <Box py={1} px={2} key={saleArtworkIndex}>
                            <MyBidsBidItemFragmentContainer
                              horizontalSlidePosition={saleArtworkIndex}
                              saleArtwork={saleArtwork}
                            />
                          </Box>
                        )
                      })}
                    </>
                  ) : (
                    // If a user has registered for a sale but hasn't yet
                    // followed or bid on any works, show the Bid Now button.
                    <Box py={1} px={2}>
                      <RouterLink
                        to={`/auction/${sale.slug}`}
                        noUnderline
                        data-test="registeredOnlyButton"
                        onClick={() => {
                          trackEvent(
                            clickedEntityGroup({
                              contextModule: ContextModule.yourActiveBids,
                              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                              contextPageOwnerType,
                              destinationPageOwnerType: OwnerType.sale,
                              type: "thumbnail",
                            })
                          )
                        }}
                      >
                        <Button variant="primaryBlack" width="100%">
                          Bid now
                        </Button>
                      </RouterLink>
                    </Box>
                  )}
                </Join>
              </StackableBorderBox>
            </Box>
          )
        })}
      </Shelf>
    </>
  )
}

export const MyBidsFragmentContainer = createFragmentContainer(MyBids, {
  me: graphql`
    fragment MyBids_me on Me {
      myBids {
        active {
          sale {
            slug
            ...MyBidsBidHeader_sale
          }
          saleArtworks {
            ...MyBidsBidItem_saleArtwork
          }
        }
      }
    }
  `,
})

const MyBidsPlaceholder: React.FC = () => {
  return (
    <>
      <Text variant="lg">Your Auctions and Bids</Text>

      <Spacer mt={4} />

      <Skeleton>
        <Shelf alignItems="flex-start">
          {[...new Array(3)].map((_, i) => {
            return (
              <React.Fragment key={i}>
                <StackableBorderBox
                  width={330}
                  flexDirection="column"
                  p={0}
                  pb={1}
                >
                  <SkeletonBox width="100%" height={100} />

                  <Spacer mt={1} />

                  <Box px={2}>
                    <SkeletonText variant="xs" textTransform="uppercase">
                      Partner Name
                    </SkeletonText>

                    <Spacer mt={1} />

                    <SkeletonText variant="lg">Sale Name</SkeletonText>

                    <SkeletonText variant="lg">Starts at Mon 0</SkeletonText>
                  </Box>
                </StackableBorderBox>

                <StackableBorderBox p={0} flexDirection="column">
                  <Join separator={<Separator />}>
                    <Flex py={1} px={2}>
                      <SkeletonBox size={55} mr={1} />

                      <Flex flex={1}>
                        <Box>
                          <SkeletonText variant="xs">Artist Name</SkeletonText>

                          <SkeletonText variant="xs">Lot 0</SkeletonText>
                        </Box>

                        <Flex
                          flex={1}
                          flexDirection="column"
                          alignItems="flex-end"
                        >
                          <SkeletonText variant="xs">
                            $0,000 (0 bids)
                          </SkeletonText>

                          <SkeletonText variant="xs">Highest Bid</SkeletonText>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Join>
                </StackableBorderBox>
              </React.Fragment>
            )
          })}
        </Shelf>
      </Skeleton>
    </>
  )
}

export const MyBidsQueryRenderer: React.FC = () => {
  const { relayEnvironment, user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <SystemQueryRenderer<MyBidsQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query MyBidsQuery {
          me {
            ...MyBids_me
          }
        }
      `}
      placeholder={<MyBidsPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return <MyBidsPlaceholder />
        }

        if (props.me) {
          return <MyBidsFragmentContainer me={props.me} />
        }
      }}
    />
  )
}
