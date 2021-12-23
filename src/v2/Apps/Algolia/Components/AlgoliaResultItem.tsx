import { Hit } from "react-instantsearch-core"
import { GenericSearchResultItem } from "v2/Apps/Search/Components/GenericSearchResultItem"
import { useRouter } from "v2/System/Router/useRouter"
import { AlgoliaHit } from "../types"

interface AlgoliaResultItemProps {
  hit: Hit<AlgoliaHit>
  entityType: string
  position: number
}

export const AlgoliaResultItem: React.FC<AlgoliaResultItemProps> = ({
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
