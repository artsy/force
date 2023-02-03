import { SavesArtworksGridFragmentContainer } from "./SavesArtworksGrid"
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
import { Flex, Join, MoreIcon, Spacer, Text } from "@artsy/palette"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { SavesArtworksGridPlaceholder } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesPlaceholders"

interface SavesArtworksQueryRendererProps {
  collectionID: string
}

interface SavesArtworksProps extends SavesArtworksQueryRendererProps {
  collection: SavesArtworks_collection$data
  collectionID: string
  relay: RelayRefetchProp
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
  const defaultSort = sortOptions[0].value

  const counts: Counts = {
    artworks: collection.artworks?.totalCount ?? 0,
  }

  return (
    <ArtworkFilterContextProvider
      filters={match.location.query}
      counts={counts}
      sortOptions={sortOptions}
      onChange={state => {
        updateUrl(state, {
          defaultValues: {
            sort: defaultSort,
          },
        })
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Join separator={<Spacer x={2} />}>
          <Text variant="lg-display">{collection.name}</Text>
          {!collection.default && <MoreIcon width="24px" height="24px" />}
        </Join>
      </Flex>

      <Spacer y={4} />

      <SavesArtworksGridFragmentContainer
        artworks={collection.artworks!}
        collection={collection}
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
        default
        artworks: artworksConnection(first: 30, after: $after) {
          totalCount
          ...SavesArtworksGrid_artworks
        }
        ...SavesArtworksGrid_collection
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
      placeholder={<SavesArtworksGridPlaceholder />}
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
          return <SavesArtworksGridPlaceholder />
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
