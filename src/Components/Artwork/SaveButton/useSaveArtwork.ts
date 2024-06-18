import { useSystemContext } from "System/Hooks/useSystemContext"
import { AuthContextModule, Intent } from "@artsy/cohesion"
import { SaveArtwork } from "./SaveArtworkMutation"
import { useAuthDialog } from "Components/AuthDialog"

type Artwork = {
  internalID: string
  id: string | null
  slug: string | null
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
                isSaved: !isSaved,
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

        onSave?.({
          // TODO: Pass "saved" or "removed" value
          action: !!saveArtwork?.artwork?.isSaved
            ? "Saved Artwork"
            : "Removed Artwork",
          artwork,
        })
      } catch (err) {
        console.error("Artwork/Save Error saving artwork: ", err)
      }
    } else {
      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to save artworks`
          },
          afterAuthAction: {
            action: "save",
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
  }

  return { handleSave }
}
