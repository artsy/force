import React from "react"
import { Link, Meta, Title } from "react-head"
import { getENV } from "v2/Utils/getENV"

export const PriceDatabaseMeta: React.FC = () => {
  const title = `Artsy | Artsy Price Database`
  const href = `${getENV("APP_URL")}/price-database`
  const metaDescription =
    "Search auction results for more than 340,000 artists for free."
  const metaImage = null // TODO: Need image for embeds

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
      {metaImage && <Meta property="og:image" content={metaImage} />}
    </>
  )
}
