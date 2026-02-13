import { StructuredData } from "Components/Seo/StructuredData"
import { getENV } from "Utils/getENV"
import type { ArtworkStructuredDataQuery } from "__generated__/ArtworkStructuredDataQuery.graphql"
import { map } from "lodash"
import { useMemo } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import type {
  ArtGallery,
  ImageObject,
  Offer,
  Person,
  PostalAddress,
} from "schema-dts"

interface ArtworkStructuredDataProps {
  id: string
}

export const ArtworkStructuredData: React.FC<ArtworkStructuredDataProps> = ({
  id,
}) => {
  const { artwork } = useLazyLoadQuery<ArtworkStructuredDataQuery>(
    QUERY,
    { id },
    { fetchPolicy: "store-or-network" },
  )

  if (!artwork) return null

  const artworkUrl = `${getENV("APP_URL")}${artwork.href}`
  const artistUrl = `${getENV("APP_URL")}${artwork.artists?.[0]?.href}`
  const creator: Person | undefined = artwork.artists
    ? {
        "@type": "Person",
        "@id": `${getENV("APP_URL")}${artwork.artists[0]?.href}`,
        name: map(artwork.artists, "name").join(", ") ?? "Unknown Artist",
      }
    : undefined

  const image: ImageObject | undefined =
    artwork.image?.large?.url &&
    artwork.image.large.width &&
    artwork.image.large.height
      ? {
          "@type": "ImageObject",
          url: artwork.image.large.url,
          width: {
            "@type": "QuantitativeValue",
            value: artwork.image.large.width,
            unitCode: "E37",
          },
          height: {
            "@type": "QuantitativeValue",
            value: artwork.image.large.height,
            unitCode: "E37",
          },
        }
      : undefined

  const partner: ArtGallery | undefined = useMemo(() => {
    if (!artwork.partner?.name) return
    const partner = artwork.partner

    const image = partner.profile?.image?.resized?.url
    const location = partner.locationsConnection?.edges?.[0]?.node

    const address: PostalAddress | undefined = location
      ? {
          "@type": "PostalAddress",
          streetAddress: location.address ?? undefined,
          addressLocality: location.city ?? undefined,
          addressRegion: location.state ?? undefined,
          postalCode: location.postalCode ?? undefined,
          addressCountry: location.country ?? undefined,
        }
      : undefined

    return {
      "@type": "ArtGallery" as const,
      name: artwork.partner.name,
      image,
      url: `${getENV("APP_URL")}${artwork.partner.href}`,
      address,
    }
  }, [artwork.partner])

  const offer: Offer | undefined = useMemo(() => {
    if (!artwork.listPrice || artwork.isPriceHidden) return

    const availability = artwork.availability
      ? AVAILABILITIES[artwork.availability as keyof typeof AVAILABILITIES]
      : undefined

    switch (artwork.listPrice.__typename) {
      case "PriceRange":
        return {
          "@type": "AggregateOffer",
          lowPrice: artwork.listPrice.minPrice?.major,
          highPrice: artwork.listPrice.maxPrice?.major,
          priceCurrency: artwork.listPrice.minPrice?.currencyCode,
          availability,
          itemCondition: "https://schema.org/NewCondition",
          seller: partner,
        }

      case "Money":
        return {
          "@type": "Offer",
          price: artwork.listPrice.major,
          priceCurrency: artwork.listPrice.currencyCode,
          availability,
          itemCondition: "https://schema.org/NewCondition",
          seller: partner,
        }
    }
  }, [artwork.listPrice, artwork.isPriceHidden, artwork.availability, partner])

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "VisualArtwork",
            "@id": `${artworkUrl}#visual-artwork`,
            name: artwork.title ?? "Untitled",
            creator,
            artform: artwork.mediumType?.name ?? undefined,
            artMedium: artwork.medium ?? undefined,
            dateCreated: artwork.date ?? undefined,
            artEdition: artwork.editionOf ?? undefined,
            width: artwork.width
              ? {
                  "@type": "QuantitativeValue",
                  value: Number.parseFloat(artwork.width),
                  unitCode: metricToUnitCode(artwork.metric),
                }
              : undefined,
            height: artwork.height
              ? {
                  "@type": "QuantitativeValue",
                  value: Number.parseFloat(artwork.height),
                  unitCode: metricToUnitCode(artwork.metric),
                }
              : undefined,
            depth: artwork.depth
              ? {
                  "@type": "QuantitativeValue",
                  value: Number.parseFloat(artwork.depth),
                  unitCode: metricToUnitCode(artwork.metric),
                }
              : undefined,
            image,
            description: artwork.description ?? undefined,
          },
          {
            "@type": "Product",
            "@id": `${artworkUrl}#product`,
            name: artwork.title ?? "Untitled",
            brand: {
              "@id": artistUrl,
            },
            isRelatedTo: {
              "@id": `${artworkUrl}#visual-artwork`,
            },
            material: artwork.medium ?? undefined,
            image,
            description: artwork.description ?? undefined,
            category: artwork.mediumType?.name ?? undefined,
            offers: offer,
            productionDate: artwork.date ?? undefined,
          },
          {
            "@type": "WebPage",
            "@id": artworkUrl,
            mainEntity: {
              "@id": `${artworkUrl}#product`,
            },
          },
        ],
      }}
    />
  )
}

const QUERY = graphql`
  query ArtworkStructuredDataQuery($id: String!) {
    artwork(id: $id) {
      slug
      href
      title
      medium
      editionOf
      mediumType {
        name
      }
      artists(shallow: true) {
        name
        href
      }
      date
      width
      height
      depth
      metric
      image {
        large: resized(width: 1920, height: 1920) {
          url
          width
          height
        }
      }
      description(format: PLAIN)
      isPriceHidden
      availability
      listPrice {
        __typename
        ... on PriceRange {
          minPrice {
            major
            currencyCode
          }
          maxPrice {
            major
          }
        }
        ... on Money {
          major
          currencyCode
        }
      }
      partner {
        name
        href
        profile {
          image {
            resized(width: 320, height: 320) {
              url
            }
          }
        }
        locationsConnection(first: 1) {
          edges {
            node {
              address
              city
              state
              postalCode
              country
            }
          }
        }
      }
    }
  }
`

const AVAILABILITIES = {
  "for sale": "https://schema.org/InStock",
  sold: "https://schema.org/OutOfStock",
} as const

const UNIT_CODES = { in: "INH", cm: "CMT" } as const

const metricToUnitCode = (metric: string | null | undefined) => {
  if (!metric) return undefined
  return UNIT_CODES[metric] ?? undefined
}
