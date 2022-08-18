import { AsyncLocalStorage } from "async_hooks"

export const asyncLocalStorage = new AsyncLocalStorage<Map<any, any>>()
