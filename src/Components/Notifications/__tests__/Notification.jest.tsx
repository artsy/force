import { waitFor } from "@testing-library/react"
import { NotificationsContextProvider } from "Components/Notifications/Hooks/useNotificationsContext"
import { NotificationQueryRenderer } from "Components/Notifications/Notification"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"

const mockRouterPush = jest.fn()

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { params: { notificationId: "test-id" } },
    router: { push: mockRouterPush },
  })),
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
  describe("when the notification is not supported", () => {
    it("should redirect to the notifications targetHref", async () => {
      renderWithRelay({
        Notification: () => notification,
      })

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith("test-href")
      })
    })
  })
})

const notification = {
  targetHref: "test-href",
}
