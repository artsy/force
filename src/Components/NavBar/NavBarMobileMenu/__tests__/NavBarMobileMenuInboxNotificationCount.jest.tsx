import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NavBarMobileMenuInboxNotificationCountFragmentContainer } from "../NavBarMobileMenuInboxNotificationCount"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: NavBarMobileMenuInboxNotificationCountFragmentContainer,
  query: graphql`
    query NavBarMobileMenuInboxNotificationCount_test_Query
      @relay_test_operation {
      me {
        ...NavBarMobileMenuInboxNotificationCount_me
      }
    }
  `,
})

describe("NavBarMobileMenuInboxNotificationCount", () => {
  it("renders the correct count", () => {
    renderWithRelay({
      Me: () => ({
        unreadConversationCount: 2,
      }),
    })

    expect(screen.getByText("2")).toBeInTheDocument()
  })
})
