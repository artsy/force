import * as React from "react"
import { Title, Meta, Link } from "react-head"
import { getENV } from "Utils/getENV"
import { cropped } from "Utils/resized"

const DEFAULT_TITLE = "Artsy — Discover, Buy, and Sell Fine Art"
const DEFAULT_DESCRIPTION =
  "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses."
const DEFAULT_IMAGE_URL = "https://files.artsy.net/images/og_image.jpeg"
const DEFAULT_PATHNAME = "/"

interface MetaTagsProps {
  title?: string | null
  /** Target a character length of 50–160 characters */
  description?: string | null
  /** Will be cropped to 1200 × 630 (1.9:1) */
  imageURL?: string | null
  /** Path relative to www.artsy.net */
  pathname?: string | null
  /** Include a `noindex, nofollow` meta tag */
  blockRobots?: boolean
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title: _title,
  description: _description,
  imageURL: _imageURL,
  pathname: _pathname,
  blockRobots,
}) => {
  const title = _title ?? DEFAULT_TITLE
  const description = _description ?? DEFAULT_DESCRIPTION
  const imageURL = _imageURL ?? DEFAULT_IMAGE_URL
  const pathname = _pathname ?? DEFAULT_PATHNAME

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
      <Meta property="og:title" content={title} />
      <Meta property="og:site_name" content="Artsy" />
      <Meta property="og:description" content={description} />
      <Meta property="og:image" content={src} />
      <Meta property="fb:app_id" content="308278682573501" />

      {/* Twitter */}
      <Meta property="twitter:title" content={title} />
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
