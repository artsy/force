import { type AuthContextModule, ContextModule } from "@artsy/cohesion"
import { LogInPrompt } from "Apps/Components/LogInPrompt"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { mount } from "enzyme"

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: false })
})

describe("LogInPrompt", () => {
  const getWrapper = () => {
    return mount(
      <LogInPrompt
        contextModule={
          ContextModule.auctionLotsEndingSoonRail ||
          (ContextModule.newWorksForYouRail as AuthContextModule)
        }
      />,
    )
  }

  it("displays expected messaging for logged out users", () => {
    const wrapper = getWrapper()

    expect(wrapper.text()).toContain("Log in")
    expect(wrapper.text()).toContain("to see your personalized recommendations")
  })
})
