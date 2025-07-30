import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { getPageNumber } from "Utils/url"
import type * as React from "react"
import { Link, Meta, Title } from "react-head"

interface PaginationMetaProps {
  basePath: string
  title: string
  description: string
}

export const PaginationMeta: React.FC<PaginationMetaProps> = ({
  basePath,
  title,
  description,
}) => {
  const {
    match: { location },
  } = useRouter()

  const page = getPageNumber(location)
  const appUrl = getENV("APP_URL")
  const href = buildCanonicalUrl(appUrl, basePath, page)
  const pageTitle = buildTitle(title, page)

  return (
    <>
      <Title>{pageTitle}</Title>
      <Meta property="og:title" content={pageTitle} />
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
  basePath: string,
  page: number,
): string => {
  const isPagedContent = page > 1
  const canonicalPath = isPagedContent ? `${basePath}?page=${page}` : basePath
  return `${appUrl}${canonicalPath}`
}

const buildTitle = (title: string, page: number): string => {
  const isPagedContent = page > 1
  return isPagedContent ? `Page ${page}: ${title}` : title
}

export const buildPaginatedHeading = (
  heading: string,
  page: number,
): string => {
  const isPagedContent = page > 1
  return isPagedContent ? `Page ${page}: ${heading}` : heading
}
