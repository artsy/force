import {
  markNotificationAsReadMutation,
  markNotificationAsReadMutation$data,
} from "__generated__/markNotificationAsReadMutation.graphql"
import {
  commitMutation,
  Environment,
  graphql,
  RecordSourceSelectorProxy,
} from "relay-runtime"

const updater = (
  id: string,
  store: RecordSourceSelectorProxy<markNotificationAsReadMutation$data>
) => {
  const notification = store.get(id)

  notification?.setValue(false, "isUnread")
}

export const markNotificationAsRead = (
  environment: Environment,
  id: string,
  internalId: string
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
          id: internalId,
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
