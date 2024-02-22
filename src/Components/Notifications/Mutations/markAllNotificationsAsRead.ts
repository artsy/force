import {
  markAllNotificationsAsReadMutation,
  markAllNotificationsAsReadMutation$data,
} from "__generated__/markAllNotificationsAsReadMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime"

const updater = (
  store: RecordSourceSelectorProxy<markAllNotificationsAsReadMutation$data>
) => {
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
}

export const markAllNotificationsAsRead = (
  environment: Environment
): Promise<markAllNotificationsAsReadMutation$data> => {
  return new Promise((resolve, reject) => {
    commitMutation<markAllNotificationsAsReadMutation>(environment, {
      mutation: graphql`
        mutation markAllNotificationsAsReadMutation {
          markAllNotificationsAsRead(input: {}) {
            responseOrError {
              ... on MarkAllNotificationsAsReadSuccess {
                success
                me {
                  unreadNotificationsCount
                }
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
      updater: updater,
      optimisticUpdater: updater,
      onCompleted: response => {
        resolve(response)
      },
      onError: error => {
        reject(error)
      },
    })
  })
}
