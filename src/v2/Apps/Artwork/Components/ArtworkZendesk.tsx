import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"
import { isExceededZendeskThreshold } from "v2/Utils/isExceededZendeskThreshold"
import { ArtworkZendesk_artwork } from "v2/__generated__/ArtworkZendesk_artwork.graphql"

interface ArtworkZendeskProps {
  artwork: ArtworkZendesk_artwork
}

const ArtworkZendesk: FC<ArtworkZendeskProps> = ({ artwork }) => {
  const {
    isAcquireable,
    isInquireable,
    isOfferable,
    listPrice,
    isInAuction,
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

  // Don't display on inquiry artworks
  if (isInquireable && !isAcquireable && !isOfferable) return null

  if (!price || !isExceededZendeskThreshold(price.major, price.currencyCode)) {
    return null
  }

  return <ZendeskWrapper mode={isInAuction ? "auction" : "default"} />
}

export const ArtworkZendeskFragmentContainer = createFragmentContainer(
  ArtworkZendesk,
  {
    artwork: graphql`
      fragment ArtworkZendesk_artwork on Artwork {
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
      }
    `,
  }
)
