import { FC, useState } from "react"
import {
  Flex,
  Text,
  Spacer,
  GridColumns,
  Column,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { SortFilter } from "Components/SortFilter"
import { ArtworksListFragmentContainer } from "./ArtworksList"
import { useTranslation } from "react-i18next"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
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
  relay: RelayRefetchProp
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

  if (isLoading) {
    return <ContentPlaceholder />
  }

  const artworksCount = me?.collection?.artworksConnection?.totalCount ?? 0

  const handleSortChange = (option: string) => {
    setSort(option)
    setIsLoading(true)

    relay.refetch({ sort: option }, null, error => {
      if (error) {
        console.error(error)
      }

      setIsLoading(false)
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
    </>
  )
}

const AddArtworksModalContentRefetchContainer = createRefetchContainer(
  AddArtworksModalContent,
  {
    me: graphql`
      fragment AddArtworksModalContent_me on Me
        @argumentDefinitions(
          sort: { type: CollectionArtworkSorts, defaultValue: POSITION_DESC }
        ) {
        collection(id: "saved-artwork") {
          artworksConnection(first: 30, sort: $sort) {
            totalCount
            ...ArtworksList_artworks
          }
        }
      }
    `,
  },
  graphql`
    query AddArtworksModalContentRefetchQuery($sort: CollectionArtworkSorts) {
      me {
        ...AddArtworksModalContent_me @arguments(sort: $sort)
      }
    }
  `
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
          <AddArtworksModalContentRefetchContainer
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
