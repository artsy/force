import EventEmitter from "eventemitter3"

export interface AnalyticsHooks {
  emitter: EventEmitter
  trigger: (eventHook: string, options?: unknown) => void
  on: (eventHook: string, cb?: (options?: unknown) => void) => void
  off: (eventHook: string, cb?: (options?: unknown) => void) => void
}

declare global {
  interface Window {
    __analyticsHooks: EventEmitter
  }
}

const emitter: EventEmitter =
  typeof window !== "undefined"
    ? window.__analyticsHooks || (window.__analyticsHooks = new EventEmitter())
    : new EventEmitter()

const trigger: AnalyticsHooks["trigger"] = (
  eventHook: string,
  options?: unknown,
  optionalData?: unknown
) => {
  emitter.emit(eventHook, options, optionalData)
}

const on: AnalyticsHooks["on"] = (
  eventHook: string,
  callback: (options?: unknown, optionalData?: unknown) => void
) => {
  emitter.on(eventHook, callback)
}

const off: AnalyticsHooks["off"] = (
  eventHook: string,
  callback: (options?: unknown, optionalData?: unknown) => void
) => {
  emitter.off(eventHook, callback)
}

/**
 * @deprecated Event emitter used ONLY for inquiry analytics
 * @param eventHook name to identify events
 * @param callback tracking function to be called when hook is triggered
 */
export const analyticsHooks: AnalyticsHooks = {
  emitter,
  off,
  on,
  trigger,
}
