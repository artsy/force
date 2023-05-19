import { graphql } from "react-relay"
import { useState } from "react"
import { AutocompleteInput } from "@artsy/palette"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { PriceDatabaseArtistAutosuggestQuery } from "__generated__/PriceDatabaseArtistAutosuggestQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import { compact } from "lodash"

interface ArtistAutosuggestProps {
  onChange: (slug: string) => void
}

export const PriceDatabaseArtistAutosuggest: React.FC<ArtistAutosuggestProps> = ({
  onChange,
}) => {
  const [query, setQuery] = useState("")

  const { data, loading } = useClientQuery<PriceDatabaseArtistAutosuggestQuery>(
    { query: QUERY, variables: { query } }
  )

  const options = compact(
    extractNodes(data?.searchConnection).map(node => {
      if (!node.value || !node.text) return null
      return { text: node.text, value: node.value }
    })
  )

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(value)
  }

  return (
    <AutocompleteInput
      placeholder="Search by Artist Name"
      options={options}
      onChange={handleChange}
      onSelect={option => onChange(option.value)}
      loading={loading}
    />
  )
}

const QUERY = graphql`
  query PriceDatabaseArtistAutosuggestQuery($query: String!) {
    searchConnection(
      query: $query
      entities: ARTIST
      mode: AUTOSUGGEST
      first: 10
    ) {
      edges {
        node {
          text: displayLabel
          ... on Artist {
            internalID
            value: slug
          }
        }
      }
    }
  }
`
