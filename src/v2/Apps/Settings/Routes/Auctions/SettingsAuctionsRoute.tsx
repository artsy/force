import React from "react"
import { SettingsAuctionsRoute_me } from "v2/__generated__/SettingsAuctionsRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { UserActiveBid } from "./Components/UserActiveBid"
import { UserBidHistory } from "./Components/UserBidHistory"
import { UserRegistrationAuctions } from "./Components/UserRegistrationAuctions"

interface SettingsAuctionsRouteProps {
  me: SettingsAuctionsRoute_me
}

const SettingsAuctionsRoute: React.FC<SettingsAuctionsRouteProps> = ({
  me,
}) => {
  return (
    <>
      <UserActiveBid lotStandings={me.lotStandings} />
      <UserBidHistory myBids={me.myBids} />
      <UserRegistrationAuctions
        saleRegistrationsConnection={me.saleRegistrationsConnection}
      />
    </>
  )
}

export const SettingsAuctionsRouteFragmentContainer = createFragmentContainer(
  SettingsAuctionsRoute,
  {
    me: graphql`
      fragment SettingsAuctionsRoute_me on Me {
        name
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
        myBids {
          closed {
            sale {
              name
              href
              endAt(format: "MMMM D, h:mmA")
              profile {
                bio
              }
            }
          }
        }
        saleRegistrationsConnection(
          published: true
          isAuction: true
          sort: CREATED_AT_DESC
          first: 10
          registered: false
        ) {
          edges {
            node {
              sale {
                id
                name
                href
                startAt(format: "MMMM D, h:mmA")
                isClosed
              }
            }
          }
        }
      }
    `,
  }
)
