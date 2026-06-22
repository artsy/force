import { render, screen } from "@testing-library/react"
import { ConversationEventRow } from "Apps/Conversations/components/Message/ConversationEventRow"

const StubIcon = ({ fill }: { fill?: string }) => (
  <svg data-testid="stub-icon" data-fill={fill} />
)

describe("ConversationEventRow", () => {
  it("renders the message", () => {
    render(
      <ConversationEventRow
        Icon={StubIcon}
        iconFill="mono100"
        message="You received an offer for $450"
        textColor="mono100"
      />,
    )

    expect(
      screen.getByText("You received an offer for $450"),
    ).toBeInTheDocument()
  })

  it("renders the icon with the provided fill", () => {
    render(
      <ConversationEventRow
        Icon={StubIcon}
        iconFill="orange150"
        message="You received a counteroffer for $450"
        textColor="orange150"
      />,
    )

    expect(screen.getByTestId("stub-icon")).toHaveAttribute(
      "data-fill",
      "orange150",
    )
  })
})
