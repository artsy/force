import { SavesArtworkGridFragmentContainer } from "./SavesArtworkGrid"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"
import { SavesArtworksQuery } from "__generated__/SavesArtworksQuery.graphql"
import {
  ArtworkFilterContextProvider,
  Counts,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { SortOptions } from "Components/SortFilter"
import { FC } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Box, Spacer, Text } from "@artsy/palette"

interface SavesArtworksQueryRendererProps {
  collectionID: string
  relay: RelayRefetchProp
}

interface SavesArtworksProps extends SavesArtworksQueryRendererProps {
  collection: SavesArtworks_collection$data
  collectionID: string
}

const SavesArtworks: FC<SavesArtworksProps> = ({
  collection,
  collectionID,
  relay,
}) => {
  const { match } = useRouter()

  // TODO: Update sort options
  const sortOptions: SortOptions = [
    { value: "updated_at", text: "Recently Saved" },
    { value: "created_at", text: "Oldest First" },
  ]

  const counts: Counts = {
    artworks: collection.artworks?.totalCount ?? 0,
  }

  return (
    <ArtworkFilterContextProvider
      filters={match.location.query}
      counts={counts}
      sortOptions={sortOptions}
    >
      <Text variant="lg-display">{collection.name}</Text>

      <Spacer y={4} />

      <SavesArtworkGridFragmentContainer
        artworks={collection.artworks!}
        collectionID={collectionID}
        relayRefetch={relay.refetch}
      />
    </ArtworkFilterContextProvider>
  )
}

const QUERY = graphql`
  query SavesArtworksQuery($collectionID: String!, $after: String) {
    me {
      collection(id: $collectionID) {
        ...SavesArtworks_collection @arguments(after: $after)
      }
    }
  }
`

const SavesArtworksRefetchContainer = createRefetchContainer(
  SavesArtworks,
  {
    collection: graphql`
      fragment SavesArtworks_collection on Collection
        @argumentDefinitions(after: { type: "String" }) {
        name
        artworks: artworksConnection(first: 30, after: $after) {
          totalCount
          ...SavesArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  QUERY
)

export const SavesArtworksQueryRenderer: FC<SavesArtworksQueryRendererProps> = ({
  collectionID,
}) => {
  return (
    <SystemQueryRenderer<SavesArtworksQuery>
      placeholder={PLACEHOLDER}
      query={QUERY}
      variables={{
        collectionID,
      }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me?.collection) {
          return PLACEHOLDER
        }

        return (
          <SavesArtworksRefetchContainer
            collectionID={collectionID}
            collection={props.me.collection}
          />
        )
      }}
    />
  )
}

// TODO: Update placeholder
const PLACEHOLDER = () => {
  return (
    <Box>
      <Text>Loading...</Text>
    </Box>
  )
}
