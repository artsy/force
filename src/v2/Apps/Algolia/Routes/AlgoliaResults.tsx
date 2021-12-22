import * as React from "react"
import { Box } from "@artsy/palette"
import { Hits, Pagination } from "react-instantsearch-dom"
import { GenericSearchResultItem } from "v2/Apps/Search/Components/GenericSearchResultItem"
import { useRouter } from "v2/System/Router/useRouter"

const Hit = ({ hit }) => {
  const { match } = useRouter()

  return (
    <Box>
      <GenericSearchResultItem
        name={hit.name}
        imageUrl={hit.image_url}
        entityType="Artist"
        href={hit.href}
        index={hit.__position - 1}
        term={match.location.query?.query}
        id={hit.objectID}
      />
    </Box>
  )
}

export const AlgoliaResults = () => {
  return (
    <Box>
      <Hits hitComponent={Hit} />
      <Pagination />
    </Box>
  )
}
