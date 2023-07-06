import { Shelf, Spacer } from "@artsy/palette"
import { ArtworkListContentQueryRenderer } from "./Components/ArtworkListContent"
import { ArtworkListsHeader } from "./Components/ArtworkListsHeader"
import { ArtworkListItemFragmentContainer } from "./Components/ArtworkListItem"
import { FC, useEffect, useMemo, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2Route_me$data } from "__generated__/CollectorProfileSaves2Route_me.graphql"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType, ViewedArtworkList } from "@artsy/cohesion"
import { AnalyticsContext } from "System/Analytics/AnalyticsContext"
import { HttpError } from "found"
import { MetaTags } from "Components/MetaTags"
import { Jump } from "Utils/Hooks/useJump"
import { ArtworkListVisibilityProvider } from "Apps/CollectorProfile/Routes/Saves2/Utils/useArtworkListVisibility"

export const ARTWORK_LIST_SCROLL_TARGET_ID = "ArtworkListScrollTarget"

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
  const savedArtworksArtworkList = me.savedArtworksArtworkList!
  const selectedArtworkListId =
    match.params.id ?? savedArtworksArtworkList.internalID
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

  // Always display "Saved Artworks" artwork list first in the list
  const artworkLists = [savedArtworksArtworkList, ...customArtworkLists]

  /**
   * When the artwork list has been successfully deleted,
   * We also clear all info about the deleted artwork list from the relay store in updater.
   * For this reason, 404 error will be displayed immediately.
   * To prevent this from happening, `useMemo` is used here
   */
  const selectedArtworkList = useMemo(
    () => {
      return artworkLists.find(
        artworkList => artworkList.internalID === selectedArtworkListId
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedArtworkListId]
  )

  if (!selectedArtworkList) {
    throw new HttpError(404)
  }

  return (
    <ArtworkListVisibilityProvider>
      <MetaTags title="Saves | Artsy" pathname="collector-profile/saves" />

      <ArtworkListsHeader
        savedArtworksCount={
          me?.savedArtworksArtworkList?.artworksConnection?.totalCount ?? 0
        }
      />

      <Jump id={ARTWORK_LIST_SCROLL_TARGET_ID} />

      <Spacer y={4} />

      <Shelf showProgress={false}>
        {artworkLists.map(artworkList => {
          const isDefaultArtworkList =
            artworkList.internalID === savedArtworksArtworkList.internalID

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

      <ArtworkListContentQueryRenderer
        listID={selectedArtworkListId}
        initialPage={(page as unknown) as number}
        initialSort={sort}
      />
    </ArtworkListVisibilityProvider>
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
        savedArtworksArtworkList: collection(id: "saved-artwork") {
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
