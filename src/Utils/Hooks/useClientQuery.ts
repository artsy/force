import { useSystemContext } from "System/Hooks/useSystemContext"
import { useUpdateEffect } from "@artsy/palette"
import { useEffect, useRef, useState } from "react"
import {
  type Disposable,
  type Environment,
  fetchQuery,
  type GraphQLTaggedNode,
} from "react-relay"
import {
  type CacheConfig,
  createOperationDescriptor,
  type FetchQueryFetchPolicy,
  getRequest,
  type OperationType,
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

  const refetch = async (newVariables = variables) => {
    setLoading(true)

    try {
      const res = await fetchQuery<T>(
        (environment || relayEnvironment) as unknown as Environment,
        query,
        newVariables,
        cacheConfig,
      ).toPromise()

      setData(res)
      setLoading(false)

      const operation = createOperationDescriptor(
        getRequest(query),
        variables ?? {},
      )

      // Retain the operation to prevent it from being garbage collected. Garbage collection can compromise type safety (e.g. non-nullable values being `null`), potentially leading to runtime errors.
      const disposable = relayEnvironment.retain(operation)

      setDisposable(disposable)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

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
