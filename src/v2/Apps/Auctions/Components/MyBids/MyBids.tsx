import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyBids_me } from "v2/__generated__/MyBids_me.graphql"
import { MyBidsBidHeaderFragmentContainer } from "./MyBidsBidHeader"
import { MyBidsBidItemFragmentContainer } from "./MyBidsBidItem"
import {
  Box,
  Button,
  Join,
  Separator,
  Shelf,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/System"
import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"

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
      <Separator />

      <Spacer mt={6} />

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
              <StackableBorderBox
                flexDirection="column"
                overflow="hidden"
                p={0}
                pb={1}
              >
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
                              // @ts-expect-error STRICT_NULL_CHECK
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
