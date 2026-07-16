import { ContextModule, Intent } from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import type { CommandBarActions } from "Components/CommandBar/getCommands"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useCommandBarActionsArtistQuery } from "__generated__/useCommandBarActionsArtistQuery.graphql"
import type { useCommandBarActionsArtworkQuery } from "__generated__/useCommandBarActionsArtworkQuery.graphql"
import type { useCommandBarActionsFollowMutation } from "__generated__/useCommandBarActionsFollowMutation.graphql"
import type { useCommandBarActionsSaveMutation } from "__generated__/useCommandBarActionsSaveMutation.graphql"
import { fetchQuery, graphql } from "react-relay"

/**
 * Owns the router / Relay / toast side effects behind the command bar's
 * context-aware actions, keeping `getCommands` pure. Route params only give us
 * an entity's slug, so Follow/Save lazily resolve the `internalID` before
 * committing their mutation.
 */
export const useCommandBarActions = (): CommandBarActions => {
  const { match, router } = useRouter()
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { sendToast } = useToasts()
  const { showAuthDialog } = useAuthDialog()

  const { submitMutation: submitFollow } =
    useMutation<useCommandBarActionsFollowMutation>({
      mutation: graphql`
        mutation useCommandBarActionsFollowMutation(
          $input: FollowArtistInput!
        ) {
          followArtist(input: $input) {
            artist {
              id
              internalID
              isFollowed
            }
          }
        }
      `,
    })

  const { submitMutation: submitSave } =
    useMutation<useCommandBarActionsSaveMutation>({
      mutation: graphql`
        mutation useCommandBarActionsSaveMutation($input: SaveArtworkInput!) {
          saveArtwork(input: $input) {
            artwork {
              id
              isSavedToAnyList
            }
          }
        }
      `,
    })

  const navigate = (path: string) => {
    router.push(path)
  }

  const copyCurrentLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      sendToast({ variant: "success", message: "Link copied to clipboard" })
    } catch (error) {
      console.error("[CommandBar] Failed to copy link", error)
      sendToast({ variant: "error", message: "Unable to copy link" })
    }
  }

  const followCurrentArtist = async () => {
    const slug = match?.params?.artistID

    if (!slug) return

    if (!isLoggedIn) {
      showAuthDialog({
        options: {
          title: "Sign in to follow this artist",
          afterAuthAction: { action: "follow", kind: "artist", objectId: slug },
        },
        analytics: {
          intent: Intent.followArtist,
          contextModule: ContextModule.navBar,
        },
      })

      return
    }

    try {
      const data = await fetchQuery<useCommandBarActionsArtistQuery>(
        relayEnvironment,
        graphql`
          query useCommandBarActionsArtistQuery($id: String!) {
            artist(id: $id) {
              internalID
              name
              isFollowed
            }
          }
        `,
        { id: slug },
      ).toPromise()

      const artist = data?.artist

      if (!artist) return

      await submitFollow({
        variables: {
          input: { artistID: artist.internalID, unfollow: !!artist.isFollowed },
        },
      })

      sendToast({
        variant: "success",
        message: artist.isFollowed
          ? `Unfollowed ${artist.name}`
          : `Following ${artist.name}`,
      })
    } catch (error) {
      console.error("[CommandBar] Failed to follow artist", error)
      sendToast({ variant: "error", message: "Unable to follow this artist" })
    }
  }

  const saveCurrentArtwork = async () => {
    const slug = match?.params?.artworkID

    if (!slug) return

    if (!isLoggedIn) {
      showAuthDialog({
        options: {
          title: "Sign in to save this artwork",
          afterAuthAction: {
            action: "save",
            kind: "artworks",
            objectId: slug,
          },
        },
        analytics: {
          intent: Intent.saveArtwork,
          contextModule: ContextModule.navBar,
        },
      })

      return
    }

    try {
      const data = await fetchQuery<useCommandBarActionsArtworkQuery>(
        relayEnvironment,
        graphql`
          query useCommandBarActionsArtworkQuery($id: String!) {
            artwork(id: $id) {
              internalID
              title
              isSavedToAnyList
            }
          }
        `,
        { id: slug },
      ).toPromise()

      const artwork = data?.artwork

      if (!artwork) return

      const willRemove = !!artwork.isSavedToAnyList

      await submitSave({
        variables: {
          input: { artworkID: artwork.internalID, remove: willRemove },
        },
      })

      sendToast({
        variant: "success",
        message: willRemove
          ? "Removed from saves"
          : `Saved ${artwork.title ?? "artwork"}`,
      })
    } catch (error) {
      console.error("[CommandBar] Failed to save artwork", error)
      sendToast({ variant: "error", message: "Unable to save this artwork" })
    }
  }

  return {
    navigate,
    followCurrentArtist,
    saveCurrentArtwork,
    copyCurrentLink,
  }
}
