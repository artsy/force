import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NavBarMobileMenuNotificationsIndicatorFragmentContainer } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuNotificationsIndicator"
import { LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY } from "Components/Notifications/util"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: NavBarMobileMenuNotificationsIndicatorFragmentContainer,
  query: graphql`
    query NavBarMobileMenuNotificationsIndicator_test_Query
      @relay_test_operation {
      viewer {
        ...NavBarMobileMenuNotificationsIndicator_viewer
      }
      me {
        ...NavBarMobileMenuNotificationsIndicator_me
      }
    }
  `,
})

describe("NavBarMobileMenuNotificationsIndicator", () => {
  it("should NOT render indicator by default", () => {
    renderWithRelay({
      Me: () => ({
        unreadConversationCount: 0,
      }),
      Viewer: () => ({
        notificationsConnection: () => ({
          edges: [],
        }),
      }),
    })

    const indicator = screen.queryByTestId("notifications-indicator")
    expect(indicator).not.toBeInTheDocument()
  })

  it("should render indicator when there are unread conversations", () => {
    renderWithRelay({
      Viewer: () => ({
        notificationsConnection: () => ({
          edges: [],
        }),
      }),
      Me: () => ({
        unreadConversationCount: 5,
      }),
    })

    const indicator = screen.getByTestId("notifications-indicator")
    expect(indicator).toBeInTheDocument()
  })

  it("should render indicator when there are unread notifications", () => {
    window.localStorage.removeItem(LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY)
    renderWithRelay({
      Viewer: () => ({
        notificationsConnection: () => ({
          edges: notificationEdges,
        }),
      }),
      Me: () => ({
        unreadConversationCount: 0,
      }),
    })

    const indicator = screen.getByTestId("notifications-indicator")
    expect(indicator).toBeInTheDocument()
  })

  it("should not render indicator when there are only seen notifications", () => {
    window.localStorage.setItem(
      LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY,
      "2023-01-17T16:58:39Z"
    )
    renderWithRelay({
      Viewer: () => ({
        notificationsConnection: () => ({
          edges: [],
        }),
      }),
      Me: () => ({
        unreadConversationCount: 0,
      }),
    })

    const indicator = screen.queryByTestId("notifications-indicator")
    expect(indicator).not.toBeInTheDocument()
    window.localStorage.removeItem(LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY)
  })
})

const notificationEdges = [
  {
    node: {
      publishedAt: "2023-01-17T16:58:39Z",
    },
  },
]
