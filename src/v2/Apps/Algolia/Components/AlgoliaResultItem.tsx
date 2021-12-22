import { Box } from "@artsy/palette"
import { GenericSearchResultItem } from "v2/Apps/Search/Components/GenericSearchResultItem"
import { useRouter } from "v2/System/Router/useRouter"

interface AlgoliaResultItemProps {
  hit: any
  entityType: string
}

export const AlgoliaResultItem: React.FC<AlgoliaResultItemProps> = ({
  hit,
  entityType,
}) => {
  const { match } = useRouter()

  return (
    <Box>
      <GenericSearchResultItem
        name={hit.name}
        imageUrl={hit.image_url}
        entityType={entityType}
        href={hit.href}
        index={hit.__position - 1}
        term={match.location.query?.query}
        id={hit.objectID}
      />
    </Box>
  )
}
