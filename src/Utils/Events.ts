import EventEmitter from "eventemitter3"

declare global {
  interface Window {
    __reactionEventsEventEmitter: any
  }
}

const emitter =
  typeof window !== "undefined"
    ? window.__reactionEventsEventEmitter ||
      (window.__reactionEventsEventEmitter = new EventEmitter())
    : new EventEmitter()

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
