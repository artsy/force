import { ArtworkMeta_artwork } from "v2/__generated__/ArtworkMeta_artwork.graphql"
import React, { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { get } from "v2/Utils/get"

import { withSystemContext } from "v2/Artsy"
import { SeoDataForArtworkFragmentContainer as SeoDataForArtwork } from "./Seo/SeoDataForArtwork"

interface ArtworkMetaProps {
  artwork: ArtworkMeta_artwork
  googleAdId?: string
}

export class ArtworkMeta extends Component<ArtworkMetaProps> {
  renderImageMetaTags() {
    const { artwork } = this.props
    const { meta_image, is_shareable } = artwork
    const imageURL = get(meta_image, img => img.resized.url)

    if (is_shareable && imageURL) {
      return (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="og:image" content={imageURL} />
          <Meta property="og:image:width" content={meta_image.resized.width} />
          <Meta
            property="og:image:height"
            content={meta_image.resized.height}
          />
        </>
      )
    }

    return (
      <>
        <Meta property="twitter:card" content="summary" />
      </>
    )
  }

  renderSailthruTags() {
    const { artwork } = this.props
    const imageURL = get(artwork, a => a.meta_image.resized.url)

    if (artwork.context && artwork.context.__typename === "Fair") {
      return (
        <>
          <Meta name="artwork_type" content="fair" />
          <Meta name="artwork_date" content={artwork.date} />
          {artwork.artist_names && (
            <Meta name="artist_name" content={artwork.artist_names} />
          )}
          {artwork.sale_message && (
            <Meta name="price" content={artwork.sale_message} />
          )}
          <Meta name="sailthru_fair_slug" content={artwork.context.slug} />
          <Meta name="sailthru_fair_name" content={artwork.context.name} />
          <Meta name="sailthru_fair_page" content="artwork" />
          {artwork.partner && (
            <Meta name="sailthru_partner_name" content={artwork.partner.name} />
          )}
          {artwork.image_rights && (
            <Meta name="sailthru_credit" content={artwork.image_rights} />
          )}
          {imageURL && <Meta name="image" content={imageURL} />}
        </>
      )
    }
  }

  renderGoogleAdSnippet() {
    const { artwork, googleAdId: fromPropsGoogleAdId } = this.props
    const { GOOGLE_ADWORDS_ID: fromSharifyGoogleAdId } = sd
    const { is_in_auction, is_acquireable, internalID } = artwork
    if (!is_in_auction && !is_acquireable) return

    // TODO: Investigate always being able to select from sharify.
    const googleAdId = fromSharifyGoogleAdId || fromPropsGoogleAdId
    if (!googleAdId) return

    const script = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', "${googleAdId}");
      gtag('event', 'page_view', {
        'send_to': "${googleAdId}",
        'dynx_itemid': "${internalID}"
      });`

    // The below might be a useful guard if scripts start to be evaluated twice.
    // const isServer = typeof window === "undefined"
    // if (!isServer) return

    return (
      <>
        <Meta
          tag="script"
          type="text/javascript"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdId}`}
        />
        <Meta
          tag="script"
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: script }}
        />
      </>
    )
  }

  render() {
    const { artwork } = this.props
    const imageURL = get(artwork, a => a.meta_image.resized.url)

    return (
      <>
        <Title>{artwork.meta.title}</Title>
        <Meta name="description" content={artwork.meta.description} />
        {imageURL && <Meta name="thumbnail" content={imageURL} />}
        <Link rel="canonical" href={`${sd.APP_URL}${artwork.href}`} />
        <Meta
          property="twitter:description"
          content={artwork.meta.long_description}
        />
        <Meta property="og:title" content={artwork.meta.title} />
        <Meta property="og:description" content={artwork.meta.description} />
        <Meta property="og:url" content={`${sd.APP_URL}${artwork.href}`} />
        <Meta
          property="og:type"
          content={`${sd.FACEBOOK_APP_NAMESPACE}:artwork`}
        />

        <SeoDataForArtwork artwork={artwork} />
        {this.renderImageMetaTags()}
        {this.renderSailthruTags()}
        {this.renderGoogleAdSnippet()}
      </>
    )
  }
}

export const ArtworkMetaFragmentContainer = createFragmentContainer(
  withSystemContext(ArtworkMeta),
  {
    artwork: graphql`
      fragment ArtworkMeta_artwork on Artwork {
        href
        internalID
        date
        artist_names: artistNames
        sale_message: saleMessage
        partner {
          name
        }
        image_rights: imageRights
        is_in_auction: isInAuction
        is_acquireable: isAcquireable
        is_shareable: isShareable
        meta_image: image {
          resized(
            width: 640
            height: 640
            version: ["large", "medium", "tall"]
          ) {
            width
            height
            url
          }
        }
        meta {
          title
          description(limit: 155)
          long_description: description(limit: 200)
        }
        context {
          __typename
          ... on Fair {
            slug
            name
          }
        }
        ...SeoDataForArtwork_artwork
      }
    `,
  }
)
