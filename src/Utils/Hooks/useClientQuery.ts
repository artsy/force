import { useEffect, useRef, useState } from "react"
import { Environment, fetchQuery, GraphQLTaggedNode } from "react-relay"
import {
  CacheConfig,
  FetchQueryFetchPolicy,
  OperationType,
} from "relay-runtime"
import { useUpdateEffect } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"

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

  useUpdateEffect(() => {
    key.current = JSON.stringify(variables)
  }, [variables])

  useEffect(() => {
    if (key.current !== prevKey.current) {
      setData(null)
      setError(null)
      setLoading(true)

      prevKey.current = key.current
    }

    if (skip || data || error) return

    const exec = async () => {
      setLoading(true)

      try {
        const res = await fetchQuery<T>(
          ((environment || relayEnvironment) as unknown) as Environment,
          query,
          variables,
          cacheConfig
        ).toPromise()

        setData(res)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    exec()

    // https://github.com/facebook/react/issues/25149
    // Excludes `T`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cacheConfig,
    data,
    environment,
    error,
    query,
    relayEnvironment,
    skip,
    variables,
  ])

  return { data, error, loading: skip ? false : loading }
}
