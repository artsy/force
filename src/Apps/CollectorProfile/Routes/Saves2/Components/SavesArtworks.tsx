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
import { Flex, Join, Spacer, Text } from "@artsy/palette"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { SavesArtworksGridPlaceholder } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesPlaceholders"
import { SavesContextualMenu } from "./Actions/SavesContextualMenu"

interface SavesArtworksQueryRendererProps {
  collectionID: string
  initialPage?: number
  initialSort?: string
}

interface SavesArtworksProps {
  collection: SavesArtworks_collection$data
  relay: RelayRefetchProp
  initialPage?: number
  initialSort?: string
}

const sortOptions: SortOptions = [
  { value: "SAVED_AT_DESC", text: "Recently Saved" },
  { value: "SAVED_AT_ASC", text: "Oldest First" },
]
const defaultSort = sortOptions[0].value

const SavesArtworks: FC<SavesArtworksProps> = ({ collection, relay }) => {
  const { match } = useRouter()

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
          {!collection.default && (
            <SavesContextualMenu collection={collection} />
          )}
        </Join>
      </Flex>

      <Spacer y={4} />

      <SavesArtworksGridFragmentContainer
        artworks={collection.artworks!}
        collection={collection}
        relayRefetch={relay.refetch}
      />
    </ArtworkFilterContextProvider>
  )
}

const QUERY = graphql`
  query SavesArtworksQuery(
    $collectionID: String!
    $sort: CollectionArtworkSorts
    $page: Int
  ) {
    me {
      collection(id: $collectionID) {
        ...SavesArtworks_collection @arguments(page: $page, sort: $sort)
      }
    }
  }
`

export const SavesArtworksRefetchContainer = createRefetchContainer(
  SavesArtworks,
  {
    collection: graphql`
      fragment SavesArtworks_collection on Collection
        @argumentDefinitions(
          page: { type: "Int", defaultValue: 1 }
          sort: { type: "CollectionArtworkSorts" }
        ) {
        internalID
        name
        default
        artworks: artworksConnection(first: 30, page: $page, sort: $sort) {
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
  initialPage,
  initialSort,
}) => {
  return (
    <SystemQueryRenderer<SavesArtworksQuery>
      placeholder={<SavesArtworksGridPlaceholder />}
      query={QUERY}
      variables={{
        collectionID,
        sort: initialSort ?? defaultSort,
        page: initialPage,
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
          <SavesArtworksRefetchContainer collection={props.me.collection} />
        )
      }}
    />
  )
}
