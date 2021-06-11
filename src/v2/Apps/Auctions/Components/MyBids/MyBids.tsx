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
  StackableBorderBox,
  Text,
  ThemeProviderV2,
} from "@artsy/palette"
import styled from "styled-components"
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
    <ThemeProviderV2>
      <>
        <Separator />
        <Text variant="title" mt={6} mb={4}>
          Your Auctions and Bids
        </Text>

        <Shelf alignItems="flex-start">
          {active.map((activeSale, index) => {
            return (
              <SaleContainer key={index}>
                <StackableBorderBox
                  flexDirection="column"
                  overflow="hidden"
                  p={0}
                >
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  <MyBidsBidHeaderFragmentContainer sale={activeSale.sale} />
                </StackableBorderBox>
                <StackableBorderBox p={2} flexDirection="column">
                  <Join separator={<Separator my={1} />}>
                    {/* @ts-expect-error STRICT_NULL_CHECK */}
                    {activeSale.saleArtworks.length > 0 ? (
                      <>
                        {/* @ts-expect-error STRICT_NULL_CHECK */}
                        {activeSale.saleArtworks.map(
                          (saleArtwork, saleArtworkIndex) => {
                            return (
                              <MyBidsBidItemFragmentContainer
                                horizontalSlidePosition={saleArtworkIndex}
                                key={saleArtworkIndex}
                                // @ts-expect-error STRICT_NULL_CHECK
                                saleArtwork={saleArtwork}
                              />
                            )
                          }
                        )}
                      </>
                    ) : (
                      // If a user has registered for a sale but hasn't yet followed
                      // or bid on any works, show the Bid Now button.
                      <RouterLink
                        // @ts-expect-error STRICT_NULL_CHECK
                        to={`/auction/${activeSale.sale.slug}`}
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
                    )}
                  </Join>
                </StackableBorderBox>
              </SaleContainer>
            )
          })}
        </Shelf>
      </>
    </ThemeProviderV2>
  )
}

const SaleContainer = styled(Box).attrs({
  width: 330,
})``

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
