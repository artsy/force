import { LogInPrompt } from "Apps/Components/LogInPrompt"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { type AuthContextModule, ContextModule } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: false })
})

describe("LogInPrompt", () => {
  const renderComponent = () => {
    return render(
      <LogInPrompt
        contextModule={
          ContextModule.auctionLotsEndingSoonRail ||
          (ContextModule.newWorksForYouRail as AuthContextModule)
        }
      />,
    )
  }

  it("displays expected messaging for logged out users", () => {
    renderComponent()

    expect(screen.getByText("Log in")).toBeInTheDocument()
    expect(
      screen.getByText("to see your personalized recommendations."),
    ).toBeInTheDocument()
  })
})
