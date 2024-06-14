import { ArtworkMeta_artwork$key } from "__generated__/ArtworkMeta_artwork.graphql"
import { Link, Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"
import { SeoDataForArtworkFragmentContainer as SeoDataForArtwork } from "./Seo/SeoDataForArtwork"
import { ArtworkChatBubbleFragmentContainer } from "./ArtworkChatBubble"
import { getENV } from "Utils/getENV"
import { useRouter } from "System/Hooks/useRouter"

interface ArtworkMetaProps {
  artwork: ArtworkMeta_artwork$key
}

export const ArtworkMeta: React.FC<ArtworkMetaProps> = ({ artwork }) => {
  const { match } = useRouter()
  const data = useFragment(artworkMetaFragment, artwork)

  const pathname = match.location.pathname
  const imageURL = data.metaImage?.resized?.url

  const addNoIndex = data.isUnlisted || pathname.includes(data?.internalID) // a previously private artwork URL

  const renderImageMetaTags = () => {
    if (data.isShareable && imageURL) {
      return (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="og:image" content={imageURL} />
          <Meta
            property="og:image:width"
            content={data.metaImage?.resized?.width}
          />
          <Meta
            property="og:image:height"
            content={data.metaImage?.resized?.height}
          />
        </>
      )
    }

    return <Meta property="twitter:card" content="summary" />
  }

  return (
    <>
      <Title>{data.meta?.title}</Title>
      <Meta name="description" content={data.meta?.description} />
      {imageURL && <Meta name="thumbnail" content={imageURL} />}
      <Link rel="canonical" href={`${getENV("APP_URL")}${data.href}`} />
      <Meta
        property="twitter:description"
        content={data.meta?.longDescription}
      />
      <Meta property="og:title" content={data.meta?.title} />
      <Meta property="og:description" content={data.meta?.description} />
      <Meta property="og:url" content={`${getENV("APP_URL")}${data.href}`} />
      <Meta
        property="og:type"
        content={`${getENV("FACEBOOK_APP_NAMESPACE")}:artwork`}
      />
      <SeoDataForArtwork artwork={data} />
      {renderImageMetaTags()}
      {addNoIndex && <Meta name="robots" content="noindex, follow" />}
      <ArtworkChatBubbleFragmentContainer artwork={data} />
    </>
  )
}

const artworkMetaFragment = graphql`
  fragment ArtworkMeta_artwork on Artwork {
    ...SeoDataForArtwork_artwork
    ...ArtworkChatBubble_artwork
    href
    internalID
    isShareable
    isUnlisted
    metaImage: image {
      resized(width: 640, height: 640, version: ["large", "medium", "tall"]) {
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
`
