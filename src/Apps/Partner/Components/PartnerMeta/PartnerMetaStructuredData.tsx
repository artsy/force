import { StructuredData } from "Components/Seo/StructuredData"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import type { PartnerMetaStructuredData_partner$key } from "__generated__/PartnerMetaStructuredData_partner.graphql"
import { compact } from "es-toolkit"
import { useMemo } from "react"
import { graphql, useFragment } from "react-relay"
import type { ImageObject, Person, PostalAddress } from "schema-dts"
import { formatOpeningHours } from "./formatOpeningHours"

interface PartnerMetaStructuredDataProps {
  partner: PartnerMetaStructuredData_partner$key
}

export const PartnerMetaStructuredData: React.FC<
  PartnerMetaStructuredDataProps
> = ({ partner: _partner }) => {
  const partner = useFragment(fragment, _partner)
  const partnerUrl = `${getENV("APP_URL")}${partner.href}`

  const logo: ImageObject | undefined = partner.profile?.icon?.cropped?.url
    ? {
        "@type": "ImageObject",
        url: partner.profile.icon.cropped.url,
        width: {
          "@type": "QuantitativeValue",
          value: partner.profile.icon.cropped.width,
          unitCode: "E37",
        },
        height: {
          "@type": "QuantitativeValue",
          value: partner.profile.icon.cropped.height,
          unitCode: "E37",
        },
      }
    : undefined

  const image: ImageObject | undefined = partner.profile?.image?.resized?.url
    ? {
        "@type": "ImageObject",
        url: partner.profile.image.resized.url,
        width: {
          "@type": "QuantitativeValue",
          value: partner.profile.image.resized.width ?? 0,
          unitCode: "E37",
        },
        height: {
          "@type": "QuantitativeValue",
          value: partner.profile.image.resized.height ?? 0,
          unitCode: "E37",
        },
      }
    : undefined

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

  const openingHours = useMemo(() => {
    if (!location?.openingHours) return undefined

    if ("text" in location.openingHours && location.openingHours.text) {
      return location.openingHours.text
    }

    if (
      "schedules" in location.openingHours &&
      location.openingHours.schedules
    ) {
      const schedules = compact(location.openingHours.schedules).map(
        schedule => ({
          days: schedule.days ?? "",
          hours: schedule.hours ?? "",
        }),
      )

      return formatOpeningHours(schedules) || undefined
    }

    return undefined
  }, [location])

  const member: Person[] = useMemo(
    () =>
      extractNodes(partner.allArtistsConnection).map(artist => {
        const url = `${getENV("APP_URL")}${artist.href}`

        return {
          "@type": "Person",
          name: artist.name ?? undefined,
          url,
          sameAs: url,
        }
      }),
    [partner.allArtistsConnection],
  )

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@type": "ArtGallery",
        "@id": partnerUrl,
        name: partner.name ?? undefined,
        url: partnerUrl,
        description: partner.profile?.bio ?? undefined,
        image,
        logo,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": partnerUrl,
        },
        address,
        openingHours,
        member,
      }}
    />
  )
}

const fragment = graphql`
  fragment PartnerMetaStructuredData_partner on Partner {
    slug
    href
    name
    profile {
      bio
      image {
        resized(width: 1920, height: 1920) {
          url
          width
          height
        }
      }
      icon {
        cropped(
          width: 250
          height: 250
          version: ["untouched-png", "large", "square"]
        ) {
          url
          width
          height
        }
      }
    }
    locationsConnection(first: 50) {
      edges {
        node {
          address
          city
          country
          postalCode
          state
          openingHours {
            ... on OpeningHoursArray {
              schedules {
                days
                hours
              }
            }
            ... on OpeningHoursText {
              text
            }
          }
        }
      }
    }
    allArtistsConnection(representedBy: true) {
      edges {
        node {
          name
          href
        }
      }
    }
  }
`
