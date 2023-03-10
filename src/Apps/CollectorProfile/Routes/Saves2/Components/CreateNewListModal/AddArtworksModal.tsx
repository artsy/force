import { FC, useState } from "react"
import {
  Flex,
  Text,
  ModalDialog,
  Spacer,
  Button,
  Skeleton,
} from "@artsy/palette"
import { SortFilter } from "Components/SortFilter"
import { ArtworksListFragmentContainer } from "./ArtworksList"
import { useTranslation } from "react-i18next"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { AddArtworksModalQuery } from "__generated__/AddArtworksModalQuery.graphql"
import { AddArtworksModal_me$data } from "__generated__/AddArtworksModal_me.graphql"

interface AddArtworksModalQueryRenderProps {
  onClose: () => void
  onComplete: () => void
  listName: string
}

interface AddArtworksModalProps extends AddArtworksModalQueryRenderProps {
  me: AddArtworksModal_me$data
  relay: RelayRefetchProp
}

const SORTS = [
  { text: "Recently Saved", value: "POSITION_DESC" },
  { text: "Oldest first", value: "POSITION_ASC" },
]

export const AddArtworksModal: FC<AddArtworksModalProps> = ({
  listName,
  onClose,
  me,
  relay,
}) => {
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([])
  const [sort, setSort] = useState(SORTS[0].value)
  const { t } = useTranslation()
  const artworksCount = me?.collection?.artworksConnection?.totalCount ?? 0

  const handleSave = () => {
    onClose()
  }

  const handleSortChange = option => {
    setSort(option)
    relay.refetch({ sort: option })
  }

  const handleItemClick = artworkID => {
    if (selectedArtworkIds.includes(artworkID)) {
      setSelectedArtworkIds(selectedArtworkIds.filter(id => id !== artworkID))
    } else {
      setSelectedArtworkIds([...selectedArtworkIds, artworkID])
    }
  }

  return (
    <ModalDialog
      m={0}
      dialogProps={{
        width: ["100%", 700],
        height: ["100%", "auto"],
        maxHeight: [null, 800],
      }}
      onClose={onClose}
      title={t("collectorSaves.addArtworksModal.modalTitle", {
        value: listName,
      })}
      footer={
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="sm-display">
            {t("collectorSaves.addArtworksModal.artworksSelected", {
              count: selectedArtworkIds.length,
            })}
          </Text>

          <Button onClick={handleSave}>{t("common.buttons.save")}</Button>
        </Flex>
      }
    >
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
          me={me}
          onItemClick={handleItemClick}
          selectedIds={selectedArtworkIds}
        />
      </>
    </ModalDialog>
  )
}

const AddArtworksModalRefetchContainer = createRefetchContainer(
  AddArtworksModal,
  {
    me: graphql`
      fragment AddArtworksModal_me on Me
        @argumentDefinitions(
          sort: { type: CollectionArtworkSorts, defaultValue: POSITION_DESC }
        ) {
        ...ArtworksList_me @arguments(sort: $sort)

        collection(id: "saved-artwork") {
          artworksConnection(first: 30, sort: $sort) {
            totalCount
          }
        }
      }
    `,
  },
  graphql`
    query AddArtworksModalRefetchQuery($sort: CollectionArtworkSorts) {
      me {
        ...AddArtworksModal_me @arguments(sort: $sort)
      }
    }
  `
)

export const AddArtworksModalQueryRender: FC<AddArtworksModalQueryRenderProps> = componentProps => {
  return (
    <SystemQueryRenderer<AddArtworksModalQuery>
      placeholder={PLACEHOLDER}
      query={graphql`
        query AddArtworksModalQuery {
          me {
            ...AddArtworksModal_me
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return PLACEHOLDER
        }

        return (
          <AddArtworksModalRefetchContainer me={props.me} {...componentProps} />
        )
      }}
    />
  )
}

const PLACEHOLDER = <Skeleton></Skeleton>
