import React from "react"
import { MetaTags } from "v2/Components/MetaTags"

interface SearchMetaProps {
  term: string
}

export const SearchMeta: React.FC<SearchMetaProps> = ({ term }) => {
  const title = `Search Results for '${term}' | Artsy`
  const href = `/search?term=${term}`

  return <MetaTags title={title} pathname={href} />
}
