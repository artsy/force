import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { getPageNumber } from "Utils/url"
import type * as React from "react"
import { Link, Meta, Title } from "react-head"

const TITLE = "Modern and Contemporary Artists"

export const ArtistsByLetterMeta: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const {
    match: { params, location },
  } = useRouter()

  if (!params.letter) return <Title>{TITLE}</Title>

  const page = getPageNumber(location)
  const appUrl = getENV("APP_URL")
  const href = buildCanonicalUrl(appUrl, params.letter, page)
  const title = buildTitle(params.letter, page)
  const description = `Research and discover artists starting with ${params.letter.toUpperCase()} on Artsy. Find works for sale, biographies, CVs, and auction results.`

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

const buildCanonicalUrl = (
  appUrl: string,
  letter: string,
  page: number,
): string => {
  const basePath = `/artists/artists-starting-with-${letter}`
  const isPagedContent = page > 1

  const canonicalPath = isPagedContent ? `${basePath}?page=${page}` : basePath
  return `${appUrl}${canonicalPath}`
}

const buildTitle = (letter: string, page: number): string => {
  const baseTitle = `Artists Starting with ${letter.toUpperCase()} | ${TITLE}`
  const isPagedContent = page > 1

  return isPagedContent ? `${baseTitle} - Page ${page}` : baseTitle
}
