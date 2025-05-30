import {
  Column,
  Flex,
  GridColumns,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { SortFilter } from "Components/SortFilter"
import { type FC, useState } from "react"
import { ArtworksListFragmentContainer } from "./ArtworksList"

import { MetadataPlaceholder } from "Components/Artwork/Metadata"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { AddArtworksModalContentQuery } from "__generated__/AddArtworksModalContentQuery.graphql"
import type { AddArtworksModalContent_me$data } from "__generated__/AddArtworksModalContent_me.graphql"
import {
  type RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"

interface AddArtworksModalContentQueryRenderProps {
  selectedArtworkIds: string[]
  onArtworkClick: (artworkID: string) => void
}

interface AddArtworksModalContentProps
  extends AddArtworksModalContentQueryRenderProps {
  me: AddArtworksModalContent_me$data
  relay: RelayPaginationProp
}

const SORTS = [
  { text: "Recently Saved", value: "POSITION_DESC" },
  { text: "Oldest first", value: "POSITION_ASC" },
]

const ARTWORKS_PER_SCROLL = 30

export const AddArtworksModalContent: FC<
  React.PropsWithChildren<AddArtworksModalContentProps>
> = ({ me, relay, selectedArtworkIds, onArtworkClick }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)
  const [sort, setSort] = useState(SORTS[0].value)

  if (isLoading) {
    return <ContentPlaceholder />
  }

  const artworksCount = me?.collection?.artworksCount ?? 0

  const handleSortChange = (option: string) => {
    setSort(option)

    setIsLoading(true)

    relay.refetchConnection(
      ARTWORKS_PER_SCROLL,
      err => {
        if (err) {
          console.error(err)
        }

        setIsLoading(false)
      },
      { sort: option },
    )
  }

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    setIsLoadingNextPage(true)

    relay.loadMore(ARTWORKS_PER_SCROLL, err => {
      if (err) {
        console.error(err)
      }

      setIsLoadingNextPage(false)
    })
  }

  const handleItemClick = (artworkID: string) => {
    onArtworkClick(artworkID)
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant={["xs", "sm"]} fontWeight="bold">
          {artworksCount === 1
            ? `${artworksCount} Artwork`
            : `${artworksCount} Artworks`}
        </Text>

        <SortFilter
          sortOptions={SORTS}
          selected={sort}
          onSort={handleSortChange}
        />
      </Flex>

      <Spacer y={2} />

      <ArtworksListFragmentContainer
        artworks={me.collection?.artworksConnection as any}
        onItemClick={handleItemClick}
        selectedIds={selectedArtworkIds}
      />

      {relay.hasMore() && (
        <InfiniteScrollSentinel onNext={handleLoadMore} once={false} />
      )}

      {isLoadingNextPage && <ArtworksGridPlaceholder />}
    </>
  )
}

const AddArtworksModalContentPaginationContainer = createPaginationContainer(
  AddArtworksModalContent,
  {
    me: graphql`
      fragment AddArtworksModalContent_me on Me
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 30 }
        after: { type: "String" }
        sort: { type: CollectionArtworkSorts, defaultValue: POSITION_DESC }
      ) {
        collection(id: "saved-artwork") {
          artworksCount(onlyVisible: true)
          artworksConnection(first: $first, after: $after, sort: $sort)
            @connection(key: "AddArtworksModalContent_artworksConnection") {
            ...ArtworksList_artworks

            edges {
              node {
                internalID
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.me.collection?.artworksConnection
    },
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, count: totalCount }
    },
    getVariables(_, { count, cursor }, fragmentVariables) {
      return {
        sort: fragmentVariables.sort,
        first: count,
        after: cursor,
      }
    },
    query: graphql`
      query AddArtworksModalContentPaginationQuery(
        $after: String
        $first: Int!
        $sort: CollectionArtworkSorts
      ) {
        me {
          ...AddArtworksModalContent_me
            @arguments(sort: $sort, first: $first, after: $after)
        }
      }
    `,
  },
)

export const AddArtworksModalContentQueryRender: FC<
  React.PropsWithChildren<AddArtworksModalContentQueryRenderProps>
> = props => {
  return (
    <SystemQueryRenderer<AddArtworksModalContentQuery>
      placeholder={<ContentPlaceholder />}
      query={graphql`
        query AddArtworksModalContentQuery {
          me {
            ...AddArtworksModalContent_me
          }
        }
      `}
      render={({ props: relayProps, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!relayProps?.me) {
          return <ContentPlaceholder />
        }

        return (
          <AddArtworksModalContentPaginationContainer
            me={relayProps.me}
            {...props}
          />
        )
      }}
    />
  )
}

const ContentPlaceholder: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <SkeletonText variant={["xs", "sm"]}>127 Artworks</SkeletonText>

        <SortFilter
          sortOptions={SORTS}
          selected={SORTS[0].value}
          onSort={() => {}}
        />
      </Flex>

      <ArtworksGridPlaceholder />
    </>
  )
}

const ArtworksGridPlaceholder = () => {
  return (
    <>
      <Spacer y={2} />
      <GridColumns>
        {[...Array(9)].map((_, index) => {
          return (
            <Column span={[6, 4]} key={index}>
              <SkeletonBox height={200} />
              <MetadataPlaceholder />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}
