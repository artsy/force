import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { NavBarMobileMenuNotificationsIndicatorFragmentContainer } from "../NavBarMobileMenuNotificationsIndicator"

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

  it("should render indicator when there are unread conversations", () => {
    renderWithRelay({
      Me: () => ({
        unreadConversationCount: 5,
        unreadNotificationsCount: 0,
      }),
    })

    const indicator = screen.getByLabelText("Unread notifications indicator")
    expect(indicator).toBeInTheDocument()
  })

  it("should render indicator when there are unread notifications", () => {
    renderWithRelay({
      Me: () => ({
        unreadConversationCount: 0,
        unreadNotificationsCount: 5,
      }),
    })

    const indicator = screen.getByLabelText("Unread notifications indicator")
    expect(indicator).toBeInTheDocument()
  })
})
