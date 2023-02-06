import { useEffect, useState } from "react"
import { fetchQuery, GraphQLTaggedNode } from "react-relay"
import { OperationType } from "relay-runtime"
import { useSystemContext } from "System"

export const useQuery = <T extends OperationType>(
  query: GraphQLTaggedNode,
  variables: T["variables"] = {}
) => {
  const { relayEnvironment } = useSystemContext()

  const [data, setData] = useState<T["response"] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data || error) return

    const exec = async () => {
      setLoading(true)

      try {
        const res = await fetchQuery<T>(
          relayEnvironment!,
          query,
          variables
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, relayEnvironment, variables])

  return { data, error, loading }
}
