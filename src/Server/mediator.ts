import EventEmitter from "eventemitter3"

/**
 * Logout user and optionally redirect
 */
export type LogoutEventOptions = { redirectPath?: string }

export interface Mediator {
  emitter: EventEmitter
  ready: (eventName: string) => boolean
  trigger: (eventName: string, ...args: unknown[]) => void
  on: (eventName: string, cb?: (...args: unknown[]) => void) => void
  off: (eventName: string, cb?: (...args: unknown[]) => void) => void
  once: (eventName: string, cb?: (...args: unknown[]) => void) => void
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
  ...args: unknown[]
) => {
  emitter.emit(eventName, ...args)
}

const ready = (eventName: string): boolean => {
  return REGISTERED_LISTENERS.has(eventName)
}

const on: Mediator["on"] = (
  eventName: string,
  callback: (...args: unknown[]) => void
) => {
  REGISTERED_LISTENERS.add(eventName)
  emitter.on(eventName, callback)
}

const off: Mediator["off"] = (
  eventName: string,
  callback?: (...args: unknown[]) => void
) => {
  REGISTERED_LISTENERS.delete(eventName)
  emitter.off(eventName, callback)
}

const once: Mediator["once"] = (
  eventName: string,
  callback: (...args: unknown[]) => void
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
 * @deprecated: Use React Context
 */
export const mediator: Mediator = {
  emitter,
  off,
  on,
  once,
  ready,
  trigger,
}
