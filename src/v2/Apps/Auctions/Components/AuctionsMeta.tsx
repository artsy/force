import React from "react"
import { Meta, Title } from "react-head"
import { getENV } from "v2/Utils/getENV"

export const AuctionsMeta: React.FC = () => {
  const title = "Auctions | Artsy"
  const description = ""

  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />

      <Meta name="description" content={description} />
      <Meta property="og:description" content={description} />

      <Meta property="twitter:card" content="summary" />
      <Meta property="twitter:description" content={description} />

      <Meta property="og:url" href={`${getENV("APP_URL")}/auctions`} />
      <Meta property="og:image" href="/images/og_image.jpg" />
      <Meta property="og:type" href="website" />
    </>
  )
}
