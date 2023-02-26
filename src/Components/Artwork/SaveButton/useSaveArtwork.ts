import { useSystemContext } from "System/useSystemContext"
import { AuthContextModule, Intent } from "@artsy/cohesion"
import { SaveArtwork } from "./SaveArtworkMutation"
import { useAuthDialog } from "Components/AuthDialog"

type Artwork = {
  internalID: string
  id: string | null
  slug: string | null
  title: string | null
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
                id: artwork.id!,
                slug: artwork.slug!,
                is_saved: !isSaved,
              },
            },
          }
        )

        onSave?.({
          action: !!saveArtwork?.artwork?.is_saved
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
