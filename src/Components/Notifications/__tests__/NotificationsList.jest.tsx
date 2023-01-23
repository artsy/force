import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NotificationsListFragmentContainer } from "Components/Notifications/NotificationsList"
import { NotificationsList_test_Query } from "__generated__/NotificationsList_test_Query.graphql"
import { LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY } from "Components/Notifications/util"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<NotificationsList_test_Query>({
  Component: props => {
    if (props.viewer) {
      return (
        <NotificationsListFragmentContainer type="all" viewer={props.viewer} />
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

  it("should render empty state when there is nothing to show", () => {
    renderWithRelay({
      NotificationConnection: () => ({
        edges: [],
      }),
    })

    const element = screen.getByLabelText("There is nothing to show")
    expect(element).toBeInTheDocument()
  })

  it("saves the date of a latest notification in localStorage", () => {
    renderWithRelay({
      NotificationConnection: () => notifications,
    })

    expect(
      window.localStorage.getItem(LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY)
    ).toEqual("2023-01-17T16:58:39Z")
  })
})

const notifications = {
  edges: [
    {
      node: {
        title: "Notification One",
        publishedAtAbsolute: "2023-01-17T16:58:39Z",
      },
    },
    {
      node: {
        title: "Notification Two",
        publishedAtAbsolute: "2023-01-16T16:58:39Z",
      },
    },
    {
      node: {
        title: "Notification Three",
        publishedAtAbsolute: "2023-01-15T16:58:39Z",
      },
    },
  ],
}
