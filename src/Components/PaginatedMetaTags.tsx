import { MetaTags, type MetaTagsProps } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import { getPageNumber } from "Utils/url"
import type * as React from "react"

export const PaginatedMetaTags: React.FC<
  React.PropsWithChildren<Omit<MetaTagsProps, "pathname">>
> = ({ title: _title, ...props }) => {
  const { match } = useRouter()

  const page = getPageNumber(match?.location)
  const basePath = match?.location.pathname || "/"

  const isPaginated = page > 1

  const title = isPaginated && _title ? `${_title} - Page ${page}` : _title
  const pathname = page > 1 ? `${basePath}?page=${page}` : basePath

  return <MetaTags {...props} title={title} pathname={pathname} />
}
