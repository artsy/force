import * as React from "react"
import { Link, Meta, Title } from "react-head"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"

const TITLE = "Modern and Contemporary Artists"

export const ArtistsByLetterMeta: React.FC = () => {
  const {
    match: { params },
  } = useRouter()

  if (!params.letter) return <Title>{TITLE}</Title>

  const title = `Artists Starting with ${params.letter.toUpperCase()} | ${TITLE}`
  const description = `Research and discover artists starting with ${params.letter.toUpperCase()} on Artsy. Find works for sale, biographies, CVs, and auction results.`
  const appUrl = getENV("APP_URL")
  const prefix = "/artists/artists-starting-with-"
  const href = [appUrl, prefix, params.letter].join("")

  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />
      <Meta name="description" content={description} />
      <Meta property="og:description" content={description} />
      <Meta property="twitter:description" content={description} />
      <Link rel="canonical" href={href} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary" />
    </>
  )
}
