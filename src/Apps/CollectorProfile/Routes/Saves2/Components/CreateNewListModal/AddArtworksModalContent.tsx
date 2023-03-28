import { FC, useState } from "react"
import {
  Flex,
  Text,
  Spacer,
  GridColumns,
  Column,
  SkeletonBox,
  SkeletonText,
  Box,
  Button,
} from "@artsy/palette"
import { SortFilter } from "Components/SortFilter"
import { ArtworksListFragmentContainer } from "./ArtworksList"
import { useTranslation } from "react-i18next"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { AddArtworksModalContentQuery } from "__generated__/AddArtworksModalContentQuery.graphql"
import { AddArtworksModalContent_me$data } from "__generated__/AddArtworksModalContent_me.graphql"
import { MetadataPlaceholder } from "Components/Artwork/Metadata"

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

export const AddArtworksModalContent: FC<AddArtworksModalContentProps> = ({
  me,
  relay,
  selectedArtworkIds,
  onArtworkClick,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [sort, setSort] = useState(SORTS[0].value)
  const { t } = useTranslation()

  console.log(
    "[Debug] AddArtworksModalContent me",
    me.collection?.artworksConnection!
  )

  if (isLoading) {
    return <ContentPlaceholder />
  }

  const artworksCount = me?.collection?.artworksConnection?.totalCount ?? 0

  const handleSortChange = (option: string) => {
    setSort(option)
    setIsLoading(true)

    relay.refetchConnection(30, null, { sort: option })
    setIsLoading(false)
  }

  const handleLoadMore = () => {
    console.log("[Debug] handleLoadMore", relay.hasMore(), relay.isLoading())
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    // setIsLoading(true)

    console.log("[Debug] loadMore inside")
    relay.loadMore(30, err => {
      if (err) {
        console.log("[Debug] loadMore err")
        console.error(err)
      }

      console.log("[Debug] loadMore succ")
      // setLoading(false)
    })
  }

  const handleItemClick = (artworkID: string) => {
    onArtworkClick(artworkID)
  }

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant={["xs", "sm"]} fontWeight="bold">
          {t("collectorSaves.addArtworksModal.artworksCount", {
            count: artworksCount,
          })}
        </Text>

        <SortFilter
          sortOptions={SORTS}
          selected={sort}
          onSort={handleSortChange}
        />
      </Flex>

      <Spacer y={2} />

      <ArtworksListFragmentContainer
        artworks={me.collection?.artworksConnection!}
        onItemClick={handleItemClick}
        selectedIds={selectedArtworkIds}
      />

      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={handleLoadMore} loading={isLoading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

const AddArtworksModalContentPaginationContainer = createPaginationContainer(
  AddArtworksModalContent,
  {
    me: graphql`
      fragment AddArtworksModalContent_me on Me
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: "Int", defaultValue: 30 }
          sort: { type: CollectionArtworkSorts, defaultValue: POSITION_DESC }
        ) {
        collection(id: "saved-artwork") {
          artworksConnection(first: $count, after: $cursor, sort: $sort)
            @connection(key: "AddArtworksModalContent_artworksConnection") {
            totalCount
            ...ArtworksList_artworks

            edges {
              node {
                internalID
                # ...GridItem_artwork
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
      console.log("[Debug] getFragmentVariables", prevVars, totalCount)
      return { ...prevVars, count: totalCount }
    },
    getVariables(_, { count, cursor }, fragmentVariables) {
      console.log("[Debug] getVariables", { count, cursor }, fragmentVariables)
      return {
        sort: fragmentVariables.sort,
        count,
        cursor,
      }
    },
    query: graphql`
      query AddArtworksModalContentPaginationQuery(
        $cursor: String
        $count: Int!
        $sort: CollectionArtworkSorts
      ) {
        me {
          ...AddArtworksModalContent_me
            @arguments(sort: $sort, count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

export const AddArtworksModalContentQueryRender: FC<AddArtworksModalContentQueryRenderProps> = props => {
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

const ContentPlaceholder: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <SkeletonText variant={["xs", "sm"]}>
          {t("collectorSaves.addArtworksModal.artworksCount", {
            count: 127,
          })}
        </SkeletonText>

        <SortFilter
          sortOptions={SORTS}
          selected={SORTS[0].value}
          onSort={() => {}}
        />
      </Flex>

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
