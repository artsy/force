import React from "react"
import { Meta, Title, Link } from "react-head"
import { getENV } from "v2/Utils/getENV"
import { cropped } from "v2/Utils/resized"

export const BuyerGuaranteeMeta: React.FC = () => {
  const title = "The Artsy Guarantee - Authenticity and Secure Payment"
  const href = `${getENV("APP_URL")}/buyer-guarantee`
  const description =
    "Artsy is the safest place to buy the art you love. Every purchase made exclusively with Artsy’s secure checkout benefits from our full suite of buyer protections."
  const src = cropped("https://files.artsy.net/buyerGuaranteeHeroImage.jpg", {
    width: 1600,
    height: 800,
  })

  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />

      {description && (
        <>
          <Meta name="description" content={description} />
          <Meta property="og:description" content={description} />
          <Meta property="twitter:description" content={description} />
        </>
      )}

      {href && (
        <>
          <Link rel="canonical" href={href} />
          <Meta property="og:url" content={href} />
        </>
      )}

      {src && (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          <Meta property="og:image" content={src} />
        </>
      )}

      {!src && <Meta property="twitter:card" content="summary" />}

      <Meta property="twitter:site" content="@artsy" />
      <Meta property="og:type" content="website" />
      <Meta name="robots" content="all" />
    </>
  )
}
