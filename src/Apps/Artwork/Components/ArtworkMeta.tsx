import { ArtworkStructuredData } from "Apps/Artwork/Components/ArtworkStructuredData"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import type { ArtworkMeta_artwork$key } from "__generated__/ArtworkMeta_artwork.graphql"
import { Link, Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"
import { ArtworkChatBubbleFragmentContainer } from "./ArtworkChatBubble"

interface ArtworkMetaProps {
  artwork: ArtworkMeta_artwork$key
}

export const ArtworkMeta: React.FC<
  React.PropsWithChildren<ArtworkMetaProps>
> = ({ artwork }) => {
  const { match } = useRouter()
  const data = useFragment(artworkMetaFragment, artwork)

  const pathname = match.location.pathname
  const imageURL = data.metaImage?.resized?.url

  const addNoIndex = data.isUnlisted || pathname.includes(data?.internalID) // a previously private artwork URL

  return (
    <>
      <Title>{data.meta?.title}</Title>
      {data.meta?.description && <Meta name="description" content={data.meta.description} />}
      <Link rel="canonical" href={`${getENV("APP_URL")}${data.href}`} />

      {data.meta?.longDescription && (
        <Meta
          property="twitter:description"
          content={data.meta.longDescription}
        />
      )}

      {data.meta?.title && <Meta property="og:title" content={data.meta.title} />}
      {data.meta?.description && <Meta property="og:description" content={data.meta.description} />}
      <Meta property="og:url" content={`${getENV("APP_URL")}${data.href}`} />
      <Meta
        property="og:type"
        content={`${getENV("FACEBOOK_APP_NAMESPACE")}:artwork`}
      />

      {/* Images */}
      {imageURL && <Meta name="thumbnail" content={imageURL} />}
      {data.isShareable && imageURL ? (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="og:image" content={imageURL} />
          <Meta
            property="og:image:width"
            content={data.metaImage?.resized?.width?.toString()}
          />
          <Meta
            property="og:image:height"
            content={data.metaImage?.resized?.height?.toString()}
          />
        </>
      ) : (
        <Meta property="twitter:card" content="summary" />
      )}

      {addNoIndex && <Meta name="robots" content="noindex, follow" />}

      <ArtworkChatBubbleFragmentContainer artwork={data} />

      <ArtworkStructuredData artwork={data} />
    </>
  )
}

const artworkMetaFragment = graphql`
  fragment ArtworkMeta_artwork on Artwork {
    ...ArtworkChatBubble_artwork
    ...ArtworkStructuredData_artwork
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
