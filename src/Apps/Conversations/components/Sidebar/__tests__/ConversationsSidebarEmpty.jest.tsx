import { ConversationsSidebarEmpty } from "Apps/Conversations/components/Sidebar/ConversationsSidebarEmpty"
import { render, screen } from "@testing-library/react"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: {},
      },
      params: {
        conversationId: "some-id",
      },
    },
  }),
}))

describe("ConversationsSidebarEmpty", () => {
  it("renders given no filter", () => {
    render(<ConversationsSidebarEmpty />)

    expect(
      screen.getByText("All conversations with galleries will show here."),
    ).toBeInTheDocument()
  })
})
