import { ArtistMeta_artist$data } from "__generated__/ArtistMeta_artist.graphql"
import { Person as SeoDataForArtist } from "Components/Seo/Person"
import { Component } from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistMetaCanonicalLinkFragmentContainer as ArtistMetaCanonicalLink } from "./ArtistMetaCanonicalLink"
import { getENV } from "Utils/getENV"
import { structuredDataAttributes } from "./helpers"

interface Props {
  artist: ArtistMeta_artist$data
}

export class ArtistMeta extends Component<Props> {
  renderImageMetaTags() {
    const { artist } = this.props

    const hasImage = artist?.image?.versions?.length

    if (hasImage && artist.image.versions.indexOf("large") !== -1) {
      return (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="og:image" content={artist.image.large} />
          <Meta name="thumbnail" content={artist.image.square} />
        </>
      )
    } else {
      return (
        <>
          <Meta property="twitter:card" content="summary" />
        </>
      )
    }
  }

  maybeRenderNoIndex() {
    const { artist } = this.props
    if (artist?.counts?.artworks === 0 && !artist.blurb) {
      return (
        <>
          <Meta name="robots" content="noindex, follow" />
        </>
      )
    }
  }

  renderStructuredData() {
    const { artist } = this.props

    return <SeoDataForArtist data={structuredDataAttributes(artist)} />
  }

  render() {
    const { artist } = this.props
    const metaContent = artist?.meta?.description
    const alternateNames = artist?.alternate_names || []

    return (
      <>
        <ArtistMetaCanonicalLink artist={artist} />
        <Meta name="description" content={metaContent} />
        <Meta property="og:description" content={metaContent} />
        <Meta property="twitter:description" content={metaContent} />
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
        {this.renderImageMetaTags()}
        {this.maybeRenderNoIndex()}
        {this.renderStructuredData()}
      </>
    )
  }
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
      meta {
        description
      }
      alternate_names: alternateNames
      image {
        versions
        large: url(version: "large")
        square: url(version: "square")
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
      ...ArtistMetaCanonicalLink_artist
    }
  `,
})
