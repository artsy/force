import { useUpdateEffect } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useEffect, useRef, useState } from "react"
import {
  type Disposable,
  type Environment,
  type GraphQLTaggedNode,
  fetchQuery,
} from "react-relay"
import {
  type CacheConfig,
  type FetchQueryFetchPolicy,
  type OperationType,
  createOperationDescriptor,
  getRequest,
} from "relay-runtime"

// Type for the refetch return value
type RefetchResult<T> = {
  promise: Promise<T>
  disposable: Disposable
}

export const useClientQuery = <T extends OperationType>({
  environment,
  query,
  variables = {},
  cacheConfig = {},
  skip = false,
}: {
  environment?: Environment
  query: GraphQLTaggedNode
  variables?: T["variables"]
  cacheConfig?: {
    networkCacheConfig?: CacheConfig | null | undefined
    fetchPolicy?: FetchQueryFetchPolicy | null | undefined
  } | null
  skip?: boolean
}) => {
  const { relayEnvironment } = useSystemContext()

  const [data, setData] = useState<T["response"] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  const key = useRef(JSON.stringify(variables))
  const prevKey = useRef(key.current)
  const retainedRef = useRef<Disposable | null>(null)

  useUpdateEffect(() => {
    key.current = JSON.stringify(variables)
  }, [variables])

  // Clean up retained operations on unmount
  useEffect(() => {
    return () => {
      if (retainedRef.current) {
        retainedRef.current.dispose()
        retainedRef.current = null
      }
    }
  }, [])

  // refetch returns an object with a `promise` that resolves when the network
  // response arrives and a `disposable` with a `dispose()` method that can be
  // used to cancel the in-flight subscription where supported.
  const refetch = (
    newVariables = variables,
  ): RefetchResult<T["response"] | null> => {
    setLoading(true)

    const env = (environment || relayEnvironment) as unknown as Environment

    // Validate environment
    if (!env) {
      const error = new Error("No Relay environment available")
      setError(error)
      setLoading(false)
      const rejectedPromise = Promise.reject(error).catch(() => null)
      return { promise: rejectedPromise, disposable: { dispose: () => {} } }
    }

    const observable = fetchQuery<T>(env, query, newVariables, cacheConfig)

    // Validate observable
    if (!observable || typeof observable.toPromise !== "function") {
      const error = new Error("fetchQuery did not return a valid observable")
      setError(error)
      setLoading(false)
      const rejectedPromise = Promise.reject(error).catch(() => null)
      return { promise: rejectedPromise, disposable: { dispose: () => {} } }
    }

    // Dispose previous retained operation before creating new one
    if (retainedRef.current) {
      try {
        retainedRef.current.dispose()
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("useClientQuery: Error disposing previous retained:", e)
        }
      }
      retainedRef.current = null
    }

    // Use toPromise() to get the result and subscribe to handle state updates
    const subscription = observable.subscribe({
      next: res => {
        setData(res)
        setLoading(false)

        // Use newVariables (not outer variables) to retain the correct operation
        const operation = createOperationDescriptor(
          getRequest(query),
          newVariables ?? {},
        )

        // Retain the operation to prevent garbage collection
        const retained = env.retain(operation)
        retainedRef.current = retained
      },
      error: (err: Error) => {
        setError(err)
        setLoading(false)
      },
    })

    // Convert observable to promise
    const promise = observable.toPromise()

    // Create disposable that cancels the subscription
    const disposable: Disposable = {
      dispose: () => {
        try {
          if (subscription && typeof subscription.unsubscribe === "function") {
            subscription.unsubscribe()
          }
        } catch (e) {
          // Disposal is best-effort - log in dev but don't throw
          if (process.env.NODE_ENV !== "production") {
            console.warn("useClientQuery: Error during disposal:", e)
          }
        }
      },
    }

    return { promise, disposable }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: ignored using `--suppress`
  useEffect(() => {
    if (key.current !== prevKey.current) {
      setData(null)
      setError(null)
      setLoading(true)

      prevKey.current = key.current
    }

    if (skip || data || error) return

    refetch()
  }, [data, error, skip, variables])

  return {
    data,
    disposable: retainedRef.current,
    error,
    loading: skip ? false : loading,
    refetch,
  }
}
