import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaApp_system } from "v2/__generated__/AlgoliaApp_system.graphql"
import algoliasearch from "algoliasearch"
import { InstantSearch } from "react-instantsearch-dom"

interface AlgoliaAppProps {
  system: AlgoliaApp_system
}

export const AlgoliaApp: React.FC<AlgoliaAppProps> = ({ system, children }) => {
  const { algolia } = system
  const searchClient = React.useMemo(() => {
    if (algolia?.appID && algolia.apiKey) {
      return algoliasearch(algolia.appID, algolia.apiKey)
    }

    return null
  }, [algolia?.appID, algolia?.apiKey])

  if (searchClient) {
    return (
      <InstantSearch searchClient={searchClient} indexName="Artist_staging">
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
      }
    }
  `,
})
