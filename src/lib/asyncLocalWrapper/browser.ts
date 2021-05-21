import type { AsyncLocalStorage } from "async_hooks"

const map = new Map()

// A no-op stub incase this is access in the browser.
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
