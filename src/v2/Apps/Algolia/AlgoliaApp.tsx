import { useState, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaApp_system } from "v2/__generated__/AlgoliaApp_system.graphql"
import algoliasearch from "algoliasearch"
import {
  InstantSearch,
  Configure,
  Hits,
  connectPagination,
} from "react-instantsearch-dom"
import { useRouter } from "v2/System/Router/useRouter"
import { AlgoliaIndicesFragmentContainer } from "./Components/AlgoliaIndices"
import { AlgoliaResultItem } from "./Components/AlgoliaResultItem"
import { AlgoliaPagination } from "./Components/AlgoliaPagination"
import { HITS_PER_PAGE } from "./constants"

interface AlgoliaAppProps {
  system: AlgoliaApp_system
}

const ConnectedAlgoliaPagination = connectPagination(AlgoliaPagination)

export const AlgoliaApp: React.FC<AlgoliaAppProps> = ({ system, children }) => {
  const { algolia } = system
  const {
    match: { location },
  } = useRouter()
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const searchClient = useMemo(() => {
    if (algolia?.appID && algolia.apiKey) {
      return algoliasearch(algolia.appID, algolia.apiKey)
    }

    return null
  }, [algolia?.appID, algolia?.apiKey])

  if (searchClient) {
    const selectedIndice = algolia?.indices[selectedTabIndex]!

    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={selectedIndice.name}
      >
        <Configure query={location.query?.query} hitsPerPage={HITS_PER_PAGE} />
        <AlgoliaIndicesFragmentContainer
          algolia={algolia}
          onClick={setSelectedTabIndex}
        />
        <Hits
          hitComponent={({ hit }) => (
            <AlgoliaResultItem
              hit={hit}
              entityType={selectedIndice.displayName ?? ""}
            />
          )}
        />
        <ConnectedAlgoliaPagination />
      </InstantSearch>
    )
  }

  return null
}

export const AlgoliaAppFragmentContainer = createFragmentContainer(AlgoliaApp, {
  system: graphql`
    fragment AlgoliaApp_system on System {
      algolia {
        apiKey
        appID
        indices {
          displayName
          name
        }
        ...AlgoliaIndices_algolia
      }
    }
  `,
})
