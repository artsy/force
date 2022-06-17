import { ArtworkMeta_artwork } from "v2/__generated__/ArtworkMeta_artwork.graphql"
import { Component } from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { get } from "v2/Utils/get"
import { SeoDataForArtworkFragmentContainer as SeoDataForArtwork } from "./Seo/SeoDataForArtwork"
import { ArtworkZendeskFragmentContainer } from "./ArtworkZendesk"

interface ArtworkMetaProps {
  artwork: ArtworkMeta_artwork
}

export class ArtworkMeta extends Component<ArtworkMetaProps> {
  renderImageMetaTags() {
    const { artwork } = this.props
    const { metaImage, isShareable } = artwork
    const imageURL = get(metaImage, img => img?.resized?.url)

    if (isShareable && imageURL) {
      return (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="og:image" content={imageURL} />
          <Meta property="og:image:width" content={metaImage?.resized?.width} />
          <Meta
            property="og:image:height"
            content={metaImage?.resized?.height}
          />
        </>
      )
    }

    return <Meta property="twitter:card" content="summary" />
  }

  render() {
    const { artwork } = this.props
    const imageURL = get(artwork, a => a.metaImage?.resized?.url)

    return (
      <>
        <Title>{artwork.meta?.title}</Title>

        <Meta name="description" content={artwork.meta?.description} />

        {imageURL && <Meta name="thumbnail" content={imageURL} />}

        <Link rel="canonical" href={`${sd.APP_URL}${artwork.href}`} />

        <Meta
          property="twitter:description"
          content={artwork.meta?.longDescription}
        />

        <Meta property="og:title" content={artwork.meta?.title} />

        <Meta property="og:description" content={artwork.meta?.description} />

        <Meta property="og:url" content={`${sd.APP_URL}${artwork.href}`} />

        <Meta
          property="og:type"
          content={`${sd.FACEBOOK_APP_NAMESPACE}:artwork`}
        />

        <SeoDataForArtwork artwork={artwork} />

        {this.renderImageMetaTags()}

        <ArtworkZendeskFragmentContainer artwork={artwork} />
      </>
    )
  }
}

export const ArtworkMetaFragmentContainer = createFragmentContainer(
  ArtworkMeta,
  {
    artwork: graphql`
      fragment ArtworkMeta_artwork on Artwork {
        ...SeoDataForArtwork_artwork
        ...ArtworkZendesk_artwork
        href
        isShareable
        metaImage: image {
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
          longDescription: description(limit: 200)
        }
      }
    `,
  }
)
