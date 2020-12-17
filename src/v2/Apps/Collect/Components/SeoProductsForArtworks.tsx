import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { toSentence } from "underscore.string"

import { SeoProductsForArtworks_artworks } from "v2/__generated__/SeoProductsForArtworks_artworks.graphql"
import { Product } from "v2/Components/Seo/Product"
import { get } from "v2/Utils/get"

const { APP_URL } = process.env

const AVAILABILITY = {
  "for sale": "https://schema.org/InStock",
  sold: "https://schema.org/OutOfStock",
}

const formatCurrency = value => currency(value, { separator: "" }).format()

interface SeoProductsProps {
  artworks: SeoProductsForArtworks_artworks
}

export class SeoProducts extends React.Component<SeoProductsProps> {
  render() {
    const { artworks } = this.props

    // here the filtering is necessary so we can re-use the artwork list shown in the page (could include
    // non-acquireable artworks) without making an extra request. Also, seller image is a required field
    // so excluding those that don't have `partner.profile.icon.url`.
    const artworksForSeoProduct = artworks.edges.filter(edge => {
      return get(edge, e => {
        return e!.node!.is_acquireable && e!.node!.partner!.profile!.icon!.url
      })
    })

    return artworksForSeoProduct!.map(a => {
      if (a!.node !== null) {
        const node = a!.node
        const {
          artists,
          availability,
          image,
          is_price_range,
          partner,
          listPrice: { display },
        } = node
        const location = partner && partner.locations && partner.locations[0]
        const artistsName = artists
          ? toSentence(artists.map(artist => artist!.name))
          : null
        const isInstitution = partner && partner.type === "Institution"
        const partnerImg = get(partner, p => {
          return p.profile.icon.url
        })

        return (
          <Product
            key={node.id}
            data={{
              brand: {
                "@type": "Person",
                name: artistsName,
              },
              description: node.meta && node.meta.description,
              image: image && image.url,
              name: node.title,
              url: `${APP_URL}${node.href}`,
              ...(isInstitution
                ? {}
                : {
                  category: node.category,
                  offers: {
                    "@type": "Offer",
                    availability: availability && AVAILABILITY[availability],
                    price: !is_price_range
                      ? formatCurrency(display)
                      : {
                        maxPrice:
                          display && formatCurrency(display.split("-")[1]),
                        minPrice:
                          display && formatCurrency(display.split("-")[0]),
                      },
                    priceCurrency: node.price_currency,
                    seller: {
                      "@type": "ArtGallery",
                      address: location
                        ? [
                          location.address,
                          location.address_2,
                          location.city,
                          location.state,
                          location.country,
                          location.postal_code,
                        ]
                          .filter(Boolean)
                          .join(", ")
                        : null,
                      image: partnerImg,
                      name: partner && partner.name,
                      telephone: location ? location.phone : null,
                    },
                  },
                  productionDate: node.date,
                }),
            }}
          />
        )
      }
    })
  }
}

export const SeoProductsForArtworks = createFragmentContainer(SeoProducts, {
  artworks: graphql`
    fragment SeoProductsForArtworks_artworks on FilterArtworksConnection {
      edges {
        node {
          id
          availability
          category
          date
          href
          is_acquireable: isAcquireable
          is_price_range: isPriceRange
          listPrice {
            ... on PriceRange {
              display
            }
            ... on Money {
              display
            }
          }
          price_currency: priceCurrency
          title
          artists(shallow: true) {
            name
          }
          image {
            url(version: "larger")
          }
          meta {
            description
          }
          partner(shallow: true) {
            name
            type
            profile {
              icon {
                url(version: "larger")
              }
            }
            locations(size: 1) {
              address
              address_2: address2
              city
              state
              country
              postal_code: postalCode
              phone
            }
          }
        }
      }
    }
  `,
})
