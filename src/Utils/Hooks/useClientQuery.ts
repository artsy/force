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
  const [disposable, setDisposable] = useState<Disposable | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  const key = useRef(JSON.stringify(variables))
  const prevKey = useRef(key.current)

  useUpdateEffect(() => {
    key.current = JSON.stringify(variables)
  }, [variables])

  // refetch returns an object with a `promise` that resolves when the network
  // response arrives and a `disposable` with a `dispose()` method that can be
  // used to cancel the in-flight subscription where supported.
  const refetch = (newVariables = variables) => {
    setLoading(true)

    const observable = fetchQuery<T>(
      (environment || relayEnvironment) as unknown as Environment,
      query,
      newVariables,
      cacheConfig,
    )

    let subscription: {
      unsubscribe?: () => void
      dispose?: () => void
    } | null = null

    const promise: Promise<T["response"] | null> = new Promise(
      (resolve, reject) => {
        try {
          subscription = observable.subscribe({
            next: res => {
              setData(res)
              setLoading(false)

              const operation = createOperationDescriptor(
                getRequest(query),
                variables ?? {},
              )

              // Retain the operation to prevent it from being garbage collected.
              const retained = relayEnvironment.retain(operation)
              setDisposable(retained)

              resolve(res)
            },
            error: err => {
              setError(err)
              setLoading(false)
              reject(err)
            },
          })
        } catch (err) {
          setError(err as Error)
          setLoading(false)
          reject(err)
        }
      },
    )

    const disposable = {
      dispose: () => {
        try {
          // Prefer `unsubscribe` then `dispose` if available on the subscription
          if (
            subscription &&
            typeof (subscription as any).unsubscribe === "function"
          ) {
            ;(subscription as any).unsubscribe()
          } else if (
            subscription &&
            typeof (subscription as any).dispose === "function"
          ) {
            ;(subscription as any).dispose()
          }
        } catch (e) {
          // swallow
        }
      },
    }

    return { promise, disposable }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (key.current !== prevKey.current) {
      setData(null)
      setError(null)
      setLoading(true)

      prevKey.current = key.current
    }

    if (skip || data || error) return

    refetch()

    // https://github.com/facebook/react/issues/25149
    // Excludes `T`
  }, [
    cacheConfig,
    data,
    disposable,
    environment,
    error,
    query,
    relayEnvironment,
    skip,
    variables,
  ])

  return { data, disposable, error, loading: skip ? false : loading, refetch }
}
