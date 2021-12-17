import { useSystemContext } from "v2/System"
import { AuthContextModule, Intent } from "@artsy/cohesion"
import { openAuthToSatisfyIntent } from "v2/Utils/openAuthModal"
import { SaveArtwork } from "./SaveArtworkMutation"

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
  onSave?({ action: string, artwork: Artwork }): void
}

export const useSaveArtwork = ({
  isSaved,
  artwork,
  contextModule,
  onSave,
}: UseSaveArtwork) => {
  const { relayEnvironment, isLoggedIn, mediator } = useSystemContext()

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
      openAuthToSatisfyIntent(mediator!, {
        contextModule,
        intent: Intent.saveArtwork,
        entity: {
          slug: artwork.slug!,
          name: artwork.title ?? "",
        },
      })
    }
  }

  return { handleSave }
}
