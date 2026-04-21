import { ArtworkStructuredData } from "Apps/Artwork/Components/ArtworkStructuredData"
import { ClientSuspense } from "Components/ClientSuspense"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import type { ArtworkMeta_artwork$key } from "__generated__/ArtworkMeta_artwork.graphql"
import { Link, Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"
import { ArtworkChatBubbleFragmentContainer } from "./ArtworkChatBubble"
import { useUnleashContext, useVariant } from "@unleash/proxy-client-react"
import { useEffect, useState } from "react"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"

interface ArtworkMetaProps {
  artwork: ArtworkMeta_artwork$key
}

export const ArtworkMeta: React.FC<
  React.PropsWithChildren<ArtworkMetaProps>
> = ({ artwork }) => {
  const { match } = useRouter()
  const data = useFragment(artworkMetaFragment, artwork)

  const updateContext = useUnleashContext()
  const variant = useVariant("diamond_artwork-title-experiment")
  const [contextReady, setContextReady] = useState(false)

  useEffect(() => {
    /**
     * Since the experiment is sticky per-artwork (rather than per-user or
     * per-session) we need to add the artwork id to the Unleash context before
     * checking or tracking the experiment flag's values.
     */
    updateContext({ properties: { artworkId: data.internalID } }).then(() => {
      setContextReady(true)
    })
  }, [data.internalID, updateContext])

  useTrackFeatureVariantOnMount({
    experimentName: "diamond_artwork-title-experiment",
    variantName: contextReady ? variant.name : "disabled",
  })

  const pathname = match.location.pathname
  const imageURL = data.metaImage?.resized?.url

  const addNoIndex = data.isUnlisted || pathname.includes(data?.internalID) // a previously private artwork URL

  return (
    <>
      <Title>{data.meta?.title}</Title>
      <Meta name="description" content={data.meta?.description} />
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

      {/* Images */}
      {imageURL && <Meta name="thumbnail" content={imageURL} />}
      {data.isShareable && imageURL ? (
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
      ) : (
        <Meta property="twitter:card" content="summary" />
      )}

      {addNoIndex && <Meta name="robots" content="noindex, follow" />}

      <ArtworkChatBubbleFragmentContainer artwork={data} />

      <ClientSuspense fallback={<></>}>
        <ArtworkStructuredData id={data.slug} />
      </ClientSuspense>
    </>
  )
}

const artworkMetaFragment = graphql`
  fragment ArtworkMeta_artwork on Artwork {
    ...ArtworkChatBubble_artwork
    slug
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
