import { ArtistMeta_artist$data } from "__generated__/ArtistMeta_artist.graphql"
import { Person as SeoDataForArtist } from "Components/Seo/Person"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { getENV } from "Utils/getENV"
import { structuredDataAttributes } from "./helpers"
import { MetaTags } from "Components/MetaTags"

interface Props {
  artist: ArtistMeta_artist$data
}

export const ArtistMeta: React.FC<Props> = ({ artist }) => {
  const alternateNames = artist?.alternateNames || []

  return (
    <>
      <MetaTags
        title={artist.meta.title}
        description={artist.meta.description}
        imageURL={artist.coverArtwork?.image?.large}
        pathname={artist.href}
      />

      <Meta
        property="og:url"
        href={`${getENV("APP_URL")}/artist/${artist.slug}`}
      />
      <Meta
        property="og:type"
        href={`${getENV("FACEBOOK_APP_NAMESPACE")}:artist`}
      />

      {artist.nationality && (
        <Meta property="og:nationality" content={artist.nationality} />
      )}

      {artist.birthday && (
        <Meta property="og:birthyear" content={artist.birthday} />
      )}

      {artist.deathday && (
        <Meta property="og:deathyear" content={artist.deathday} />
      )}

      {alternateNames.length > 0 && (
        <Meta name="skos:prefLabel" content={alternateNames.join("; ")} />
      )}

      <SeoDataForArtist data={structuredDataAttributes(artist)} />
    </>
  )
}

export const ArtistMetaFragmentContainer = createFragmentContainer(ArtistMeta, {
  artist: graphql`
    fragment ArtistMeta_artist on Artist {
      slug
      name
      nationality
      birthday
      deathday
      gender
      href
      meta(page: ABOUT) {
        description
        title
      }
      alternateNames
      coverArtwork {
        image {
          large: url(version: "large")
        }
      }
      counts {
        artworks
      }
      blurb
      artworks_connection: artworksConnection(
        first: 10
        filter: IS_FOR_SALE
        published: true
      ) {
        edges {
          node {
            title
            date
            description
            category
            price_currency: priceCurrency
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
            availability
            href
            image {
              small: url(version: "small")
              large: url(version: "large")
            }
            partner {
              name
              href
              profile {
                image {
                  small: url(version: "small")
                  large: url(version: "large")
                }
              }
            }
          }
        }
      }
    }
  `,
})
