import { AuthContextModule, Intent } from "@artsy/cohesion"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/SystemContext"
import { SaveArtworkMutation$data } from "__generated__/SaveArtworkMutation.graphql"

type Artwork = {
  internalID: string
  id: string
  // TODO: Can we remove it?
  slug: string
  title: string
  imageURL: string | null
  isSavedToDefaultList: boolean
  isSavedToCustomLists: boolean
}

interface Options {
  artwork: Artwork
  contextModule: AuthContextModule
}

type SaveArtworkToListsResult = Promise<SaveArtworkMutation$data | void>

export const useSaveArtworkToLists = (options: Options) => {
  const { artwork, contextModule } = options
  const { showAuthDialog: _showAuthDialog } = useAuthDialog()
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { savedListId, dispatch } = useManageArtworkForSavesContext()

  const isSaved = artwork.isSavedToCustomLists || artwork.isSavedToDefaultList

  const showAuthDialog = () => {
    _showAuthDialog({
      mode: "SignUp",
      options: {
        title: mode => {
          const action = mode === "SignUp" ? "Sign up" : "Log in"
          return `${action} to save artworks`
        },
        afterAuthAction: {
          action: "saveArtworkToLists",
          kind: "artworks",
          objectId: artwork.internalID,
        },
      },
      analytics: {
        intent: Intent.saveArtwork,
        contextModule,
      },
    })
  }

  const openSelectListsForArtworkModal = () => {
    dispatch({
      type: "SET_ARTWORK",
      payload: {
        id: artwork.id,
        internalID: artwork.internalID,
        title: artwork.title,
        imageURL: artwork.imageURL,
      },
    })
  }

  const saveToDefaultList = () => {
    if (!relayEnvironment) {
      return
    }

    // TODO: Use `useMutation` in the future
    return SaveArtwork(
      relayEnvironment,
      { artworkID: artwork.internalID, remove: artwork.isSavedToDefaultList },
      {
        saveArtwork: {
          artwork: {
            id: artwork.id!,
            slug: artwork.slug!,
            is_saved: !artwork.isSavedToDefaultList,
          },
          /**
           * TODO: We don't _really_ need an optimistic response and
           * it's too painful to alter all the consumers of this to pass
           * in the `me` object.
           *
           * This hook shouldn't have to accept a stub `artwork` object either.
           * Given just the artwork `id` we could fetch everything else.
           */
          me: {
            id: "me",
            counts: {
              savedArtworks: 0,
            },
          },
        },
      }
    )
  }

  const saveArtworkToLists = async (): SaveArtworkToListsResult => {
    if (!isLoggedIn) {
      return showAuthDialog()
    }

    if (savedListId || artwork.isSavedToCustomLists) {
      return openSelectListsForArtworkModal()
    }

    return saveToDefaultList()
  }

  return {
    isSaved,
    openSelectListsForArtworkModal,
    saveArtworkToLists,
  }
}
