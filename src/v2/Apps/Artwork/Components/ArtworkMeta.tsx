import { ArtworkMeta_artwork } from "v2/__generated__/ArtworkMeta_artwork.graphql"
import React, { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { get } from "v2/Utils/get"

import { withSystemContext } from "v2/System"
import { SeoDataForArtworkFragmentContainer as SeoDataForArtwork } from "./Seo/SeoDataForArtwork"
import { ZendeskWrapper } from "v2/Components/ZendeskWrapper"

interface ArtworkMetaProps {
  artwork: ArtworkMeta_artwork
  googleAdId?: string
}

export class ArtworkMeta extends Component<ArtworkMetaProps> {
  componentDidMount() {
    // zEmbed represents the Zendesk object
    if (window.zEmbed) {
      window.zEmbed.show()
    }
  }

  componentWillUnmount() {
    if (window.zEmbed) {
      window.zEmbed.hide()
    }
  }

  renderImageMetaTags() {
    const { artwork } = this.props
    const { meta_image, is_shareable } = artwork
    // @ts-expect-error STRICT_NULL_CHECK
    const imageURL = get(meta_image, img => img.resized.url)

    if (is_shareable && imageURL) {
      return (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="og:image" content={imageURL} />
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          <Meta property="og:image:width" content={meta_image.resized.width} />
          <Meta
            property="og:image:height"
            // @ts-expect-error STRICT_NULL_CHECK
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

  renderGoogleAdSnippet() {
    const { artwork, googleAdId: fromPropsGoogleAdId } = this.props
    const { GOOGLE_ADWORDS_ID: fromSharifyGoogleAdId } = sd
    const { is_in_auction, isAcquireable, internalID } = artwork
    if (!is_in_auction && !isAcquireable) return

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

  get isInquiryArtwork() {
    const { isAcquireable, isInquireable, isOfferable } = this.props.artwork
    const isInquiryArtwork = isInquireable && !isAcquireable && !isOfferable
    return isInquiryArtwork
  }

  renderZendeskScript() {
    if (this.isInquiryArtwork) {
      return
    }
    if (typeof window !== "undefined" && window.zEmbed) {
      return
    }
    const zdKey = this.props.artwork.is_in_auction
      ? sd.AUCTION_ZENDESK_KEY
      : sd.ZENDESK_KEY

    return <ZendeskWrapper zdKey={zdKey} />
  }

  render() {
    const { artwork } = this.props
    // @ts-expect-error STRICT_NULL_CHECK
    const imageURL = get(artwork, a => a.meta_image.resized.url)

    return (
      <>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <Title>{artwork.meta.title}</Title>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <Meta name="description" content={artwork.meta.description} />
        {imageURL && <Meta name="thumbnail" content={imageURL} />}
        <Link rel="canonical" href={`${sd.APP_URL}${artwork.href}`} />
        <Meta
          property="twitter:description"
          // @ts-expect-error STRICT_NULL_CHECK
          content={artwork.meta.long_description}
        />
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <Meta property="og:title" content={artwork.meta.title} />
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <Meta property="og:description" content={artwork.meta.description} />
        <Meta property="og:url" content={`${sd.APP_URL}${artwork.href}`} />
        <Meta
          property="og:type"
          content={`${sd.FACEBOOK_APP_NAMESPACE}:artwork`}
        />

        <SeoDataForArtwork artwork={artwork} />
        {this.renderImageMetaTags()}
        {this.renderGoogleAdSnippet()}
        {this.renderZendeskScript()}
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
        artistNames
        sale_message: saleMessage
        partner {
          name
        }
        image_rights: imageRights
        is_in_auction: isInAuction
        isAcquireable
        isInquireable
        isOfferable
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
