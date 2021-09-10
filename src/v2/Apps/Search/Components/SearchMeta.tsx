import React from "react"
import { Link, Meta, Title } from "react-head"
import { data as sd } from "sharify"

interface SearchMetaProps {
  term: string
}

export const SearchMeta: React.FC<SearchMetaProps> = ({ term }) => {
  const title = `Search Results for '${term}' | Artsy`
  const href = `/search?term=${term}`
  return (
    <>
      <Title>{title}</Title>
      <Link rel="canonical" href={`${sd.APP_URL}${href}`} />
      <Meta property="og:title" content={title} />
      <Meta property="og:url" content={`${sd.APP_URL}${href}`} />
    </>
  )
}
