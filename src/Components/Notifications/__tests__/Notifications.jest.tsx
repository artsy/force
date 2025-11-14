import { Notifications } from "Components/Notifications/Notifications"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { MockBoot } from "DevTools/MockBoot"
import { render } from "DevTools/renderWithMockBoot"
import { act, screen, waitFor } from "@testing-library/react"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: { params: { notificationId: "test-notification-id" } },
  }),
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.unmock("react-relay")

describe("Notifications with pills", () => {
  const environment = createMockEnvironment()

  it("should render pills", async () => {
    render(
      <MockBoot relayEnvironment={environment}>
        <Notifications mode="page" unreadCounts={0} />
      </MockBoot>,
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

    await waitFor(() => {
      expect(screen.getByText("All")).toBeInTheDocument()
      expect(screen.getByText("Alerts")).toBeInTheDocument()
      expect(screen.getByText("Follows")).toBeInTheDocument()
      expect(screen.getByText("Offers")).toBeInTheDocument()
    })
  })
})
