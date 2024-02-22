import {
  markNotificationsAsSeenMutation,
  markNotificationsAsSeenMutation$data,
} from "__generated__/markNotificationsAsSeenMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"

const updater = (
  store: RecordSourceSelectorProxy<markNotificationsAsSeenMutation$data>
) => {
  const root = store.getRoot()
  const me = root.getLinkedRecord("me")

  if (!me) {
    return
  }
  // Set unseen notifications count to 0
  me.setValue(0, "unseenNotificationsCount")
}

export const markNotificationsAsSeen = (
  until: string,
  environment: Environment
): Promise<markNotificationsAsSeenMutation$data> => {
  return new Promise((resolve, reject) => {
    commitMutation<markNotificationsAsSeenMutation>(environment, {
      mutation: graphql`
        mutation markNotificationsAsSeenMutation(
          $input: MarkNotificationsAsSeenInput!
        ) {
          markNotificationsAsSeen(input: $input) {
            responseOrError {
              ... on MarkNotificationsAsSeenSuccess {
                success
                me {
                  unseenNotificationsCount
                }
              }
              ... on MarkNotificationsAsSeenFailure {
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
          until,
        },
      },
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
