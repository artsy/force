/**
 * Mirror of the `AIAgentEvent` union from Metaphysics' `Subscription.aiAgentTurn`.
 *
 * These are hand-written rather than Relay-generated: Force's schema has no
 * `type Subscription` and its Relay environment has no `subscribe` function, so
 * the subscription document is a plain string and gets no codegen. Keep this in
 * lockstep with `src/schema/v2/ai/agent/types.ts` in metaphysics.
 */

/**
 * The `artworksConnection` arguments the agent actually applied. Field names
 * intentionally match Force's own `ArtworkFilters`, so the object can be handed
 * straight to `buildUrlForCollectApp` with no mapping.
 */
export interface AISearchArtworkFilters {
  keyword?: string | null
  artistIDs?: string[] | null
  additionalGeneIDs?: string[] | null
  attributionClass?: string[] | null
  priceRange?: string | null
  sizes?: string[] | null
  colors?: string[] | null
  majorPeriods?: string[] | null
  sort?: string | null
}

export interface AIAgentTextDelta {
  __typename: "AIAgentTextDelta"
  text: string
}

export type AIAgentActivity =
  | "THINKING"
  | "SEARCHING_ARTWORKS"
  | "SEARCHING_ARTISTS"
  | "SEARCHING_SHOWS"
  | "SEARCHING_FAIRS"
  | "FINDING_RECOMMENDATIONS"
  | "LOADING_ARTWORK_DETAILS"
  | "SEARCHING_ARTSY"

export interface AIAgentToolCall {
  __typename: "AIAgentToolCall"
  activity: AIAgentActivity
}

export interface AIAgentToolResult {
  __typename: "AIAgentToolResult"
}

export interface AIAgentTurnComplete {
  __typename: "AIAgentTurnComplete"
  message: string | null
  stopReason: string
  toolCallCount: number
  artworks: Array<{ internalID: string }> | null
  /** Requires the `artists` field on `AIAgentTurnComplete`; null until it ships */
  artists: Array<{ internalID: string }> | null
  /** Requires the `artworkFilters` field on `AIAgentTurnComplete`; null until it ships */
  artworkFilters: AISearchArtworkFilters | null
}

export type AIAgentEvent =
  | AIAgentTextDelta
  | AIAgentToolCall
  | AIAgentToolResult
  | AIAgentTurnComplete

export type AISearchRole = "USER" | "ASSISTANT"

/** One entry of the client-owned history replayed to the server each turn */
export interface AISearchHistoryEntry {
  role: AISearchRole
  content: string
}
