import { ORGANIZATION_STUB_SCHEMA } from "Apps/About/Components/AboutStructuredData"
import { getArtistMeta } from "Apps/Artist/Utils/getArtistMeta"
import { StructuredData } from "Components/Seo/StructuredData"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { getArtistSubRoute } from "Utils/url"
import type { ArtistStructuredData_artist$key } from "__generated__/ArtistStructuredData_artist.graphql"
import compact from "lodash/compact"
import { useMemo } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistStructuredDataProps {
  artist: ArtistStructuredData_artist$key
}

const SUB_ROUTE_LABELS: Record<string, string> = {
  articles: "Articles",
  cv: "CV",
  shows: "Shows",
  series: "Series",
}

export const ArtistStructuredData: React.FC<ArtistStructuredDataProps> = ({
  artist,
}) => {
  const data = useFragment(fragment, artist)
  const { match } = useRouter()
  const pathname = match.location.pathname

  const appUrl = getENV("APP_URL")
  const artistUrl = `${appUrl}${data.href}`
  const pageUrl = `${appUrl}${pathname}`
  const subRoute = getArtistSubRoute(pathname)

  const memberOf = useMemo(() => {
    return compact(
      data.verifiedRepresentatives.map(({ partner }) => {
        if (!partner.href) return null

        const url = `${appUrl}${partner.href}`

        return {
          "@type": "Organization" as const,
          "@id": url,
          name: partner.name ?? undefined,
          url,
        }
      }),
    )
  }, [appUrl, data.verifiedRepresentatives])

  const { title, description } = getArtistMeta({
    name: data.name,
    biographyBlurb: data.biographyBlurbPlain,
    subRoute,
  })

  const knowsAbout = compact(data.genes?.map(gene => gene?.name))

  const notableWorks = useMemo(() => {
    return compact(
      data.notableArtworks.map(artwork => {
        if (!artwork.href) return null

        const url = `${appUrl}${artwork.href}`

        return {
          "@type": "VisualArtwork" as const,
          "@id": `${url}#visual-artwork`,
          name: artwork.title ?? "Untitled",
          url,
          dateCreated: artwork.date ?? undefined,
          creator: { "@id": artistUrl },
        }
      }),
    )
  }, [appUrl, artistUrl, data.notableArtworks])

  const coverImage = data.coverArtwork?.image
  const image = coverImage?.cropped
    ? {
        "@type": "ImageObject" as const,
        url: coverImage.cropped.src,
        width: {
          "@type": "QuantitativeValue" as const,
          value: coverImage.cropped.width,
          unitCode: "E37",
        },
        height: {
          "@type": "QuantitativeValue" as const,
          value: coverImage.cropped.height,
          unitCode: "E37",
        },
      }
    : undefined

  const breadcrumbItems = useMemo(() => {
    const items = [
      {
        "@type": "ListItem" as const,
        position: 1,
        name: "Home",
        item: appUrl,
      },
      {
        "@type": "ListItem" as const,
        position: 2,
        name: "Artists",
        item: `${appUrl}/artists`,
      },
      {
        "@type": "ListItem" as const,
        position: 3,
        name: data.name ?? undefined,
        item: artistUrl,
      },
    ]

    const label = subRoute ? SUB_ROUTE_LABELS[subRoute] : undefined

    if (label) {
      items.push({
        "@type": "ListItem" as const,
        position: 4,
        name: label,
        item: pageUrl,
      })
    }

    return items
  }, [appUrl, artistUrl, pageUrl, data.name, subRoute])

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${appUrl}#website`,
            url: appUrl,
            name: "Artsy",
            publisher: { "@id": "https://www.artsy.net/#organization" },
            inLanguage: "en",
          },
          ORGANIZATION_STUB_SCHEMA,
          {
            "@type": "Person",
            "@id": artistUrl,
            additionalType: "Artist",
            hasOccupation: {
              "@type": "Occupation",
              name: "Artist",
            },
            alternateName: data.alternateNames?.length
              ? compact(data.alternateNames)
              : undefined,
            award: data.awards ?? undefined,
            birthDate: data.birthday ?? undefined,
            deathDate: data.deathday ?? undefined,
            description,
            gender: data.gender ?? undefined,
            homeLocation: data.hometown
              ? {
                  "@type": "Place",
                  name: data.hometown,
                }
              : undefined,
            image,
            knowsAbout: knowsAbout.length ? knowsAbout : undefined,
            mainEntityOfPage: { "@id": pageUrl },
            memberOf: memberOf.length ? memberOf : undefined,
            name: data.name ?? undefined,
            nationality: data.nationality
              ? { "@type": "Country", name: data.nationality }
              : undefined,
            url: artistUrl,
          },
          {
            "@type": "WebPage",
            "@id": pageUrl,
            url: pageUrl,
            name: title,
            description,
            isPartOf: { "@id": `${appUrl}#website` },
            publisher: { "@id": "https://www.artsy.net/#organization" },
            breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
            inLanguage: "en",
            mainEntity: {
              "@id": artistUrl,
            },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: breadcrumbItems,
          },
          ...notableWorks,
        ],
      }}
    />
  )
}

const fragment = graphql`
  fragment ArtistStructuredData_artist on Artist {
    slug
    name
    alternateNames
    awards
    birthday
    deathday
    gender
    hometown
    nationality
    href
    biographyBlurbPlain: biographyBlurb(format: PLAIN) {
      text
    }
    coverArtwork {
      image {
        cropped(width: 1200, height: 900, version: ["larger", "large"]) {
          src
          width
          height
        }
      }
    }
    verifiedRepresentatives {
      partner {
        name
        href
      }
    }
    notableArtworks(size: 3) {
      title
      href
      date
    }
    genes(size: 10) {
      name
    }
  }
`
