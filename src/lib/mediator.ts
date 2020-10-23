import EventEmitter from "eventemitter3"

export interface Mediator {
  emitter: EventEmitter
  trigger: (eventName: string, options?: unknown) => void
  on: (eventName: string, cb?: (options?: unknown) => void) => void
  off: (eventName: string) => void
  once: (eventName: string, cb?: (options?: unknown) => void) => void
}

declare global {
  interface Window {
    __mediator: EventEmitter
  }
}

const emitter: EventEmitter =
  typeof window !== "undefined"
    ? window.__mediator || (window.__mediator = new EventEmitter())
    : new EventEmitter()

const trigger: Mediator["trigger"] = (
  eventName: string,
  options?: unknown,
  optionalData?: unknown
) => {
  emitter.emit(eventName, options, optionalData)
}

const on: Mediator["on"] = (
  eventName: string,
  callback: (options?: unknown, optionalData?: unknown) => void
) => {
  emitter.on(eventName, callback)
}

const off: Mediator["off"] = (eventName: string) => {
  emitter.off(eventName)
}

const once: Mediator["once"] = (
  eventName: string,
  callback: (options?: unknown) => void
) => {
  emitter.once(eventName, callback)
}

/**
 * Event emitter used for (mostly) modal-related events
 * @param eventName name of event track
 * @param callback function to be called when named event is triggered
 */
export const mediator: Mediator = {
  emitter,
  on,
  off,
  once,
  trigger,
}
