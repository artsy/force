import { MetaTags, type MetaTagsProps } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { getPageNumber } from "Utils/url"
import type * as React from "react"

export const PaginatedMetaTags: React.FC<
  React.PropsWithChildren<Omit<MetaTagsProps, "pathname">>
> = ({ title: _title, ...props }) => {
  const { match } = useRouter()

  const page = getPageNumber(match?.location)
  const isPaginated = page > 1

  const basePath = match?.location.pathname || "/"

  const title = isPaginated && _title ? `${_title} - Page ${page}` : _title
  const pathname = isPaginated ? `${basePath}?page=${page}` : basePath

  return <MetaTags {...props} title={title} pathname={pathname} />
}
