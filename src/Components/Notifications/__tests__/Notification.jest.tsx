import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { NotificationQueryRenderer } from "Components/Notifications/Notification"
import { NotificationsContextProvider } from "Components/Notifications/useNotificationsContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.unmock("react-relay")
jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({
    match: { params: { notificationId: "test-id" } },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: () => {
    return (
      <NotificationsContextProvider>
        <NotificationQueryRenderer />
      </NotificationsContextProvider>
    )
  },
})

describe("Notification", () => {
  it("should render notification items", async () => {
    renderWithRelay({
      Notification: () => notification,
    })

    await flushPromiseQueue()

    expect(screen.getByText("Notification One")).toBeInTheDocument()
  })
})

const notification = {
  title: "Notification One",
}
