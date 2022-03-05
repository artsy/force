import { useCallback, useEffect } from "react"
import * as React from "react"
import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import { useRouter } from "v2/System/Router/useRouter"
import { useRecordArtworkViewMutation } from "v2/__generated__/useRecordArtworkViewMutation.graphql"

export const useRecordArtworkView = () => {
  const { relayEnvironment, isLoggedIn } = useSystemContext()

  const {
    match: {
      params: { artworkID },
    },
  } = useRouter()

  const recordArtworkView = useCallback(
    (artworkID: string) => {
      commitMutation<useRecordArtworkViewMutation>(relayEnvironment!, {
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
