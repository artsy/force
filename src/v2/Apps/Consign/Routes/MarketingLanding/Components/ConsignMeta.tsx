import React from "react"
import { Link, Meta, Title } from "react-head"
import { getENV } from "v2/Utils/getENV"

export const ConsignMeta: React.FC = () => {
  const title = `Sell Artwork with Artsy | Art Consignment | Artsy`
  const href = `${getENV("APP_URL")}/consign`
  const metaDescription =
    "Sell and consign your art with Artsy. Get competitive offers from the world’s top auction houses and galleries to sell art from your collection. Submit today at no cost."
  const metaImage = null // FIXME: Need image for embeds

  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />
      {metaDescription && (
        <>
          <Meta name="description" content={metaDescription} />
          <Meta property="og:description" content={metaDescription} />
          <Meta property="twitter:description" content={metaDescription} />
        </>
      )}
      <Link rel="canonical" href={href} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary" />
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      {metaImage && <Meta property="og:image" content={metaImage.src} />}
    </>
  )
}
