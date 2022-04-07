import EventEmitter from "eventemitter3"

/**
 * Logout user and optionally redirect
 */
export type LogoutEventOptions = { redirectPath?: string }

export interface Mediator {
  emitter: EventEmitter
  ready: (eventName: string) => boolean
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

const REGISTERED_LISTENERS = new Set<string>()

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

const ready = (eventName: string): boolean => {
  return REGISTERED_LISTENERS.has(eventName)
}

const on: Mediator["on"] = (
  eventName: string,
  callback: (options?: unknown, optionalData?: unknown) => void
) => {
  REGISTERED_LISTENERS.add(eventName)
  emitter.on(eventName, callback)
}

const off: Mediator["off"] = (eventName: string) => {
  REGISTERED_LISTENERS.delete(eventName)
  emitter.off(eventName)
}

const once: Mediator["once"] = (
  eventName: string,
  callback: (options?: unknown) => void
) => {
  REGISTERED_LISTENERS.add(eventName)
  emitter.once(eventName, () => {
    const result = callback()
    REGISTERED_LISTENERS.delete(eventName)
    return result
  })
}

/**
 * Event emitter used for (mostly) modal-related events
 * @param eventName name of event track
 * @param callback function to be called when named event is triggered
 */
export const mediator: Mediator = {
  emitter,
  off,
  on,
  once,
  ready,
  trigger,
}
