import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { exceedsChatSupportThreshold } from "Utils/exceedsChatSupportThreshold"
import { getENV } from "Utils/getENV"
import { ArtworkChatBubble_artwork$data } from "__generated__/ArtworkChatBubble_artwork.graphql"
import { SalesforceWrapper } from "Components/SalesforceWrapper"
import { Media } from "Utils/Responsive"

interface ArtworkChatBubbleProps {
  artwork: ArtworkChatBubble_artwork$data
}

const ArtworkChatBubble: FC<ArtworkChatBubbleProps> = ({ artwork }) => {
  const {
    isAcquireable,
    isInquireable,
    isOfferable,
    listPrice,
    isInAuction,
    saleArtwork,
  } = artwork

  const price = useMemo(() => {
    if (!listPrice) return null

    switch (listPrice.__typename) {
      case "Money":
        return listPrice
      case "PriceRange":
        return listPrice.maxPrice
      default:
        return null
    }
  }, [listPrice])

  if (!getENV("SALESFORCE_CHAT_ENABLED")) {
    return null
  }

  const openingBid = saleArtwork?.openingBid?.cents
  const currency = saleArtwork?.currency

  if (
    openingBid &&
    currency &&
    exceedsChatSupportThreshold(openingBid, currency)
  ) {
    return (
      <Media greaterThan="xs">
        <SalesforceWrapper isInAuction={isInAuction} />
      </Media>
    )
  }

  // Don't display on inquiry artworks
  if (isInquireable && !isAcquireable && !isOfferable) return null

  if (!price || !exceedsChatSupportThreshold(price.major, price.currencyCode)) {
    return null
  }

  return (
    <Media greaterThan="xs">
      <SalesforceWrapper isInAuction={isInAuction} />
    </Media>
  )
}

export const ArtworkChatBubbleFragmentContainer = createFragmentContainer(
  ArtworkChatBubble,
  {
    artwork: graphql`
      fragment ArtworkChatBubble_artwork on Artwork {
        isAcquireable
        isInquireable
        isOfferable
        isInAuction
        listPrice {
          __typename
          ... on Money {
            currencyCode
            major
          }
          ... on PriceRange {
            maxPrice {
              currencyCode
              major
            }
          }
        }
        saleArtwork {
          currency
          openingBid {
            cents
          }
        }
      }
    `,
  }
)
