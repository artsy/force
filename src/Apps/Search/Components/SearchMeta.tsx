import type * as React from "react"
import { MetaTags } from "Components/MetaTags"

interface SearchMetaProps {
  term: string
}

export const SearchMeta: React.FC<React.PropsWithChildren<SearchMetaProps>> = ({
  term,
}) => {
  const title = `Search Results for '${term}' | Artsy`
  const href = `/search?term=${term}`

  return <MetaTags title={title} pathname={href} />
}
