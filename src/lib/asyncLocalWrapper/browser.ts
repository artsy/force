import type { AsyncLocalStorage } from "async_hooks"

const map = new Map()

// A no-op stub in case this is accessed in the browser.
export const asyncLocalStorage: AsyncLocalStorage<Map<any, any>> = {
  getStore: () => {
    return map
  },
  run: () => {},
  disable: () => {},
  exit: () => {},
  exitSyncAndReturn: cb => {
    return cb()
  },
  enterWith: () => {},
}
