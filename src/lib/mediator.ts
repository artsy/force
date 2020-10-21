import { MediatorEventOptions } from "typings/mediator"
import EventEmitter from "eventemitter3"

export interface Mediator {
  emitter: any
  trigger: (action: string, options?: MediatorEventOptions) => void
  on: (event: string, cb?: (payload?: MediatorEventOptions) => void) => void
  off: (event: string) => void
  once: (event: string, cb?: (payload?: MediatorEventOptions) => void) => void
}

declare global {
  interface Window {
    __mediator: Mediator["emitter"]
  }
}

const emitter: Mediator["emitter"] =
  typeof window !== "undefined"
    ? window.__mediator || (window.__mediator = new EventEmitter())
    : new EventEmitter()

const trigger: Mediator["trigger"] = (
  eventName: string,
  options?: MediatorEventOptions
) => {
  emitter.emit(eventName, options)
}

const on: Mediator["on"] = (
  eventName: string,
  callback: (options?: MediatorEventOptions) => void
) => {
  emitter.on(eventName, callback)
}

const off: Mediator["off"] = (eventName: string) => {
  emitter.off(eventName)
}

const once: Mediator["once"] = (
  eventName: string,
  callback: (options?: MediatorEventOptions) => void
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
