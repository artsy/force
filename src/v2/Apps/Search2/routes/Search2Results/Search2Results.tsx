import { useState, useMemo, useRef, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Search2Results_system } from "v2/__generated__/Search2Results_system.graphql"
import algoliasearch from "algoliasearch"
import {
  InstantSearch,
  Configure,
  connectPagination,
  connectStateResults,
} from "react-instantsearch-core"
import { useRouter } from "v2/System/Router/useRouter"
import { Search2IndicesFragmentContainer } from "./Components/Search2Indices"
import { Search2Pagination } from "./Components/Search2Pagination"
import {
  ANCHOR_CONTAINER_ID,
  HITS_PER_PAGE,
  DEBOUNCE_TIME,
} from "../../constants"
import { Box } from "@artsy/palette"
import {
  createURL,
  searchStateToUrl,
  urlToSearchState,
} from "v2/Apps/Search2/Utils/url"
import { Search2ResultsListFragmentContainer } from "./Components/Search2ResultsList"
import { Search2ResultsMeta } from "./Components/Search2ResultsMeta"

interface Search2ResultsProps {
  system: Search2Results_system
}

const ConnectedSearch2Pagination = connectPagination(Search2Pagination)
const ConnectedSearch2Results = connectStateResults(
  Search2ResultsListFragmentContainer
)

export const Search2Results: React.FC<Search2ResultsProps> = ({ system }) => {
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
  const selectedIndice = algolia?.indices?.[selectedTabIndex]

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

  if (searchClient && selectedIndice) {
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={selectedIndice.name}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        <Search2ResultsMeta />
        <Configure
          hitsPerPage={HITS_PER_PAGE}
          query={searchState.query ?? ""}
        />
        <Box id={ANCHOR_CONTAINER_ID} />
        <Search2IndicesFragmentContainer
          algolia={algolia}
          selectedIndiceName={selectedIndice.name}
          onClick={handleIndiceSelect}
        />
        <ConnectedSearch2Results algolia={algolia} />
        <ConnectedSearch2Pagination />
      </InstantSearch>
    )
  }

  return null
}

export const Search2ResultsFragmentContainer = createFragmentContainer(
  Search2Results,
  {
    system: graphql`
      fragment Search2Results_system on System {
        algolia {
          apiKey
          appID
          indices {
            displayName
            name
          }
          ...Search2Indices_algolia
          ...Search2ResultsList_algolia
        }
      }
    `,
  }
)
