import React from "react"
import { Link, Meta, Title } from "react-head"
import { getENV } from "v2/Utils/getENV"

const TITLE = "Preview 60+ Top Art Fairs on Artsy | Artsy"
const DESCRIPTION =
  "Experience art fairs from all over the world before they open to the public. Browse and collect thousands of works from Art Basel, Frieze, The Armory Show, and more."
const HREF = `${getENV("APP_URL")}/art-fairs`
const IMAGE = "/images/og_image.jpg"

export const FairsMeta: React.FC = ({}) => {
  return (
    <>
      <Title>{TITLE}</Title>
      <Meta property="og:title" content={TITLE} />
      <Meta name="description" content={DESCRIPTION} />
      <Meta property="og:description" content={DESCRIPTION} />
      <Meta property="twitter:description" content={DESCRIPTION} />
      <Link rel="canonical" href={HREF} />
      <Meta property="og:url" content={HREF} />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary" />
      <Meta property="og:image" content={IMAGE} />
    </>
  )
}
