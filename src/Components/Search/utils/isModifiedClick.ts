import type { MouseEvent } from "react"

/**
 * A middle click or a click with a modifier key held: the browser opens the
 * link in a new tab/window, so the current page must not navigate or close
 * transient UI.
 */
export const isModifiedClick = (event?: MouseEvent<HTMLElement>): boolean => {
  return (
    !!event &&
    (event.button === 1 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey)
  )
}
