import {
  markAllNotificationsAsReadMutation,
  markAllNotificationsAsReadMutationResponse,
} from "__generated__/markAllNotificationsAsReadMutation.graphql"
import {
  commitMutation,
  ConnectionHandler,
  Environment,
  graphql,
} from "relay-runtime"

export const markAllNotificationsAsRead = (
  environment: Environment
): Promise<markAllNotificationsAsReadMutationResponse> => {
  return new Promise((resolve, reject) => {
    commitMutation<markAllNotificationsAsReadMutation>(environment, {
      mutation: graphql`
        mutation markAllNotificationsAsReadMutation {
          markAllNotificationsAsRead(input: {}) {
            responseOrError {
              ... on MarkAllNotificationsAsReadSuccess {
                success
              }
              ... on MarkAllNotificationsAsReadFailure {
                mutationError {
                  message
                }
              }
            }
          }
        }
      `,
      variables: {},
      updater: store => {
        const root = store.getRoot()
        const me = root.getLinkedRecord("me")
        const viewer = root.getLinkedRecord("viewer")

        if (!me || !viewer) {
          return
        }

        const key = "NotificationsList_notifications"
        const connection = ConnectionHandler.getConnection(viewer, key)
        const edges = connection?.getLinkedRecords("edges")

        // Set unread notifications count to 0
        me.setValue(0, "unreadNotificationsCount")

        // Mark all notifications as read
        edges?.forEach(edge => {
          const node = edge.getLinkedRecord("node")
          node?.setValue(false, "isUnread")
        })
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
