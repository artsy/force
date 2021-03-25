import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/Artsy"
import { MyBids_me } from "v2/__generated__/MyBids_me.graphql"
import { Carousel } from "v2/Components/Carousel"
import { MyBidsBidHeaderFragmentContainer } from "./MyBidsBidHeader"
import { MyBidsBidItemFragmentContainer } from "./MyBidsBidItem"
import { Box, Join, Separator, StackableBorderBox, Text } from "@artsy/palette"
import { MyBidsPlaceholder } from "./MyBidsPlaceholder"

interface MyBidsProps {
  me: MyBids_me
}

const MyBids: React.FC<MyBidsProps> = props => {
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
              <MyBidsBidHeaderFragmentContainer sale={activeSale.sale} />
            </StackableBorderBox>
            <StackableBorderBox p={2} flexDirection="column">
              <Join separator={<Separator my={1} />}>
                {activeSale.saleArtworks.map(saleArtwork => {
                  return (
                    <MyBidsBidItemFragmentContainer saleArtwork={saleArtwork} />
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

const MyBidsFragmentContainer = createFragmentContainer(MyBids, {
  me: graphql`
    fragment MyBids_me on Me {
      myBids {
        active {
          sale {
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
            return <MyBidsPlaceholder />
          }
        }}
      />
    </>
  )
}
