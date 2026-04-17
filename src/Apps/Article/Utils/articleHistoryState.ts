const STATE_KEY = "articleTocJump"

/**
 * History-state marker we attach to entries created by an in-page TOC click.
 *
 * - The "before" entry (the one the user is on when they click) is stamped
 *   via `replaceState` with a `scrollY` so we can restore their position on
 *   back.
 * - The "after" entry (the one we push at the heading hash) carries a
 *   `targetId` so we can re-jump to the heading on forward.
 *
 * `session` is the value returned by
 * `FilterableBrowserProtocol#getSession()` at the time the marker was
 * stamped. It lets us invalidate stale markers whenever a real Farce
 * navigation happens, so back/forward across path boundaries falls through
 * to the router as expected.
 */
export interface TocJumpState {
  session: number
  scrollY?: number
  targetId?: string
}

export const getTocJumpState = (historyState: unknown): TocJumpState | null => {
  if (!historyState || typeof historyState !== "object") return null

  const state = (historyState as Record<string, unknown>)[STATE_KEY]
  if (!state || typeof state !== "object") return null
  if (typeof (state as Record<string, unknown>).session !== "number") {
    return null
  }

  return state as TocJumpState
}

interface PushTocJumpEntryParams {
  scrollY: number
  targetId: string
  session: number
  hash: string
}

/**
 * Stamps the current entry with `scrollY` (so back can restore position),
 * then pushes a new entry at `hash` with `targetId` (so forward can re-jump
 * to the heading).
 */
export const pushTocJumpEntry = ({
  scrollY,
  targetId,
  session,
  hash,
}: PushTocJumpEntryParams): void => {
  const baseState = window.history.state ?? {}

  window.history.replaceState(
    { ...baseState, [STATE_KEY]: { session, scrollY } satisfies TocJumpState },
    "",
  )

  window.history.pushState(
    { ...baseState, [STATE_KEY]: { session, targetId } satisfies TocJumpState },
    "",
    hash,
  )
}
