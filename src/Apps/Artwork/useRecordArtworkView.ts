import { useCallback, useEffect } from "react"
import * as React from "react"
import { graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { useRecordArtworkViewMutation } from "__generated__/useRecordArtworkViewMutation.graphql"
import { commitMutation } from "react-relay"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"

export const useRecordArtworkView = () => {
  const { user, isLoggedIn } = useSystemContext()

  // We instantiate a new Relay environment so that we can ensure client side
  // cache is preserved. Since clicking artworks is so common, we don't want to
  // blow away visit cache.
  const relayEnvironment = createRelaySSREnvironment({ user })

  const {
    match: {
      params: { artworkID },
    },
  } = useRouter()

  const recordArtworkView = useCallback(
    (artworkID: string) => {
      commitMutation<useRecordArtworkViewMutation>(relayEnvironment, {
        variables: { artworkID },
        mutation: graphql`
          mutation useRecordArtworkViewMutation($artworkID: String!) {
            recordArtworkView(input: { artwork_id: $artworkID }) {
              artwork_id
            }
          }
        `,
      })
    },
    [relayEnvironment]
  )

  useEffect(() => {
    // Only record artwork views for logged in users
    if (!isLoggedIn) return

    /**
     * Record artwork view on mount and if artwork ID changes
     * (artwork to artwork client-side page views)
     */
    if (artworkID) {
      recordArtworkView(artworkID)
    }
  }, [isLoggedIn, artworkID, recordArtworkView])
}

/**
 * Component wrapper to enable hook usage in a class component
 */
export const UseRecordArtworkView: React.FC = () => {
  useRecordArtworkView()
  return null
}
