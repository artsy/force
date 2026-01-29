import { StructuredData } from "Components/Seo/StructuredData"
import { getArtistMeta } from "Apps/Artist/Utils/getArtistMeta"
import { getENV } from "Utils/getENV"
import type { ArtistStructuredData_artist$key } from "__generated__/ArtistStructuredData_artist.graphql"
import compact from "lodash/compact"
import { graphql, useFragment } from "react-relay"

interface ArtistStructuredDataProps {
  artist: ArtistStructuredData_artist$key
}

export const ArtistStructuredData: React.FC<ArtistStructuredDataProps> = ({
  artist,
}) => {
  const data = useFragment(fragment, artist)
  const artistUrl = `${getENV("APP_URL")}${data.href}`

  const memberOf = compact(
    data.partnersConnection?.edges?.map(edge => {
      const partner = edge?.node
      return partner?.href
        ? { "@id": `${getENV("APP_URL")}${partner.href}` }
        : null
    }),
  )

  const { title, description } = getArtistMeta({
    name: data.name,
    biographyBlurb: data.biographyBlurbPlain,
  })

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": artistUrl,
            additionalType: "Artist",
            birthDate: data.birthday ?? undefined,
            deathDate: data.deathday ?? undefined,
            description,
            gender: data.gender ?? undefined,
            image: data.coverArtwork?.image?.url ?? undefined,
            mainEntityOfPage: artistUrl,
            memberOf: memberOf.length ? memberOf : undefined,
            name: data.name ?? undefined,
            nationality: data.nationality
              ? { "@type": "Country", name: data.nationality }
              : undefined,
            url: artistUrl,
          },
          {
            "@type": "WebPage",
            "@id": artistUrl,
            name: title,
            description,
            mainEntity: {
              "@id": artistUrl,
            },
          },
        ],
      }}
    />
  )
}

const fragment = graphql`
  fragment ArtistStructuredData_artist on Artist {
    slug
    name
    birthday
    deathday
    gender
    nationality
    href
    biographyBlurbPlain: biographyBlurb(format: PLAIN) {
      text
    }
    coverArtwork {
      image {
        url(version: "large")
      }
    }
    partnersConnection(first: 10) {
      edges {
        node {
          href
        }
      }
    }
  }
`
