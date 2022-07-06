import {
  commitMutation,
  GraphQLTaggedNode,
  MutationParameters,
} from "relay-runtime"
import { useSystemContext } from "v2/System/useSystemContext"

export const useMutation = <T extends MutationParameters>({
  mutation,
  optimisticResponse,
}: {
  mutation: GraphQLTaggedNode
  optimisticResponse?: T["response"]
}) => {
  const { relayEnvironment } = useSystemContext()

  const submitMutation = (props: {
    variables: T["variables"]
    rejectIf?: (res: T["response"]) => unknown
  }): Promise<T["response"]> => {
    const { variables = {}, rejectIf } = props

    return new Promise((resolve, reject) => {
      commitMutation<T>(relayEnvironment!, {
        mutation,
        variables,
        optimisticResponse,
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          if (rejectIf?.(res)) {
            reject(rejectIf?.(res))
            return
          }

          resolve(res)
        },
      })
    })
  }

  return { submitMutation }
}
