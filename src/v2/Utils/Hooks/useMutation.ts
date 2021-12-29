import {
  commitMutation,
  GraphQLTaggedNode,
  MutationParameters,
} from "relay-runtime"
import { useSystemContext } from "v2/System/useSystemContext"

export const useMutation = <T extends MutationParameters>({
  mutation,
}: {
  mutation: GraphQLTaggedNode
}) => {
  const { relayEnvironment } = useSystemContext()

  const submitMutation = (
    variables: T["variables"] = {},
    options: {
      checkForErrors?: (res: T["response"]) => unknown
    } = {}
  ): Promise<T["response"]> => {
    return new Promise((resolve, reject) => {
      commitMutation<T>(relayEnvironment!, {
        mutation,
        variables,
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          if (options.checkForErrors?.(res)) {
            reject(options.checkForErrors?.(res))
            return
          }

          resolve(res)
        },
      })
    })
  }

  return { submitMutation }
}
