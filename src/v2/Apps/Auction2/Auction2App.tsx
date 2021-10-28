import { Box, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { AnalyticsContext, useAnalyticsContext } from "v2/System"
import { Auction2App_sale } from "v2/__generated__/Auction2App_sale.graphql"
import { Auction2App_me } from "v2/__generated__/Auction2App_me.graphql"
import { Auction2MetaFragmentContainer } from "./Components/Auction2Meta"
import { FullBleedHeader } from "v2/Components/FullBleedHeader"
import { AuctionDetailsFragmentContainer } from "./Components/AuctionDetails/AuctionDetails"

/**
 * TODO:
 * - Add ZenDesk
 */

interface Auction2AppProps {
  sale: Auction2App_sale
  me: Auction2App_me
}

const Auction2App: React.FC<Auction2AppProps> = ({ children, sale, me }) => {
  const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: sale.internalID,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <Auction2MetaFragmentContainer sale={sale} />

      <>
        {sale.coverImage?.cropped && (
          <FullBleedHeader src={sale.coverImage.cropped.src} />
        )}

        <Spacer my={2} />

        <AuctionDetailsFragmentContainer sale={sale} me={me} />

        <Box>{children}</Box>
      </>
    </AnalyticsContext.Provider>
  )
}

export const Auction2AppFragmentContainer = createFragmentContainer(
  Auction2App,
  {
    sale: graphql`
      fragment Auction2App_sale on Sale {
        ...Auction2Meta_sale
        ...AuctionDetails_sale

        # New
        formattedStartDateTime
        href
        coverImage {
          cropped(width: 1800, height: 600, version: "wide") {
            src
          }
        }

        # Old
        internalID
        slug
        associatedSale {
          coverImage {
            cropped(width: 260, height: 110) {
              url
            }
          }
          endAt
          href
          slug
          isClosed
          isLiveOpen
          isPreview
          liveStartAt
          name
          startAt
        }
        status
        coverImage {
          cropped(width: 1800, height: 600, version: "wide") {
            url
          }
        }
        currency
        eligibleSaleArtworksCount
        endAt
        isAuction
        isClosed
        isLiveOpen
        isOpen
        liveStartAt
        name
        promotedSale {
          slug
          name
          saleArtworksConnection(first: 25) {
            edges {
              node {
                artwork {
                  slug
                  title
                  date
                  saleMessage
                  isInAuction
                  image {
                    placeholder
                    url
                    aspectRatio
                  }
                  artists {
                    slug
                    href
                    name
                  }
                  partner {
                    name
                  }
                  href
                  isAcquireable
                }
              }
            }
          }
        }
        registrationEndsAt
        requireIdentityVerification
        startAt
        status
        symbol
      }
    `,
    me: graphql`
      fragment Auction2App_me on Me {
        ...AuctionDetails_me

        internalID
        hasCreditCards
        identityVerified
        pendingIdentityVerification {
          internalID
        }
        bidders(saleID: $slug) {
          qualifiedForBidding
        }

        lotStandings(saleID: $slug, live: true) {
          activeBid {
            internalID
          }
          isLeadingBidder
          saleArtwork {
            slug
            lotLabel
            reserveStatus
            counts {
              bidderPositions
            }
            saleID
            highestBid {
              display
            }
            sale {
              liveStartAt
              endAt
              isLiveOpen
              isClosed
            }
            artwork {
              href
              title
              date
              image {
                url(version: "square")
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
