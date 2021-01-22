import React from "react"
import { Meta, Title } from "react-head"
import { getENV } from "v2/Utils/getENV"

export const AuctionsMeta: React.FC = () => {
  return (
    <>
      <Title>AuctionsApp App | Artsy</Title>
      <Meta property="og:title" content="Example App" />
      <Meta name="description" content="Fill this with a proper description" />
      <Meta
        property="og:description"
        content="Fill this with a proper description"
      />
      <Meta
        property="twitter:description"
        content="Fill this with a proper description"
      />
      <Meta property="og:url" href={`${getENV("APP_URL")}/example`} />
      <Meta
        property="og:type"
        href={`${getENV("FACEBOOK_APP_NAMESPACE")}:example`}
      />
    </>
  )
}
