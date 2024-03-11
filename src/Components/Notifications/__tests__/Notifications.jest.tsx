import { act, screen } from "@testing-library/react"
import { Notifications } from "Components/Notifications/Notifications"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { render } from "DevTools/renderWithMockBoot"
import { useFeatureFlag } from "System/useFeatureFlag"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))
jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({
    match: { params: { notificationId: "test-notification-id" } },
  }),
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

  it("should render pills", async () => {
    render(
      <MockBoot relayEnvironment={environment}>
        <Notifications mode="page" unreadCounts={0} />
      </MockBoot>
    )

    act(() => {
      environment.mock.resolveMostRecentOperation(operation => {
        return MockPayloadGenerator.generate(operation, {})
      })
      environment.mock.resolveMostRecentOperation(operation => {
        return MockPayloadGenerator.generate(operation, {})
      })
      environment.mock.resolveMostRecentOperation(operation => {
        return MockPayloadGenerator.generate(operation, {})
      })
    })

    await flushPromiseQueue()

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
    expect(screen.getByText("Follows")).toBeInTheDocument()
    expect(screen.getByText("Offers")).toBeInTheDocument()
  })
})
