import { getAsyncLocalStorage } from "Server/asyncLocalWrapper"

/**
 * Updates the async local storage context for the current request.
 * This is safe to use on both server and client.
 */
export function updateContext(key: string, value: any) {
  const asyncLocalStorage = getAsyncLocalStorage()
  asyncLocalStorage.getStore()?.set(key, value)
}
