import { fireEvent, screen } from "@testing-library/react"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { NotificationPreferencesQueryRenderer } from "Components/Alert/Components/NotificationPreferences"
import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { Formik } from "formik"
import { createMockEnvironment } from "relay-test-utils"

jest.unmock("react-relay")

describe("NotificationPreferences", () => {
  const environment = createMockEnvironment()

  const TestRenderer = ({ mode }) => {
    return (
      <AlertProvider visible>
        <Formik<AlertFormikValues>
          initialValues={{
            email: false,
            name: "",
            push: false,
            details: "",
          }}
          onSubmit={jest.fn()}
        >
          <NotificationPreferencesQueryRenderer mode={mode} />
        </Formik>
      </AlertProvider>
    )
  }

  beforeEach(() => {
    environment.mockClear()
  })

  describe("when mode is `edit`", () => {
    describe("when custom alert email notifications are enabled", () => {
      it("defaults do not get overwritten.", async () => {
        const { renderWithRelay } = setupTestWrapperTL({
          Component: () => <TestRenderer mode={"edit"} />,
        })

        const { mockResolveLastOperation } = renderWithRelay()

        mockResolveLastOperation({
          FilterArtworksConnection: () => ({
            aggregations: [],
          }),
        })

        mockResolveLastOperation({
          Viewer: () => ({
            notificationPreferences: [
              {
                channel: "email",
                name: "custom_alerts",
                status: "SUBSCRIBED",
              },
            ],
          }),
        })

        const checkboxes = screen.getAllByRole("checkbox")

        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).not.toBeChecked()
      })
    })

    describe("when custom alert email notifications are disabled", () => {
      it("defaults do not get overwritten.", async () => {
        const { renderWithRelay } = setupTestWrapperTL({
          Component: () => <TestRenderer mode={"edit"} />,
        })

        const { mockResolveLastOperation } = renderWithRelay()

        mockResolveLastOperation({
          FilterArtworksConnection: () => ({
            aggregations: [],
          }),
        })

        mockResolveLastOperation({
          Viewer: () => ({
            notificationPreferences: [
              {
                channel: "email",
                name: "custom_alerts",
                status: "NOT_SUBSCRIBED",
              },
            ],
          }),
        })

        await flushPromiseQueue()

        const checkboxes = screen.getAllByRole("checkbox")

        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).not.toBeChecked()
      })

      it("shows warning message when checkbox is checked", async () => {
        const { renderWithRelay } = setupTestWrapperTL({
          Component: () => <TestRenderer mode={"edit"} />,
        })

        const { mockResolveLastOperation } = renderWithRelay()

        mockResolveLastOperation({
          FilterArtworksConnection: () => ({
            aggregations: [],
          }),
        })

        mockResolveLastOperation({
          Viewer: () => ({
            notificationPreferences: [
              {
                channel: "email",
                name: "custom_alerts",
                status: "NOT_SUBSCRIBED",
              },
            ],
          }),
        })

        await flushPromiseQueue()

        expect(
          screen.queryByText("Change your email preferences")
        ).toBeInTheDocument()

        const checkboxes = screen.getAllByRole("checkbox")

        // Check the email checkbox
        fireEvent.click(checkboxes[0])

        expect(
          screen.queryByText("Change your email preferences")
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("when mode is `create`", () => {
    describe("when custom alert email notifications are enabled", () => {
      it("email checkbox is enabled by default", async () => {
        const { renderWithRelay } = setupTestWrapperTL({
          Component: () => <TestRenderer mode={"create"} />,
        })

        const { mockResolveLastOperation } = renderWithRelay()

        mockResolveLastOperation({
          FilterArtworksConnection: () => ({
            aggregations: [],
          }),
        })

        mockResolveLastOperation({
          Viewer: () => ({
            notificationPreferences: [
              {
                channel: "email",
                name: "custom_alerts",
                status: "SUBSCRIBED",
              },
            ],
          }),
        })

        const checkboxes = screen.getAllByRole("checkbox")

        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).not.toBeChecked()
      })
    })

    describe("when custom alert email notifications are disabled", () => {
      it("email checkbox is enabled by default", async () => {
        const { renderWithRelay } = setupTestWrapperTL({
          Component: () => <TestRenderer mode={"create"} />,
        })

        const { mockResolveLastOperation } = renderWithRelay()

        mockResolveLastOperation({
          FilterArtworksConnection: () => ({
            aggregations: [],
          }),
        })

        mockResolveLastOperation({
          Viewer: () => ({
            notificationPreferences: [
              {
                channel: "email",
                name: "custom_alerts",
                status: "NOT_SUBSCRIBED",
              },
            ],
          }),
        })

        await flushPromiseQueue()

        const checkboxes = screen.getAllByRole("checkbox")

        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).not.toBeChecked()
      })

      it("shows warning message only when checkbox is checked", async () => {
        const { renderWithRelay } = setupTestWrapperTL({
          Component: () => <TestRenderer mode={"create"} />,
        })

        const { mockResolveLastOperation } = renderWithRelay()

        mockResolveLastOperation({
          FilterArtworksConnection: () => ({
            aggregations: [],
          }),
        })

        mockResolveLastOperation({
          Viewer: () => ({
            notificationPreferences: [
              {
                channel: "email",
                name: "custom_alerts",
                status: "NOT_SUBSCRIBED",
              },
            ],
          }),
        })

        await flushPromiseQueue()

        expect(
          screen.queryByText("Change your email preferences")
        ).toBeInTheDocument()

        const checkboxes = screen.getAllByRole("checkbox")

        // Check the email checkbox
        fireEvent.click(checkboxes[0])

        await flushPromiseQueue()

        expect(
          screen.queryByText("Change your email preferences")
        ).not.toBeInTheDocument()
      })
    })
  })
})
