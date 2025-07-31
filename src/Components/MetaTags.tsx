import { getENV } from "Utils/getENV"
import { cropped } from "Utils/resized"
import { useRouter } from "System/Hooks/useRouter"
import { getPageNumber } from "Utils/url"
import type * as React from "react"
import { Link, Meta, Title } from "react-head"

const DEFAULT_TITLE = "Artsy — Discover and Buy Fine Art"
const DEFAULT_DESCRIPTION =
  "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses."
const DEFAULT_IMAGE_URL = "https://files.artsy.net/images/og_image.jpeg"
const DEFAULT_PATHNAME = "/"

interface MetaTagsProps {
  title?: string | null
  /** Optionally override the title for social media */
  socialTitle?: string | null
  /** Target a character length of 50–160 characters */
  description?: string | null
  /** Will be cropped to 1200 × 630 (1.9:1) */
  imageURL?: string | null
  /** Path relative to www.artsy.net */
  pathname?: string | null
  /** Include a `noindex, nofollow` meta tag */
  blockRobots?: boolean
  /** Enable pagination behavior - requires paginationBasePath */
  paginated?: boolean
  /** Base path for pagination (e.g., "/artist/slug/auction-results") */
  paginationBasePath?: string
}

export const MetaTags: React.FC<React.PropsWithChildren<MetaTagsProps>> = ({
  title: _title,
  socialTitle: _socialTitle,
  description: _description,
  imageURL: _imageURL,
  pathname: _pathname,
  blockRobots,
  paginated,
  paginationBasePath,
}) => {
  const { match } = useRouter()

  // Handle pagination logic
  const page = paginated ? getPageNumber(match?.location) : 1
  const isPaginated = paginated && page > 1

  // Build paginated title and pathname
  const baseTitle = _title ?? DEFAULT_TITLE
  const title = isPaginated ? `${baseTitle} - Page ${page}` : baseTitle
  const socialTitle = _socialTitle ?? title

  const basePath_resolved = paginationBasePath ?? DEFAULT_PATHNAME
  const pathname = paginated
    ? isPaginated
      ? `${basePath_resolved}?page=${page}`
      : basePath_resolved
    : (_pathname ?? DEFAULT_PATHNAME)

  const description = _description ?? DEFAULT_DESCRIPTION
  const imageURL = _imageURL ?? DEFAULT_IMAGE_URL

  const href = [
    getENV("APP_URL"),
    pathname.startsWith("/") ? pathname : `/${pathname}`,
  ].join("")

  const src = imageURL
    ? cropped(imageURL, { width: 1200, height: 630 }).src
    : null

  const card =
    !src || imageURL === DEFAULT_IMAGE_URL ? "summary" : "summary_large_image"

  return (
    <>
      {/* Primary meta tags */}
      <Title>{title}</Title>
      <Meta name="title" content={title} />
      <Meta name="description" content={description} />
      <Link rel="canonical" href={href} />

      {/* Open Graph / Facebook */}
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={href} />
      <Meta property="og:title" content={socialTitle} />
      <Meta property="og:site_name" content="Artsy" />
      <Meta property="og:description" content={description} />
      <Meta property="og:image" content={src} />
      <Meta property="fb:app_id" content="308278682573501" />

      {/* Twitter */}
      <Meta property="twitter:title" content={socialTitle} />
      <Meta property="twitter:card" content={card} />
      <Meta property="twitter:url" content={href} />
      <Meta property="twitter:site" content="@artsy" />
      <Meta property="twitter:description" content={description} />
      <Meta property="twitter:image" content={src} />

      {/* Other */}
      {blockRobots && <Meta name="robots" content="noindex, nofollow" />}
    </>
  )
}
