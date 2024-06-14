import { commitMutation, GraphQLTaggedNode } from "react-relay"
import { MutationParameters, MutationConfig } from "relay-runtime"
import { useSystemContext } from "System/Hooks/useSystemContext"

export const useMutation = <T extends MutationParameters>({
  mutation,
  optimisticResponse,
  updater,
}: {
  mutation: GraphQLTaggedNode
  optimisticResponse?: T["response"]
  updater?: MutationConfig<T>["updater"]
}) => {
  const { relayEnvironment } = useSystemContext()

  const submitMutation = (props: {
    variables: T["variables"]
    rejectIf?: (res: T["response"]) => unknown
  }): Promise<T["response"]> => {
    const { variables = {}, rejectIf } = props

    return new Promise((resolve, reject) => {
      commitMutation<T>(relayEnvironment, {
        mutation,
        variables,
        updater,
        // FIXME: Relay 15 types
        optimisticResponse: optimisticResponse as any,
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
