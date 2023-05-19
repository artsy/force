import { AsyncLocalStorage } from "async_hooks"

// ts-prune-ignore-next
export const asyncLocalStorage = new AsyncLocalStorage<Map<any, any>>()
