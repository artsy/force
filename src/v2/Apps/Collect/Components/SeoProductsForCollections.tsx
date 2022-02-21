import { SeoProductsForCollections_ascending_artworks$data } from "v2/__generated__/SeoProductsForCollections_ascending_artworks.graphql"
import { SeoProductsForCollections_descending_artworks$data } from "v2/__generated__/SeoProductsForCollections_descending_artworks.graphql"
import { Product } from "v2/Components/Seo/Product"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"

export interface SeoProductsProps {
  descending_artworks: SeoProductsForCollections_descending_artworks$data
  ascending_artworks: SeoProductsForCollections_ascending_artworks$data
  collectionDescription: string
  collectionURL: string
  collectionName: string
}

export const getMaxMinPrice = (
  descending_artworks: SeoProductsForCollections_descending_artworks$data,
  ascending_artworks: SeoProductsForCollections_ascending_artworks$data
) => {
  const leastExpensive = getPriceRange(
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    ascending_artworks.edges[0]?.node?.listPrice
  )
  const mostExpensive = getPriceRange(
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    descending_artworks.edges[0]?.node?.listPrice
  )

  return {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    min: leastExpensive.min || mostExpensive.min,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    max: mostExpensive.max || leastExpensive.max,
  }
}

const getPriceRange = (
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  listPrice: SeoProductsForCollections_ascending_artworks["edges"][0]["node"]["listPrice"]
) => {
  if (!listPrice) {
    return { min: undefined, max: undefined }
  }

  switch (listPrice.__typename) {
    case "PriceRange":
      const localMin = get(listPrice, x => x.minPrice.major)
      const localMax = get(listPrice, x => x.maxPrice.major)

      return {
        min: localMin || localMax,
        max: localMax || localMin,
      }
    case "Money":
      return {
        min: get(listPrice, x => x.major),
        max: get(listPrice, x => x.major),
      }
  }
}

export class SeoProducts extends Component<SeoProductsProps> {
  render() {
    const {
      descending_artworks,
      ascending_artworks,
      collectionDescription,
      collectionName,
      collectionURL,
    } = this.props

    const handledItems = getMaxMinPrice(descending_artworks, ascending_artworks)
    if (!handledItems.min && !handledItems.max) {
      // If we don't know any prices, we can't build an offer.
      // And if we try to render a Product without an offer, we'll get an error
      // from Google. So just don't render anything.
      return null
    }

    return (
      <>
        <Product
          data={{
            name: collectionName,
            description: collectionDescription,
            url: collectionURL,
            offers: {
              "@type": "AggregateOffer",
              lowPrice: handledItems.min,
              highPrice: handledItems.max,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }}
        />
      </>
    )
  }
}

export const SeoProductsForCollections = createFragmentContainer(SeoProducts, {
  descending_artworks: graphql`
    fragment SeoProductsForCollections_descending_artworks on FilterArtworksConnection {
      edges {
        node {
          id
          availability
          listPrice {
            __typename
            ... on PriceRange {
              minPrice {
                major(convertTo: "USD")
                currencyCode
              }
              maxPrice {
                major(convertTo: "USD")
                currencyCode
              }
            }
            ... on Money {
              major(convertTo: "USD")
              currencyCode
            }
          }
        }
      }
    }
  `,
  ascending_artworks: graphql`
    fragment SeoProductsForCollections_ascending_artworks on FilterArtworksConnection {
      edges {
        node {
          id
          availability
          listPrice {
            __typename
            ... on PriceRange {
              minPrice {
                major(convertTo: "USD")
                currencyCode
              }
              maxPrice {
                major(convertTo: "USD")
                currencyCode
              }
            }
            ... on Money {
              major(convertTo: "USD")
              currencyCode
            }
          }
        }
      }
    }
  `,
})
