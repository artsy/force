import { AutocompleteInput } from "@artsy/palette"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { extractNodes } from "Utils/extractNodes"
import { compact, debounce } from "lodash"
import { FC, useMemo, useState } from "react"
import { graphql } from "react-relay"
import { SearchRouteQuery } from "__generated__/SearchRouteQuery.graphql"
import { SearchRouteOptionFragmentContainer } from "Apps/Example/Routes/Search/SearchRouteOption"

export const SearchRoute: FC = () => {
  const [query, setQuery] = useState("")

  const { data, loading } = useClientQuery<SearchRouteQuery>({
    query: QUERY,
    variables: { query },
  })

  const options = compact(
    extractNodes(data?.matchConnection).map(node => {
      if (!node) return null

      return {
        // Internally, `AutocompleteInput` requires a display `text` and a `value`
        value: node.value!,
        text: node.text!,
        // Pass on the node for the fragment container
        artist: node,
      }
    })
  )

  const handleChange = useMemo(
    () =>
      debounce(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        console.log("setting value", value)
        setQuery(value)
      }, 250),
    []
  )

  return (
    <AutocompleteInput
      placeholder="Search by Artist Name"
      options={options}
      onChange={handleChange}
      loading={loading}
      renderOption={({ artist }) => {
        return <SearchRouteOptionFragmentContainer artist={artist} />
      }}
    />
  )
}

const QUERY = graphql`
  query SearchRouteQuery($query: String!) {
    matchConnection(
      term: $query
      entities: ARTIST
      mode: AUTOSUGGEST
      first: 7
    ) {
      edges {
        node {
          ... on Artist {
            ...SearchRouteOption_artist
            text: name
            value: slug
          }
        }
      }
    }
  }
`
