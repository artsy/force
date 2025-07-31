import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { getPageNumber } from "Utils/url"
import type * as React from "react"

interface PaginatedMetaTagsProps {
  title?: string | null
  /** Optionally override the title for social media */
  socialTitle?: string | null
  /** Target a character length of 50–160 characters */
  description?: string | null
  /** Will be cropped to 1200 × 630 (1.9:1) */
  imageURL?: string | null
  /** Base path for pagination (e.g., "/artist/slug/auction-results") */
  basePath: string
  /** Include a `noindex, nofollow` meta tag */
  blockRobots?: boolean
}

export const PaginatedMetaTags: React.FC<
  React.PropsWithChildren<PaginatedMetaTagsProps>
> = ({ title: _title, basePath, ...props }) => {
  const { match } = useRouter()

  const page = getPageNumber(match?.location)
  const isPaginated = page > 1

  const title = isPaginated && _title ? `${_title} - Page ${page}` : _title
  const pathname = isPaginated ? `${basePath}?page=${page}` : basePath

  return <MetaTags {...props} title={title} pathname={pathname} />
}
