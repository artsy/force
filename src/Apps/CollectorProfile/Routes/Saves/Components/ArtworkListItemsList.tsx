import { Shelf, SkeletonBox } from "@artsy/palette"
import { ArtworkListItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkListItem"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import type { ArtworkListItemsListQuery } from "__generated__/ArtworkListItemsListQuery.graphql"
import times from "lodash/times"
import { type FC, useRef } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

export const ArtworkListItemsList: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { me } = useLazyLoadQuery<ArtworkListItemsListQuery>(query, {})

  const {
    match: { params },
  } = useRouter()

  const initialArtworkListId = useRef(params.id)

  if (!me) {
    return null
  }

  const savedArtworksArtworkList = me.savedArtworksArtworkList
  const selectedArtworkListId =
    params.id ?? savedArtworksArtworkList?.internalID

  // FIXME: Avoid mutation directly in a render function
  let customArtworkLists = extractNodes(me.customArtworkLists)

  if (initialArtworkListId.current !== undefined) {
    const index = customArtworkLists.findIndex(
      artworkList => artworkList.internalID === initialArtworkListId.current,
    )

    if (index !== -1) {
      // Remove the initial artwork list from array
      const initialArtworkList = customArtworkLists.splice(index, 1)

      // "Locking" the initial artwork list in the first slot
      customArtworkLists = [...initialArtworkList, ...customArtworkLists]
    }
  }

  // Always display "Saved Artworks" artwork list first in the list
  const artworkLists = savedArtworksArtworkList
    ? [savedArtworksArtworkList, ...customArtworkLists]
    : customArtworkLists

  return (
    <Shelf>
      {artworkLists.map(artworkList => {
        const isDefaultArtworkList =
          artworkList.internalID === savedArtworksArtworkList?.internalID

        return (
          <ArtworkListItemFragmentContainer
            key={artworkList.internalID}
            item={artworkList}
            isSelected={artworkList.internalID === selectedArtworkListId}
            imagesLayout={isDefaultArtworkList ? "grid" : "stacked"}
          />
        )
      })}
    </Shelf>
  )
}

const query = graphql`
  query ArtworkListItemsListQuery {
    me {
      savedArtworksArtworkList: collection(id: "saved-artwork") {
        internalID
        ...ArtworkListItem_item
      }

      customArtworkLists: collectionsConnection(
        first: 30
        default: false
        saves: true
        sort: CREATED_AT_DESC
      )
        @connection(
          key: "CollectorProfileSavesRoute_customArtworkLists"
          filters: []
        ) {
        edges {
          node {
            internalID
            ...ArtworkListItem_item
          }
        }
      }
    }
  }
`

export const ArtworkListItemsListPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Shelf>
      {times(3).map((_, index) => (
        <SkeletonBox
          p={1}
          width={[138, 222]}
          height={[188, 272]}
          flexDirection="column"
          justifyContent="space-between"
          key={`artwork-list-item-placeholder-${index}`}
        />
      ))}
    </Shelf>
  )
}
