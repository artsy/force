import { screen, waitFor } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NavBarMobileMenuNotificationsIndicatorFragmentContainer } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuNotificationsIndicator"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: NavBarMobileMenuNotificationsIndicatorFragmentContainer,
  query: graphql`
    query NavBarMobileMenuNotificationsIndicator_test_Query
      @relay_test_operation {
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
        unreadNotificationsCount: 0,
      }),
    })

    const indicator = screen.queryByLabelText("Unread notifications indicator")
    expect(indicator).not.toBeInTheDocument()
  })

  it("should render indicator when there are unread conversations", async () => {
    renderWithRelay({
      Me: () => ({
        unreadConversationCount: 5,
        unreadNotificationsCount: 0,
      }),
    })

    await waitFor(() => {
      const indicator = screen.getByLabelText("Unread notifications indicator")
      return expect(indicator).toBeInTheDocument()
    })
  })

  it("should render indicator when there are unread notifications", async () => {
    renderWithRelay({
      Me: () => ({
        unreadConversationCount: 0,
        unreadNotificationsCount: 5,
      }),
    })

    await waitFor(() => {
      const indicator = screen.getByLabelText("Unread notifications indicator")
      return expect(indicator).toBeInTheDocument()
    })
  })
})
