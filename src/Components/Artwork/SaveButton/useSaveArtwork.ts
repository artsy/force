import { type AuthContextModule, Intent } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SaveArtwork } from "./SaveArtworkMutation"

type Artwork = {
  internalID: string
  id: string | null
  slug: string | null
  collectorSignals: {
    auction: {
      lotWatcherCount: number
    } | null
  } | null
}

interface UseSaveArtwork {
  isSaved: boolean
  artwork: Artwork
  contextModule: AuthContextModule
  onSave?({ action, artwork }: { action: string; artwork: Artwork }): void
}

export const useSaveArtwork = ({
  isSaved,
  artwork,
  contextModule,
  onSave,
}: UseSaveArtwork) => {
  const { relayEnvironment, isLoggedIn } = useSystemContext()

  const { showAuthDialog } = useAuthDialog()

  const handleSave = async () => {
    if (relayEnvironment && isLoggedIn) {
      try {
        const { saveArtwork } = await SaveArtwork(
          relayEnvironment,
          { artworkID: artwork.internalID, remove: isSaved },
          {
            saveArtwork: {
              artwork: {
                id: artwork.id ?? "",
                slug: artwork.slug ?? "",
                isSavedToAnyList: !isSaved,
                collectorSignals: artwork.collectorSignals ?? null,
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
          },
        )

        onSave?.({
          // TODO: Pass "saved" or "removed" value
          action: !!saveArtwork?.artwork?.isSavedToAnyList
            ? "Saved Artwork"
            : "Removed Artwork",
          artwork,
        })
      } catch (err) {
        console.error("Artwork/Save Error saving artwork: ", err)
      }
    } else {
      showAuthDialog({
        options: {
          title: "Sign in to save this work and keep track of your favorites",
          afterAuthAction: {
            action: "save",
            kind: "artworks",
            objectId: artwork.internalID,
          },
          nodeId: artwork.id,
        },
        analytics: {
          intent: Intent.saveArtwork,
          contextModule,
        },
      })
    }
  }

  return { handleSave }
}
