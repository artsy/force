import { Shelf, Spacer } from "@artsy/palette"
import { ArtworkListContentQueryRenderer } from "./Components/ArtworkListContent"
import { ArtworkListsHeader } from "./Components/ArtworkListsHeader"
import { ArtworkListItemFragmentContainer } from "./Components/ArtworkListItem"
import { FC, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2Route_me$data } from "__generated__/CollectorProfileSaves2Route_me.graphql"

interface CollectorProfileSaves2RouteProps {
  me: CollectorProfileSaves2Route_me$data
}

const CollectorProfileSaves2Route: FC<CollectorProfileSaves2RouteProps> = ({
  me,
}) => {
  const { match } = useRouter()
  const initialArtworkListId = useRef(match.params.id)
  const { page, sort } = match.location.query ?? {}
  const allSavesArtworkList = me.allSavesArtworkList!
  const selectedArtworkListId =
    match.params.id ?? allSavesArtworkList.internalID
  let customArtworkLists = extractNodes(me.customArtworkLists)

  if (initialArtworkListId.current !== undefined) {
    const index = customArtworkLists.findIndex(
      artworkList => artworkList.internalID === initialArtworkListId.current
    )

    if (index !== -1) {
      // Remove the initial artwork list from array
      const initialArtworkList = customArtworkLists.splice(index, 1)

      // "Locking" the initial artwork list in the first slot
      customArtworkLists = [...initialArtworkList, ...customArtworkLists]
    }
  }

  // Always display "All Saves" artwork list first in the list
  const artworkLists = [allSavesArtworkList, ...customArtworkLists]

  return (
    <>
      <ArtworkListsHeader />

      <Spacer y={4} />

      <Shelf showProgress={false}>
        {artworkLists.map(artworkList => {
          const isDefaultArtworkList =
            artworkList.internalID === allSavesArtworkList.internalID

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

      <Spacer y={4} />

      <ArtworkListContentQueryRenderer
        listID={selectedArtworkListId}
        initialPage={(page as unknown) as number}
        initialSort={sort}
      />
    </>
  )
}

export const CollectorProfileSaves2RouteFragmentContainer = createFragmentContainer(
  CollectorProfileSaves2Route,
  {
    me: graphql`
      fragment CollectorProfileSaves2Route_me on Me {
        allSavesArtworkList: collection(id: "saved-artwork") {
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
            key: "CollectorProfileSaves2Route_customArtworkLists"
            filters: []
          ) {
          edges {
            node {
              internalID
              default
              ...ArtworkListItem_item
            }
          }
        }
      }
    `,
  }
)
