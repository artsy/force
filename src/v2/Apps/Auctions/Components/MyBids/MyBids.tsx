import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyBids_me } from "v2/__generated__/MyBids_me.graphql"
import { Carousel } from "v2/Components/Carousel"
import { MyBidsBidHeaderFragmentContainer } from "./MyBidsBidHeader"
import { MyBidsBidItemFragmentContainer } from "./MyBidsBidItem"
import {
  Box,
  Button,
  Join,
  Separator,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/Artsy"
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
      <Text variant="subtitle" mt={3} mb={2}>
        Active Bids and Watched Lots
      </Text>

      <Carousel arrowHeight={240}>
        {active.map((activeSale, index) => {
          return (
            <SaleContainer key={index}>
              <StackableBorderBox
                flexDirection="column"
                overflow="hidden"
                p={0}
              >
                <MyBidsBidHeaderFragmentContainer sale={activeSale.sale} />
              </StackableBorderBox>
              <StackableBorderBox p={2} flexDirection="column">
                <Join separator={<Separator my={1} />}>
                  {activeSale.saleArtworks.length > 0 ? (
                    <>
                      {activeSale.saleArtworks.map(
                        (saleArtwork, saleArtworkIndex) => {
                          return (
                            <MyBidsBidItemFragmentContainer
                              horizontalSlidePosition={saleArtworkIndex}
                              key={saleArtworkIndex}
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
                      to={`/auction/${activeSale.sale.slug}`}
                      noUnderline
                      data-test="registeredOnlyButton"
                      onClick={() => {
                        trackEvent(
                          clickedEntityGroup({
                            contextModule: ContextModule.yourActiveBids,
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
      </Carousel>
    </>
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
