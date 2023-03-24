import { Shelf, Spacer } from "@artsy/palette"
import { SavesArtworksQueryRenderer } from "./Components/SavesArtworks"
import { SavesHeader } from "./Components/SavesHeader"
import { SavesItemFragmentContainer } from "./Components/SavesItem"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2Route_me$data } from "__generated__/CollectorProfileSaves2Route_me.graphql"

interface CollectorProfileSaves2RouteProps {
  me: CollectorProfileSaves2Route_me$data
}

const URL_REGEX = /^\/collector-profile\/saves2\/?([a-zA-Z0-9\-]+)?$/

const CollectorProfileSaves2Route: FC<CollectorProfileSaves2RouteProps> = ({
  me,
}) => {
  const { match } = useRouter()
  const { page, sort } = match.location.query ?? {}
  const savedCollection = me.defaultSaves!
  const savedCollectionId = savedCollection.internalID
  let otherCollections = extractNodes(me.otherSaves)

  const initialCollectionId = useRef(match.params.id)
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    match.params.id ?? savedCollectionId
  )

  if (initialCollectionId.current !== undefined) {
    const index = otherCollections.findIndex(
      collection => collection.internalID === initialCollectionId.current
    )

    if (index !== -1) {
      // Remove the initial collection from array
      const initialCollection = otherCollections.splice(index, 1)

      // "Locking" the initial collection in the first slot
      otherCollections = [...initialCollection, ...otherCollections]
    }
  }

  // Always display "Saved Artwork" collection first in the list
  const savedCollections = [savedCollection, ...otherCollections]

  const handleListClick = (id: string) => {
    setSelectedCollectionId(id)
  }

  const popHistoryStateListener = useCallback(() => {
    const pathname = window.location.pathname ?? ""
    const matches = pathname.match(URL_REGEX)

    if (matches === null) {
      return
    }

    const id = matches[1]

    setSelectedCollectionId(id ?? savedCollectionId)
  }, [savedCollectionId, setSelectedCollectionId])

  useEffect(() => {
    window.addEventListener("popstate", popHistoryStateListener)

    return () => {
      window.removeEventListener("popstate", popHistoryStateListener)
    }
  }, [popHistoryStateListener])

  return (
    <>
      <SavesHeader />

      <Spacer y={4} />

      <Shelf showProgress={false}>
        {savedCollections.map(collection => {
          const isDefaultCollection =
            collection.internalID === savedCollection.internalID

          return (
            <SavesItemFragmentContainer
              key={collection.internalID}
              item={collection}
              isSelected={collection.internalID === selectedCollectionId}
              imagesLayout={isDefaultCollection ? "grid" : "stacked"}
              onClick={handleListClick}
            />
          )
        })}
      </Shelf>

      <Spacer y={4} />

      <SavesArtworksQueryRenderer
        collectionID={selectedCollectionId}
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
        defaultSaves: collection(id: "saved-artwork") {
          internalID
          ...SavesItem_item
        }

        otherSaves: collectionsConnection(
          first: 30
          default: false
          saves: true
          sort: CREATED_AT_DESC
        )
          @connection(
            key: "CollectorProfileSaves2Route_otherSaves"
            filters: []
          ) {
          edges {
            node {
              internalID
              default
              ...SavesItem_item
            }
          }
        }
      }
    `,
  }
)
