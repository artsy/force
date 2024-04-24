import { ArtworkMeta_artwork$data } from "__generated__/ArtworkMeta_artwork.graphql"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { SeoDataForArtworkFragmentContainer as SeoDataForArtwork } from "./Seo/SeoDataForArtwork"
import { ArtworkChatBubbleFragmentContainer } from "./ArtworkChatBubble"
import { getENV } from "Utils/getENV"
import { useRouter } from "System/Router/useRouter"

interface ArtworkMetaProps {
  artwork: ArtworkMeta_artwork$data
}

export const ArtworkMeta: React.FC<ArtworkMetaProps> = ({ artwork }) => {
  const { match } = useRouter()

  const pathname = match.location.pathname
  const imageURL = artwork?.metaImage?.resized?.url

  const addNoIndex =
    artwork?.isUnlisted || pathname.includes(artwork?.internalID) // a previously private artwork URL

  const renderImageMetaTags = () => {
    const { metaImage, isShareable } = artwork

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

  return (
    <>
      <Title>{artwork.meta?.title}</Title>
      <Meta name="description" content={artwork.meta?.description} />
      {imageURL && <Meta name="thumbnail" content={imageURL} />}
      <Link rel="canonical" href={`${getENV("APP_URL")}${artwork.href}`} />
      <Meta
        property="twitter:description"
        content={artwork.meta?.longDescription}
      />
      <Meta property="og:title" content={artwork.meta?.title} />
      <Meta property="og:description" content={artwork.meta?.description} />
      <Meta property="og:url" content={`${getENV("APP_URL")}${artwork.href}`} />
      <Meta
        property="og:type"
        content={`${getENV("FACEBOOK_APP_NAMESPACE")}:artwork`}
      />
      <SeoDataForArtwork artwork={artwork} />
      {renderImageMetaTags()}
      {addNoIndex && <Meta name="robots" content="noindex, follow" />}
      <ArtworkChatBubbleFragmentContainer artwork={artwork} />
    </>
  )
}

export const ArtworkMetaFragmentContainer = createFragmentContainer(
  ArtworkMeta,
  {
    artwork: graphql`
      fragment ArtworkMeta_artwork on Artwork {
        ...SeoDataForArtwork_artwork
        ...ArtworkChatBubble_artwork
        href
        internalID
        isShareable
        isUnlisted
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
