import { useSystemContext } from "System/Hooks/useSystemContext"

export const ARTIST_HEADER_SERIES_FLAG = "diamond_artist-series-shelf"

// Reads the router-resolved flag rather than `useFlag`, which is not isomorphic
// and returns false during server rendering. The series section has to be in the
// server-rendered HTML, so a client-only check would silently defeat it.
export const useEnableArtistHeaderSeries = (): boolean => {
  const { featureFlags } = useSystemContext()

  return !!featureFlags?.isEnabled(ARTIST_HEADER_SERIES_FLAG)
}
