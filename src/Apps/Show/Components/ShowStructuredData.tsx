import { ORGANIZATION_STUB_SCHEMA } from "Apps/About/Components/AboutStructuredData"
import { StructuredData } from "Components/Seo/StructuredData"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import type { ShowStructuredData_show$key } from "__generated__/ShowStructuredData_show.graphql"
import { compact } from "es-toolkit"
import { graphql } from "react-relay"
import { useFragment } from "react-relay"
import type { ImageObject, Organization, Person, Place } from "schema-dts"

interface ShowStructuredDataProps {
  show: ShowStructuredData_show$key
}

export const ShowStructuredData: React.FC<
  React.PropsWithChildren<ShowStructuredDataProps>
> = props => {
  const show = useFragment(SHOW_STRUCTURED_DATA_FRAGMENT, props.show)
  const partner = show.partner
  const url = `${getENV("APP_URL")}${show.href}`

  const organizer: [Organization] | [] = partner
    ? [
        {
          "@type": "Organization",
          "@id": `${partner.href}#host`,
          name: `${partner.name}`,
          url: `${partner.href}`,
        },
      ]
    : []

  const place: [Place] | [] = partner
    ? [
        {
          "@type": "Place",
          "@id": `${partner.href}#venue`,
          name: `${partner.name}`,
          url: `${partner.href}`,
          address: show.location
            ? {
                "@type": "PostalAddress",
                streetAddress: compact([
                  show.location?.address,
                  show.location?.address2,
                ]).join(", "),
                addressCountry: show.location?.country ?? undefined,
                addressLocality: show.location?.city ?? undefined,
                addressRegion: show.location?.state ?? undefined,
                postalCode: show.location?.postalCode ?? undefined,
              }
            : undefined,
        },
      ]
    : []

  const artists: Person[] = extractNodes(show.artistsConnection).map(
    artist => ({
      "@type": "Person",
      "@id": `${artist.href}#artist`,
      name: artist.name ?? "Unknown",
    }),
  )

  const images = extractNodes(show.imagesConnection)
  const coverImage = images[0]
  const image: ImageObject | undefined =
    coverImage?.cropped && coverImage.width && coverImage.height
      ? {
          "@type": "ImageObject",
          url: coverImage.cropped.src,
          width: {
            "@type": "QuantitativeValue",
            value: coverImage.width,
            unitCode: "E37",
          },
          height: {
            "@type": "QuantitativeValue",
            value: coverImage.height,
            unitCode: "E37",
          },
        }
      : undefined

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": "https://www.artsy.net#website",
            url: "https://www.artsy.net",
            name: "Artsy",
            publisher: { "@id": "https://www.artsy.net#organization" },
            inLanguage: "en",
          },
          ORGANIZATION_STUB_SCHEMA,
          ...organizer,
          ...place,
          ...artists,
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url: url,
            name: show.name ?? undefined,
            isPartOf: { "@id": "https://www.artsy.net#website" },
            breadcrumb: {
              "@id": `${url}#breadcrumb`,
            },
            description: show.description ?? undefined,
            inLanguage: "en",
            mainEntity: {
              "@id": `${url}#event`,
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Shows",
                item: "https://www.artsy.net/shows",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: show.name ?? undefined,
                item: url,
              },
            ],
          },
          {
            "@type": "Event",
            "@id": `${url}#event`,
            name: show.name ?? undefined,
            url,
            mainEntityOfPage: {
              "@id": `${url}#webpage`,
            },
            description: show.description ?? undefined,
            image,
            startDate: show.structuredDataStartAt ?? undefined,
            endDate: show.structuredDataEndAt ?? undefined,
            eventAttendanceMode: show.isOnlineExclusive
              ? "https://schema.org/OnlineEventAttendanceMode"
              : "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            ...(partner?.partnerType === "Gallery"
              ? // Assume only galleries are accessible for free
                { isAccessibleForFree: true }
              : {}),
            location: place,
            organizer,
          },
        ],
      }}
    />
  )
}

const SHOW_STRUCTURED_DATA_FRAGMENT = graphql`
  fragment ShowStructuredData_show on Show {
    name
    href
    description
    structuredDataStartAt: startAt(format: "YYYY-MM-DD")
    structuredDataEndAt: endAt(format: "YYYY-MM-DD")
    artistsConnection(first: 10) {
      edges {
        node {
          name
          href
        }
      }
    }
    imagesConnection(first: 1) {
      edges {
        node {
          cropped(width: 1200, height: 900, version: ["larger", "large"]) {
            src
          }
          width
          height
        }
      }
    }
    isOnlineExclusive
    location {
      address
      address2
      city
      state
      country
      summary
      postalCode
    }
    partner {
      ... on Partner {
        partnerType
        name
        href
      }
    }
  }
`
