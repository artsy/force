import { SavesArtworksGridFragmentContainer } from "./SavesArtworksGrid"
import { SavesArtworks_me$data } from "__generated__/SavesArtworks_me.graphql"
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
  me: SavesArtworks_me$data
  relay: RelayRefetchProp
  initialPage?: number
  initialSort?: string
}

const sortOptions: SortOptions = [
  { value: "SAVED_AT_DESC", text: "Recently Saved" },
  { value: "SAVED_AT_ASC", text: "Oldest First" },
]
const defaultSort = sortOptions[0].value

const SavesArtworks: FC<SavesArtworksProps> = ({ me, relay }) => {
  const { match } = useRouter()

  const collection = me.collection!
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
        me={me}
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
      ...SavesArtworks_me
        @arguments(collectionID: $collectionID, page: $page, sort: $sort)
    }
  }
`

export const SavesArtworksRefetchContainer = createRefetchContainer(
  SavesArtworks,
  {
    me: graphql`
      fragment SavesArtworks_me on Me
        @argumentDefinitions(
          collectionID: { type: "String!" }
          page: { type: "Int", defaultValue: 1 }
          sort: { type: "CollectionArtworkSorts" }
        ) {
        collection(id: $collectionID) {
          internalID
          name
          default

          artworks: artworksConnection(first: 30, page: $page, sort: $sort) {
            totalCount
          }
        }
        ...SavesArtworksGrid_me
          @arguments(collectionID: $collectionID, page: $page, sort: $sort)
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

        if (!props?.me) {
          return <SavesArtworksGridPlaceholder />
        }

        return <SavesArtworksRefetchContainer me={props.me} />
      }}
    />
  )
}
