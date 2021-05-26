import React from "react"
import { Link, Meta, Title } from "react-head"
import { getENV } from "v2/Utils/getENV"

export const AuctionsMeta: React.FC = () => {
  const title = "Auctions on Artsy | Premium Artworks from In-Demand Artists"
  const description =
    "Bid in live and online-only sales from the world’s leading auction houses. Browse paintings, sculptures, design, prints & multiples and more."
  const href = `${getENV("APP_URL")}/auctions`

  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />

      <Meta name="description" content={description} />
      <Meta property="og:description" content={description} />

      <Meta property="twitter:card" content="summary" />
      <Meta property="twitter:description" content={description} />

      <Link rel="canonical" href={href} />
      <Meta property="og:url" href={href} />
      <Meta property="og:image" href="/images/og_image.jpg" />
      <Meta property="og:type" href="website" />
    </>
  )
}
