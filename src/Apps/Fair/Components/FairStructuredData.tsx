import { ORGANIZATION_STUB_SCHEMA } from "Apps/About/Components/AboutStructuredData"
import { StructuredData } from "Components/Seo/StructuredData"
import { getENV } from "Utils/getENV"
import type { FairStructuredData_fair$key } from "__generated__/FairStructuredData_fair.graphql"
import { compact } from "lodash"
import { graphql } from "react-relay"
import { useFragment } from "react-relay"
import type { ImageObject, Place } from "schema-dts"

interface FairStructuredDataProps {
  fair: FairStructuredData_fair$key
}

export const FairStructuredData: React.FC<
  React.PropsWithChildren<FairStructuredDataProps>
> = props => {
  const fair = useFragment(FAIR_STRUCTURED_DATA_FRAGMENT, props.fair)
  const url = `${getENV("APP_URL")}${fair.href}`

  const place: [Place] | [] = fair.location
    ? [
        {
          "@type": "Place",
          "@id": `${url}#venue`,
          address: fair.location
            ? {
                "@type": "PostalAddress",
                streetAddress: compact([
                  fair.location.address,
                  fair.location.address2,
                ]).join(", "),
                addressCountry: fair.location.country ?? undefined,
                addressLocality: fair.location.city ?? undefined,
                addressRegion: fair.location.state ?? undefined,
                postalCode: fair.location.postalCode ?? undefined,
              }
            : undefined,
        },
      ]
    : []

  const coverImage = fair.structuredDataImage?.cropped
  const image: ImageObject | undefined = coverImage?.src
    ? {
        "@type": "ImageObject",
        url: coverImage.src,
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
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: fair.name ?? undefined,
            description: fair.description ?? undefined,
            isPartOf: { "@id": "https://www.artsy.net#website" },
            breadcrumb: {
              "@id": `${url}#breadcrumb`,
            },
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
                name: "Fairs & Events",
                item: "https://www.artsy.net/fairs",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: fair.name ?? undefined,
                item: url,
              },
            ],
          },
          {
            "@type": "Event",
            "@id": `${url}#event`,
            url,
            name: fair.name ?? undefined,
            image,
            additionalType: "https://www.wikidata.org/entity/Q1792535",
            sameAs: fair.organizer?.website ? [fair.organizer.website] : [],
            description: fair.description ?? undefined,
            startDate: fair.structuredDataStartAt ?? undefined,
            endDate: fair.structuredDataEndAt ?? undefined,
            mainEntityOfPage: { "@id": `${url}#webpage` },
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: place,
            organizer: fair.organizer
              ? {
                  "@type": "Organization",
                  name: fair.organizer.name ?? undefined,
                  url: fair.organizer.website ?? undefined,
                }
              : undefined,
          },
        ],
      }}
    />
  )
}

const FAIR_STRUCTURED_DATA_FRAGMENT = graphql`
  fragment FairStructuredData_fair on Fair {
    name
    href
    description: about(format: PLAIN)
    structuredDataStartAt: startAt(format: "YYYY-MM-DD")
    structuredDataEndAt: endAt(format: "YYYY-MM-DD")
    location {
      address
      address2
      city
      state
      country
      summary
      postalCode
    }
    organizer {
      name
      website
    }
    structuredDataImage: image {
      cropped(width: 1200, height: 900, version: ["larger", "large"]) {
        src
        width
        height
      }
    }
  }
`
