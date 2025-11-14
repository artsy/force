import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  type Environment,
  type GraphQLTaggedNode,
  commitMutation,
} from "react-relay"
import type { MutationConfig, MutationParameters } from "relay-runtime"

export const useMutation = <T extends MutationParameters>({
  mutation,
  optimisticResponse,
  updater,
  relayEnvironment,
}: {
  mutation: GraphQLTaggedNode
  optimisticResponse?: T["response"]
  updater?: MutationConfig<T>["updater"]
  relayEnvironment?: Environment | null
}) => {
  const { relayEnvironment: defaultRelayEnvironment } = useSystemContext()
  const environment = relayEnvironment || defaultRelayEnvironment

  const submitMutation = (props: {
    variables: T["variables"]
    rejectIf?: (res: T["response"]) => unknown
  }): Promise<T["response"]> => {
    const { variables = {}, rejectIf } = props

    return new Promise((resolve, reject) => {
      commitMutation<T>(environment, {
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
