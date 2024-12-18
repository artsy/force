import { screen } from "@testing-library/react"
import { NotificationsListFragmentContainer } from "Components/Notifications/NotificationsList"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { NotificationsList_test_Query } from "__generated__/NotificationsList_test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<NotificationsList_test_Query>({
  Component: props => {
    if (props.viewer) {
      return (
        <NotificationsListFragmentContainer
          mode="dropdown"
          type="all"
          viewer={props.viewer}
        />
      )
    }

    return null
  },
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

  it("does not fail if a notification is null", () => {
    renderWithRelay({
      NotificationConnection: () => ({
        edges: [...notifications.edges, { node: null }],
      }),
    })

    expect(screen.getByText("Notification One")).toBeInTheDocument()
    expect(screen.getByText("Notification Two")).toBeInTheDocument()
    expect(screen.getByText("Notification Three")).toBeInTheDocument()
  })

  it("should render empty state when there is nothing to show", () => {
    renderWithRelay({
      NotificationConnection: () => ({
        edges: [],
      }),
    })

    const element = screen.getByLabelText("There is nothing to show")
    expect(element).toBeInTheDocument()
  })
})

const notifications = {
  edges: [
    {
      node: {
        headline: "Notification One",
        notificationType: "ARTWORK_ALERT",
      },
    },
    {
      node: {
        headline: "Notification Two",
        notificationType: "ARTWORK_PUBLISHED",
      },
    },
    {
      node: {
        headline: "Notification Three",
        notificationType: "PARTNER_OFFER_CREATED",
      },
    },
  ],
}
