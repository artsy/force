import { screen } from "@testing-library/react"
import { Notifications } from "Components/Notifications/Notifications"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { render } from "DevTools/renderWithMockBoot"
import { useFeatureFlag } from "System/useFeatureFlag"
import { createMockEnvironment } from "relay-test-utils"

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.unmock("react-relay")

describe("Notifications", () => {
  beforeEach(() => {
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
  })

  it("should render tabs", () => {
    render(<Notifications mode="page" unreadCounts={0} />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
  })

  it("should display new notifications message", () => {
    render(<Notifications mode="page" unreadCounts={5} />)

    expect(screen.getByText("New notifications")).toBeInTheDocument()
  })
})

describe("Notifications with pills", () => {
  const environment = createMockEnvironment()

  beforeEach(() => {
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => true)
  })

  // TODO: Bring back this test!
  it.skip("should render pills", async () => {
    render(
      <MockBoot relayEnvironment={environment}>
        <Notifications mode="page" unreadCounts={0} />
      </MockBoot>
    )

    await flushPromiseQueue()

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
    expect(screen.getByText("Following")).toBeInTheDocument()
  })
})
