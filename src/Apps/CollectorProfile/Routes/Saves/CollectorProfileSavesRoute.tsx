import { Spacer } from "@artsy/palette"
import { ArtworkListsHeader } from "./Components/ArtworkListsHeader"
import { FC, useEffect, useMemo, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType, ViewedArtworkList } from "@artsy/cohesion"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { HttpError } from "found"
import { MetaTags } from "Components/MetaTags"
import { Jump } from "Utils/Hooks/useJump"
import { ArtworkListVisibilityProvider } from "Apps/CollectorProfile/Routes/Saves/Utils/useArtworkListVisibility"
import { SavesArtworks } from "Apps/CollectorProfile/Routes/Saves/Components/SavesArtworks"
import { SavesArtworksHeaderQueryRenderer } from "Apps/CollectorProfile/Routes/Saves/Components/SavesArtworksHeader"
import {
  ArtworkListItemsList,
  ArtworkListItemsListPlaceholder,
} from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkListItemsList"
import { ClientSuspense } from "Components/ClientSuspense"

export const ARTWORK_LIST_SCROLL_TARGET_ID = "ArtworkListScrollTarget"

interface CollectorProfileSavesRouteProps {
  me: CollectorProfileSavesRoute_me$data
}

const CollectorProfileSavesRoute: FC<CollectorProfileSavesRouteProps> = ({
  me,
}) => {
  const {
    match: { params },
  } = useRouter()

  const { trackEvent } = useTracking()

  const initialArtworkListId = useRef(params.id)

  const savedArtworksArtworkList = me.savedArtworksArtworkList
  const selectedArtworkListId =
    params.id ?? savedArtworksArtworkList?.internalID

  // FIXME: Move this into a click handler
  useEffect(() => {
    const event: ViewedArtworkList = {
      action: ActionType.viewedArtworkList,
      context_owner_type: OwnerType.saves,
      owner_id: selectedArtworkListId,
    }

    trackEvent(event)
  }, [selectedArtworkListId, trackEvent])

  // FIXME: Avoid mutation directly in a render function
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

  // Always display "Saved Artworks" artwork list first in the list
  const artworkLists = savedArtworksArtworkList
    ? [savedArtworksArtworkList, ...customArtworkLists]
    : customArtworkLists

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

  // TODO: Should be at routing level
  if (!selectedArtworkList) {
    throw new HttpError(404)
  }

  return (
    <ArtworkListVisibilityProvider>
      <MetaTags title="Saves | Artsy" pathname="favorites/saves" />

      <ArtworkListsHeader
        savedArtworksCount={
          me?.savedArtworksArtworkList?.artworksConnection?.totalCount ?? 0
        }
        me={me}
      />

      <Jump id={ARTWORK_LIST_SCROLL_TARGET_ID} />

      <Spacer y={4} />

      <ClientSuspense fallback={<ArtworkListItemsListPlaceholder />}>
        <ArtworkListItemsList />
      </ClientSuspense>

      <Spacer y={4} />

      <SavesArtworksHeaderQueryRenderer id={selectedArtworkListId} />

      <Spacer y={4} />

      <SavesArtworks key={selectedArtworkListId} id={selectedArtworkListId} />
    </ArtworkListVisibilityProvider>
  )
}

const PageWrapper: FC<CollectorProfileSavesRouteProps> = props => {
  const { match } = useRouter()

  return (
    <Analytics contextPageOwnerId={match.params.id}>
      <CollectorProfileSavesRoute {...props} />
    </Analytics>
  )
}

export const CollectorProfileSavesRouteFragmentContainer = createFragmentContainer(
  PageWrapper,
  {
    me: graphql`
      fragment CollectorProfileSavesRoute_me on Me {
        savedArtworksArtworkList: collection(id: "saved-artwork") {
          internalID
          shareableWithPartners
          ...ArtworkListItem_item
          ...OfferSettingsListItem_item

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
            key: "CollectorProfileSavesRoute_customArtworkLists"
            filters: []
          ) {
          edges {
            node {
              internalID
              default
              shareableWithPartners
              ...ArtworkListItem_item
              ...OfferSettingsListItem_item
            }
          }
        }
      }
    `,
  }
)
