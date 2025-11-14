import { useSystemContext } from "System/Hooks/useSystemContext"
import type {
  markNotificationAsReadMutation,
  markNotificationAsReadMutation$data,
} from "__generated__/markNotificationAsReadMutation.graphql"
import { commitMutation, type Environment, graphql } from "react-relay"

const updater = (id: string, store: any) => {
  const notification = store.get(id)

  notification?.setValue(false, "isUnread")
}

export const markNotificationAsRead = (
  environment: Environment,
  id: string,
  internalID: string,
): Promise<markNotificationAsReadMutation$data> => {
  return new Promise((resolve, reject) => {
    commitMutation<markNotificationAsReadMutation>(environment, {
      mutation: graphql`
        mutation markNotificationAsReadMutation(
          $input: MarkNotificationAsReadInput!
        ) {
          markNotificationAsRead(input: $input) {
            responseOrError {
              ... on MarkNotificationAsReadSuccess {
                success
                me {
                  unreadNotificationsCount
                }
              }

              ... on MarkNotificationAsReadFailure {
                mutationError {
                  message
                }
              }
            }
          }
        }
      `,
      variables: {
        input: {
          id: internalID,
        },
      },
      updater: store => {
        updater(id, store)
      },
      optimisticUpdater: store => {
        updater(id, store)
      },
      onCompleted: response => {
        resolve(response)
      },
      onError: error => {
        reject(error)
      },
    })
  })
}

export const useMarkNotificationAsRead = () => {
  const { relayEnvironment } = useSystemContext()

  const markAsRead = async ({
    id,
    internalID,
  }: {
    id: string
    internalID: string
  }) => {
    if (!relayEnvironment) return

    const response = await markNotificationAsRead(
      relayEnvironment,
      id,
      internalID,
    )

    const responseOrError = response.markNotificationAsRead?.responseOrError
    const errorMessage = responseOrError?.mutationError?.message

    if (errorMessage) {
      throw new Error(errorMessage)
    }
  }

  return { markAsRead }
}
