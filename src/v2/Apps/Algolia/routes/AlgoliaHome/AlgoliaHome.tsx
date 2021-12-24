import { Box, Text } from "@artsy/palette"
import { useMemo } from "react"
import algoliasearch from "algoliasearch"
import { InstantSearch } from "react-instantsearch-core"
import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaHome_system } from "v2/__generated__/AlgoliaHome_system.graphql"
import { getENV } from "v2/Utils/getENV"

interface AlgoliaHomeProps {
  system: AlgoliaHome_system
}

const getIndexName = () => {
  if (getENV("NODE_ENV") === "production") {
    return "Global_production"
  }

  return "Global_staging"
}

export const AlgoliaHome: React.FC<AlgoliaHomeProps> = ({ system }) => {
  const { algolia } = system
  const indexName = getIndexName()
  const searchClient = useMemo(() => {
    if (algolia?.appID && algolia.apiKey) {
      return algoliasearch(algolia.appID, algolia.apiKey)
    }

    return null
  }, [algolia?.appID, algolia?.apiKey])

  if (searchClient) {
    return (
      <Box my={4}>
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <Text>AlgoliaHome</Text>
        </InstantSearch>
      </Box>
    )
  }

  return null
}

export const AlgoliaHomeFragmentContainer = createFragmentContainer(
  AlgoliaHome,
  {
    system: graphql`
      fragment AlgoliaHome_system on System {
        algolia {
          apiKey
          appID
        }
      }
    `,
  }
)
