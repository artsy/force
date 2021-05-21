import type { AsyncLocalStorage } from "async_hooks"

export const getAsyncLocalStorage = () => {
  if (typeof window === "undefined") {
    const { asyncLocalStorage } = require("./server")
    return asyncLocalStorage as AsyncLocalStorage<Map<any, any>>
  }
  const { asyncLocalStorage } = require("./browser")
  return asyncLocalStorage as AsyncLocalStorage<Map<any, any>>
}
