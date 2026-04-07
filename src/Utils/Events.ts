import { EventEmitter } from "events"

declare global {
  interface Window {
    __reactionEventsEventEmitter: any
  }
}

const getEmitter = () => {
  if (typeof window === "undefined") return new EventEmitter()

  if (!window.__reactionEventsEventEmitter) {
    window.__reactionEventsEventEmitter = new EventEmitter()
  }

  return window.__reactionEventsEventEmitter
}

const emitter = getEmitter()

/**
 * Post tracking event to Force
 * @param data data to track
 * @see [force] src/desktop/assets/analytics.ts
 */
const postEvent = data => {
  emitter.emit("postEvent", data)
}

const onEvent = callback => emitter.on("postEvent", callback)

export default {
  emitter,
  onEvent,
  postEvent,
}
