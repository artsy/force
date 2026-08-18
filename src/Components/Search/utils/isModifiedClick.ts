import { userIsForcingNavigation } from "System/Router/Utils/catchLinks"
import type { MouseEvent } from "react"

/**
 * A non-primary button or a click with a modifier key held: the browser opens
 * the link in a new tab/window, so the current page must not navigate or
 * close transient UI. Delegates to the router's own predicate so the two
 * never drift.
 */
export const isModifiedClick = (event?: MouseEvent<HTMLElement>): boolean => {
  return !!event && userIsForcingNavigation(event)
}
