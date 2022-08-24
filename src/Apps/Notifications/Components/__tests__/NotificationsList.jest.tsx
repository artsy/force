import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NotificationsListFragmentContainer } from "../NotificationsList"
import { NotificationsList_test_Query } from "__generated__/NotificationsList_test_Query.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<NotificationsList_test_Query>({
  Component: NotificationsListFragmentContainer,
  query: graphql`
    query NotificationsList_test_Query @relay_test_operation {
      viewer {
        ...NotificationsList_viewer
      }
    }
  `,
})

describe("NotificationsList", () => {
  it("should render notification items", () => {
    renderWithRelay({
      NotificationConnection: () => notifications,
    })

    expect(screen.getByText("Notification One")).toBeInTheDocument()
    expect(screen.getByText("Notification Two")).toBeInTheDocument()
    expect(screen.getByText("Notification Three")).toBeInTheDocument()
  })
})

const notifications = {
  edges: [
    {
      node: {
        title: "Notification One",
      },
    },
    {
      node: {
        title: "Notification Two",
      },
    },
    {
      node: {
        title: "Notification Three",
      },
    },
  ],
}
