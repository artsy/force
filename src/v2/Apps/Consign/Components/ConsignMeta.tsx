import React from "react"
import { Link, Meta, Title } from "react-head"
import { getENV } from "v2/Utils/getENV"

export const ConsignMeta: React.FC = () => {
  const title = `WIP Consign Title | Artsy` // FIXME: Need real title
  const href = `${getENV("APP_URL")}/consign2` // FIXME: consign2
  const metaDescription = "WIP"
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
      {metaImage && <Meta property="og:image" content={metaImage.src} />}
    </>
  )
}
