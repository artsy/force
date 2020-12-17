import { SeoProductsForCollections_ascending_artworks } from "v2/__generated__/SeoProductsForCollections_ascending_artworks.graphql"
import { SeoProductsForCollections_descending_artworks } from "v2/__generated__/SeoProductsForCollections_descending_artworks.graphql"
import { Product } from "v2/Components/Seo/Product"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"

export interface SeoProductsProps {
  descending_artworks: SeoProductsForCollections_descending_artworks
  ascending_artworks: SeoProductsForCollections_ascending_artworks
  collectionDescription: string
  collectionURL: string
  collectionName: string
}

export const getMaxMinPrice = (
  descending_artworks: SeoProductsForCollections_descending_artworks,
  ascending_artworks: SeoProductsForCollections_ascending_artworks
) => {
  const leastExpensive = getPriceRange(
    ascending_artworks.edges[0]?.node?.listPrice
  )
  const mostExpensive = getPriceRange(
    descending_artworks.edges[0]?.node?.listPrice
  )

  return {
    max: mostExpensive.max || leastExpensive.max,
    min: leastExpensive.min || mostExpensive.min,
  }
}

const getPriceRange = (
  listPrice: SeoProductsForCollections_ascending_artworks["edges"][0]["node"]["listPrice"]
) => {
  if (!listPrice) {
    return { max: undefined, min: undefined }
  }

  switch (listPrice.__typename) {
    case "PriceRange":
      const localMin = get(listPrice, x => x.minPrice.major)
      const localMax = get(listPrice, x => x.maxPrice.major)

      return {
        max: localMax || localMin,
        min: localMin || localMax,
      }
    case "Money":
      return {
        max: get(listPrice, x => x.major),
        min: get(listPrice, x => x.major),
      }
  }
}

export class SeoProducts extends React.Component<SeoProductsProps> {
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
            description: collectionDescription,
            name: collectionName,
            offers: {
              "@type": "AggregateOffer",
              availability: "https://schema.org/InStock",
              highPrice: handledItems.max,
              lowPrice: handledItems.min,
              priceCurrency: "USD",
            },
            url: collectionURL,
          }}
        />
      </>
    )
  }
}

export const SeoProductsForCollections = createFragmentContainer(SeoProducts, {
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
})
