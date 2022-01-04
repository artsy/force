import { Hit } from "react-instantsearch-core"
import { GenericSearchResultItem } from "v2/Apps/Search/Components/GenericSearchResultItem"
import { useRouter } from "v2/System/Router/useRouter"
import { Search2Hit } from "v2/Apps/Search2/types"

interface Search2ResultItemProps {
  hit: Hit<Search2Hit>
  entityType: string
  position: number
}

export const Search2ResultItem: React.FC<Search2ResultItemProps> = ({
  hit,
  entityType,
  position,
}) => {
  const { match } = useRouter()

  return (
    <GenericSearchResultItem
      name={hit.name}
      imageUrl={hit.image_url ?? ""}
      description={hit.description ?? ""}
      entityType={entityType}
      href={hit.href}
      index={position}
      term={match.location.query?.query}
      id={hit.objectID}
    />
  )
}
