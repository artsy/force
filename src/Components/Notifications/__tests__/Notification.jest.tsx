import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NotificationFragmentContainer } from "Components/Notifications/Notification"
import { Notification_test_Query } from "__generated__/Notification_test_Query.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<Notification_test_Query>({
  Component: props => {
    if (props.me) {
      return <NotificationFragmentContainer me={props.me} />
    }

    return null
  },
  query: graphql`
    query Notification_test_Query($id: String!) @relay_test_operation {
      me {
        ...Notification_me @arguments(notificationId: $id)
      }
    }
  `,
})

describe("Notification", () => {
  it("should render notification items", () => {
    renderWithRelay({
      Notification: () => notification,
    })

    expect(screen.getByText("Notification One")).toBeInTheDocument()
  })
})

const notification = {
  title: "Notification One",
}
