import { useState, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaApp_system } from "v2/__generated__/AlgoliaApp_system.graphql"
import algoliasearch from "algoliasearch"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import { useRouter } from "v2/System/Router/useRouter"
import { AlgoliaIndicesFragmentContainer } from "./Components/AlgoliaIndices"

interface AlgoliaAppProps {
  system: AlgoliaApp_system
}

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
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={algolia?.indices[selectedTabIndex].name}
      >
        <Configure query={location.query?.query} />
        <AlgoliaIndicesFragmentContainer
          algolia={algolia}
          onClick={setSelectedTabIndex}
        />
        {children}
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
          name
        }
        ...AlgoliaIndices_algolia
      }
    }
  `,
})
