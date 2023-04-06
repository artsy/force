import { ArtworkListArtworksGridFragmentContainer } from "./ArtworkListArtworksGrid"
import { ArtworkListContent_me$data } from "__generated__/ArtworkListContent_me.graphql"
import { ArtworkListContentQuery } from "__generated__/ArtworkListContentQuery.graphql"
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
import { ArtworkListArtworksGridPlaceholder } from "./ArtworkListPlaceholders"
import { ArtworkListContextualMenu } from "./Actions/ArtworkListContextualMenu"

interface ArtworkListContentQueryRendererProps {
  listID: string
  initialPage?: number
  initialSort?: string
}

interface ArtworkListContentProps {
  me: ArtworkListContent_me$data
  relay: RelayRefetchProp
  initialPage?: number
  initialSort?: string
}

const sortOptions: SortOptions = [
  { value: "SAVED_AT_DESC", text: "Recently Added" },
  { value: "SAVED_AT_ASC", text: "First Added" },
]
const defaultSort = sortOptions[0].value

const ArtworkListContent: FC<ArtworkListContentProps> = ({ me, relay }) => {
  const { match } = useRouter()

  const artworkList = me.artworkList!
  const counts: Counts = {
    artworks: artworkList.artworks?.totalCount ?? 0,
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
          <Text variant="lg-display">{artworkList.name}</Text>
          {!artworkList.default && (
            <ArtworkListContextualMenu artworkList={artworkList} />
          )}
        </Join>
      </Flex>

      <Spacer y={4} />

      <ArtworkListArtworksGridFragmentContainer
        me={me}
        relayRefetch={relay.refetch}
      />
    </ArtworkFilterContextProvider>
  )
}

const QUERY = graphql`
  query ArtworkListContentQuery(
    $listID: String!
    $sort: CollectionArtworkSorts
    $page: Int
  ) {
    me {
      ...ArtworkListContent_me
        @arguments(listID: $listID, page: $page, sort: $sort)
    }
  }
`

export const ArtworkListContentRefetchContainer = createRefetchContainer(
  ArtworkListContent,
  {
    me: graphql`
      fragment ArtworkListContent_me on Me
        @argumentDefinitions(
          listID: { type: "String!" }
          page: { type: "Int", defaultValue: 1 }
          sort: { type: "CollectionArtworkSorts" }
        ) {
        artworkList: collection(id: $listID) {
          internalID
          name
          default

          artworks: artworksConnection(first: 30, page: $page, sort: $sort) {
            totalCount
          }
        }
        ...ArtworkListArtworksGrid_me
          @arguments(listID: $listID, page: $page, sort: $sort)
      }
    `,
  },
  QUERY
)

export const ArtworkListContentQueryRenderer: FC<ArtworkListContentQueryRendererProps> = ({
  listID,
  initialPage,
  initialSort,
}) => {
  return (
    <SystemQueryRenderer<ArtworkListContentQuery>
      placeholder={<ArtworkListArtworksGridPlaceholder />}
      query={QUERY}
      variables={{
        listID,
        sort: initialSort ?? defaultSort,
        page: initialPage,
      }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return <ArtworkListArtworksGridPlaceholder />
        }

        return <ArtworkListContentRefetchContainer me={props.me} />
      }}
    />
  )
}
