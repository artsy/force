import {
  BrowserProtocol,
  type Location,
  type LocationDescriptorObject,
} from "farce"

type PopStateHandler = (historyState: unknown) => boolean

/**
 * Extends Farce's BrowserProtocol with two extras used by features that need
 * to handle browser back/forward without involving the router:
 *
 *   1. Pop-state handlers: registered handlers run before the router is
 *      notified. A handler returning `true` claims the event — Farce never
 *      dispatches UPDATE_LOCATION, no further handlers run, and the
 *      handler is responsible for any side effects (e.g. scroll restore).
 *      Returning `false` (or not registering a handler at all) lets the
 *      router process the event normally.
 *
 *   2. Session counter: `_session` increments every time Farce performs a
 *      real PUSH navigation. Consumers stamp the current session id into the
 *      history-state markers they care about; their handler can then check
 *      `getSession()` to invalidate stale markers after a real route change.
 *      This keeps cross-path back/forward routing through Farce.
 */
export class FilterableBrowserProtocol extends BrowserProtocol {
  // Correct the return type of init() which Farce mis-types as void.
  declare init: () => Location

  private _popStateHandlers: PopStateHandler[] = []
  private _session = 0

  addPopStateHandler(handler: PopStateHandler): () => void {
    this._popStateHandlers.push(handler)

    return () => {
      const index = this._popStateHandlers.indexOf(handler)
      if (index !== -1) this._popStateHandlers.splice(index, 1)
    }
  }

  getSession(): number {
    return this._session
  }

  navigate(location: LocationDescriptorObject): Location {
    const result = super.navigate(location)

    // `action` is set by Farce's ensureLocationMiddleware before calling
    // navigate(); REPLACE does not advance history, so it does not bump
    // the session.
    if ((location as { action?: string }).action === "PUSH") {
      this._session += 1
    }

    return result
  }

  subscribe(listener: (location: Location) => void): () => void {
    const onPopState = () => {
      const state = window.history.state

      for (const handler of this._popStateHandlers) {
        if (handler(state)) return
      }

      listener(this.init())
    }

    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }
}
