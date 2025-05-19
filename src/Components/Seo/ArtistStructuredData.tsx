import { StructuredData } from "Components/Seo/StructuredData"
import { getENV } from "Utils/getENV"
import type { ArtistStructuredData_artist$key } from "__generated__/ArtistStructuredData_artist.graphql"
import compact from "lodash/compact"
import { graphql, useFragment } from "react-relay"

interface Props {
  artist: ArtistStructuredData_artist$key
}

export const ArtistStructuredData: React.FC<Props> = ({ artist }) => {
  const data = useFragment(fragment, artist)
  const artistUrl = `${getENV("APP_URL")}${data.href}`

  const creatorOf = data.artworks_connection?.edges
    ?.map(edge => {
      const artwork = edge?.node
      if (!artwork || !artwork.title || !artwork.href) return null
      const artworkUrl = `${getENV("APP_URL")}${artwork.href}`

      return {
        "@type": "VisualArtwork",
        name: artwork.title,
        dateCreated: artwork.date,
        artform: artwork.category,
        url: artworkUrl,
        image: artwork.image?.large,
      }
    })
    .filter(Boolean)

  const memberOf = compact(
    data.artworks_connection?.edges?.map(edge => {
      const partner = edge?.node?.partner
      return partner?.name && partner?.href
        ? {
            "@type": "ArtGallery",
            name: partner.name,
            url: `${getENV("APP_URL")}${partner.href}`,
          }
        : null
    }),
  )

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": artistUrl,
            additionalType: "Artist",
            birthDate: data.birthday,
            deathDate: data.deathday,
            description: data.meta?.description,
            gender: data.gender,
            image: data.coverArtwork?.image?.large,
            mainEntityOfPage: artistUrl,
            name: data.name,
            url: artistUrl,
            nationality: data.nationality
              ? { "@type": "Country", name: data.nationality }
              : undefined,
            creatorOf: creatorOf?.length ? creatorOf : undefined,
            memberOf: memberOf.length ? memberOf : undefined,
          },
          {
            "@type": "WebPage",
            "@id": artistUrl,
            name: data.meta?.title,
            description: data.meta?.description,
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
    meta(page: ABOUT) {
      title
      description
    }
    coverArtwork {
      image {
        large: url(version: "large")
      }
    }
    artworks_connection: artworksConnection(
      first: 10
      filter: IS_FOR_SALE
      published: true
    ) {
      edges {
        node {
          title
          date
          category
          href
          image {
            large: url(version: "large")
          }
          partner {
            name
            href
          }
        }
      }
    }
  }
`
