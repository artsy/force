import { Box } from "@artsy/palette"
import { GenericSearchResultItem } from "v2/Apps/Search/Components/GenericSearchResultItem"
import { useRouter } from "v2/System/Router/useRouter"

export const AlgoliaResultItem = ({ hit }) => {
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
