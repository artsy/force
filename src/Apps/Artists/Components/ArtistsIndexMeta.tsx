import * as React from "react"
import { Link, Meta, Title } from "react-head"
import { getENV } from "Utils/getENV"

const TITLE = "Browse Artists on Artsy | Modern and Contemporary Artists"
const DESCRIPTION =
  "Research and discover more than 100,000 modern and contemporary artists on Artsy. Find works for sale, biographies, CVs, and auction results."

export const ArtistsIndexMeta: React.FC = ({}) => {
  const href = `${getENV("APP_URL")}/artists`

  return (
    <>
      <Title>{TITLE}</Title>
      <Meta property="og:title" content={TITLE} />
      <Meta name="description" content={DESCRIPTION} />
      <Meta property="og:description" content={DESCRIPTION} />
      <Meta property="twitter:description" content={DESCRIPTION} />
      <Link rel="canonical" href={href} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary" />
    </>
  )
}
