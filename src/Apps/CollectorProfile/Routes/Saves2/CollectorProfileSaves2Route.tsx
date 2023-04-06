import { Shelf, Spacer } from "@artsy/palette"
import { ArtworkListContentQueryRenderer } from "./Components/ArtworkListContent"
import { ArtworkListsHeader } from "./Components/ArtworkListsHeader"
import { ArtworkListItemFragmentContainer } from "./Components/ArtworkListItem"
import { FC, useEffect, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2Route_me$data } from "__generated__/CollectorProfileSaves2Route_me.graphql"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType, ViewedArtworkList } from "@artsy/cohesion"
import { AnalyticsContext } from "System/Analytics/AnalyticsContext"

interface CollectorProfileSaves2RouteProps {
  me: CollectorProfileSaves2Route_me$data
}

const CollectorProfileSaves2Route: FC<CollectorProfileSaves2RouteProps> = ({
  me,
}) => {
  const { match } = useRouter()
  const { trackEvent } = useTracking()
  const initialArtworkListId = useRef(match.params.id)
  const { page, sort } = match.location.query ?? {}
  const allSavesArtworkList = me.allSavesArtworkList!
  const selectedArtworkListId =
    match.params.id ?? allSavesArtworkList.internalID
  let customArtworkLists = extractNodes(me.customArtworkLists)

  useEffect(() => {
    const event: ViewedArtworkList = {
      action: ActionType.viewedArtworkList,
      context_owner_type: OwnerType.saves,
      owner_id: selectedArtworkListId,
    }

    trackEvent(event)
  }, [selectedArtworkListId, trackEvent])

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
      <ArtworkListsHeader
        savedArtworksCount={
          me?.allSavesArtworkList?.artworksConnection?.totalCount ?? 0
        }
      />

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

const PageWrapper: FC<CollectorProfileSaves2RouteProps> = props => {
  const { match } = useRouter()

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: match.params.id,
        contextPageOwnerType: OwnerType.saves,
      }}
    >
      <CollectorProfileSaves2Route {...props} />
    </AnalyticsContext.Provider>
  )
}

export const CollectorProfileSaves2RouteFragmentContainer = createFragmentContainer(
  PageWrapper,
  {
    me: graphql`
      fragment CollectorProfileSaves2Route_me on Me {
        allSavesArtworkList: collection(id: "saved-artwork") {
          internalID
          ...ArtworkListItem_item

          artworksConnection(first: 4) {
            totalCount
          }
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
