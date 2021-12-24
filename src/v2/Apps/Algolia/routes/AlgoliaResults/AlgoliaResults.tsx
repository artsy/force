import { useState, useMemo, useRef, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaResults_system } from "v2/__generated__/AlgoliaResults_system.graphql"
import algoliasearch from "algoliasearch"
import {
  InstantSearch,
  Configure,
  connectPagination,
  connectStateResults,
} from "react-instantsearch-dom"
import { useRouter } from "v2/System/Router/useRouter"
import { AlgoliaIndicesFragmentContainer } from "./Components/AlgoliaIndices"
import { AlgoliaPagination } from "./Components/AlgoliaPagination"
import {
  ANCHOR_CONTAINER_ID,
  HITS_PER_PAGE,
  DEBOUNCE_TIME,
} from "../../constants"
import { Box } from "@artsy/palette"
import { createURL, searchStateToUrl, urlToSearchState } from "../../Utils/url"
import { AlgoliaResultsListFragmentContainer } from "./Components/AlgoliaResultsList"
import { AlgoliaResultsMeta } from "./Components/AlgoliaResultsMeta"

interface AlgoliaResultsProps {
  system: AlgoliaResults_system
}

const ConnectedAlgoliaPagination = connectPagination(AlgoliaPagination)
const ConnectedAlgoliaResults = connectStateResults(
  AlgoliaResultsListFragmentContainer
)

export const AlgoliaResults: React.FC<AlgoliaResultsProps> = ({ system }) => {
  const { algolia } = system
  const { match } = useRouter()
  const [searchState, setSearchState] = useState(
    urlToSearchState(match.location.search)
  )
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const debouncedSetStateRef = useRef<NodeJS.Timeout | null>(null)
  const searchClient = useMemo(() => {
    if (algolia?.appID && algolia.apiKey) {
      return algoliasearch(algolia.appID, algolia.apiKey)
    }

    return null
  }, [algolia?.appID, algolia?.apiKey])

  const onSearchStateChange = updatedSearchState => {
    if (debouncedSetStateRef.current) {
      clearTimeout(debouncedSetStateRef.current)
    }

    debouncedSetStateRef.current = setTimeout(() => {
      const params = searchStateToUrl(updatedSearchState)
      const url = `${match.location.pathname}${params}`

      window.history.pushState(null, "", url)
    }, DEBOUNCE_TIME)

    setSearchState(updatedSearchState)
  }

  const handleIndiceSelect = (indice: number) => {
    setSelectedTabIndex(indice)
    setSearchState({
      ...searchState,
      page: 1,
    })
  }

  useEffect(() => {
    setSearchState(urlToSearchState(match.location.search))
  }, [match.location])

  if (searchClient) {
    const selectedIndice = algolia?.indices[selectedTabIndex]!

    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={selectedIndice.name}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        <AlgoliaResultsMeta />
        <Configure
          hitsPerPage={HITS_PER_PAGE}
          query={searchState.query ?? ""}
        />
        <Box id={ANCHOR_CONTAINER_ID} />
        <AlgoliaIndicesFragmentContainer
          algolia={algolia}
          onClick={handleIndiceSelect}
        />
        <ConnectedAlgoliaResults algolia={algolia} />
        <ConnectedAlgoliaPagination />
      </InstantSearch>
    )
  }

  return null
}

export const AlgoliaResultsFragmentContainer = createFragmentContainer(
  AlgoliaResults,
  {
    system: graphql`
      fragment AlgoliaResults_system on System {
        algolia {
          apiKey
          appID
          indices {
            displayName
            name
          }
          ...AlgoliaIndices_algolia
          ...AlgoliaResultsList_algolia
        }
      }
    `,
  }
)
