import { fireEvent, waitFor, screen, render } from "@testing-library/react"
import { PreferencesApp } from "Apps/Preferences/PreferencesApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useEditNotificationPreferences } from "Apps/Preferences/useEditNotificationPreferences"
import { parseTokenFromRouter } from "Apps/Preferences/PreferencesApp"
import { graphql } from "react-relay"
// eslint-disable-next-line no-unused-vars
import { useToasts } from "@artsy/palette"

jest.mock("Utils/Hooks/useMutation", () => ({
  useMutation: jest.fn(),
}))

jest.mock("@artsy/palette", () => {
  const originalModule = jest.requireActual("@artsy/palette")
  return {
    ...originalModule,
    useToasts: () => ({
      sendToast: jest.fn(),
    }),
  }
})

beforeEach(() => {
  jest.clearAllMocks()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: PreferencesApp,
  query: graphql`
    query PreferencesApp_Test_Query {
      viewer {
        ...PreferencesApp_viewer
      }
    }
  `,
})

describe("PreferencesApp", () => {
  it("renders all checkboxes, labels, and buttons correctly", () => {
    renderWithRelay({
      Viewer: () => ({
        notificationPreferences: [],
      }),
    })

    expect(screen.getByLabelText("Subscribe to all")).toBeInTheDocument()
    expect(screen.getByLabelText("Recommended for You")).toBeInTheDocument()
    expect(screen.getByLabelText("Editorial")).toBeInTheDocument()
    expect(screen.getByLabelText("Guidance on Collecting")).toBeInTheDocument()
    expect(screen.getByLabelText("Custom Alerts")).toBeInTheDocument()
    expect(
      screen.getByLabelText("Offers on Saved Artworks")
    ).toBeInTheDocument()
    expect(screen.getByLabelText("Product Updates")).toBeInTheDocument()
    expect(screen.getByLabelText("Unsubscribe from all")).toBeInTheDocument()
    expect(screen.getByText("Save")).toBeInTheDocument()
  })

  it("'subscribe to all' selects all checkboxes", async () => {
    renderWithRelay({
      Viewer: () => ({
        notificationPreferences: [
          { name: "recommendedByArtsy", status: "UNSUBSCRIBED" },
          { name: "artWorldInsights", status: "UNSUBSCRIBED" },
          { name: "productUpdates", status: "UNSUBSCRIBED" },
          { name: "guidanceOnCollecting", status: "UNSUBSCRIBED" },
          { name: "customAlerts", status: "UNSUBSCRIBED" },
          { name: "partnerOffersOnSaves", status: "UNSUBSCRIBED" },
        ],
      }),
    })

    fireEvent.click(screen.getByLabelText("Subscribe to all"))

    expect(screen.getByLabelText("Recommended for You")).toBeChecked()
    expect(screen.getByLabelText("Editorial")).toBeChecked()
    expect(screen.getByLabelText("Guidance on Collecting")).toBeChecked()
    expect(screen.getByLabelText("Custom Alerts")).toBeChecked()
    expect(screen.getByLabelText("Offers on Saved Artworks")).toBeChecked()
    expect(screen.getByLabelText("Product Updates")).toBeChecked()
  })

  it("'unsubscribe from all' deselects all checkboxes", async () => {
    renderWithRelay({
      Viewer: () => ({
        notificationPreferences: [
          { name: "recommendedByArtsy", status: "SUBSCRIBED" },
          { name: "artWorldInsights", status: "SUBSCRIBED" },
          { name: "productUpdates", status: "SUBSCRIBED" },
          { name: "guidanceOnCollecting", status: "SUBSCRIBED" },
          { name: "customAlerts", status: "SUBSCRIBED" },
          { name: "partnerOffersOnSaves", status: "SUBSCRIBED" },
        ],
      }),
    })

    fireEvent.click(screen.getByLabelText("Unsubscribe from all"))

    expect(screen.getByLabelText("Recommended for You")).not.toBeChecked()
    expect(screen.getByLabelText("Editorial")).not.toBeChecked()
    expect(screen.getByLabelText("Guidance on Collecting")).not.toBeChecked()
    expect(screen.getByLabelText("Custom Alerts")).not.toBeChecked()
    expect(screen.getByLabelText("Offers on Saved Artworks")).not.toBeChecked()
    expect(screen.getByLabelText("Product Updates")).not.toBeChecked()
  })

  it("saves preferences correctly on form submission", async () => {
    const submitMutationMock = jest.fn(() => Promise.resolve())
    ;(useEditNotificationPreferences as jest.Mock).mockReturnValue({
      submitMutation: submitMutationMock,
    })

    renderWithRelay({
      Viewer: () => ({
        notificationPreferences: [
          { name: "recommendedByArtsy", status: "SUBSCRIBED" },
          { name: "artWorldInsights", status: "SUBSCRIBED" },
        ],
      }),
    })

    fireEvent.click(screen.getByLabelText("Recommended for You"))
    fireEvent.click(screen.getByLabelText("Art World Insights"))
    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(submitMutationMock).toHaveBeenCalledWith({
        input: {
          subscriptionGroups: [
            { name: "recommendedByArtsy", status: "UNSUBSCRIBED" },
            { name: "artWorldInsights", status: "UNSUBSCRIBED" },
          ],
        },
      })
    })
  })

  describe("toasts", () => {
    it("displays a success toast on successful form submission", async () => {
      const submitMutationMock = jest.fn(() => Promise.resolve())
      ;(useEditNotificationPreferences as jest.Mock).mockReturnValue({
        submitMutation: submitMutationMock,
      })

      renderWithRelay({
        Viewer: () => ({
          notificationPreferences: [],
        }),
      })

      fireEvent.click(screen.getByText("Save"))
      const { sendToast } = require("@artsy/palette").useToasts()

      await waitFor(() => {
        expect(sendToast).toHaveBeenCalledWith({
          variant: "success",
          message: "Preferences updated successfully.",
        })
      })
    })

    it("displays an error toast on submission failure", async () => {
      const error = new Error("Something went wrong.")
      const submitMutationMock = jest.fn(() => Promise.reject(error))
      ;(useEditNotificationPreferences as jest.Mock).mockReturnValue({
        submitMutation: submitMutationMock,
      })

      renderWithRelay({
        Viewer: () => ({
          notificationPreferences: [],
        }),
      })

      fireEvent.click(screen.getByText("Save"))
      const { sendToast } = require("@artsy/palette").useToasts()

      await waitFor(() => {
        expect(sendToast).toHaveBeenCalledWith({
          variant: "error",
          message: "Something went wrong.",
          description: error.message,
        })
      })
    })
  })

  describe("useEditNotificationPreferences", () => {
    it("calls the mutation with correct variables on form submission", async () => {
      const submitMutationMock = jest.fn(() => Promise.resolve())
      ;(useEditNotificationPreferences as jest.Mock).mockReturnValue({
        submitMutation: submitMutationMock,
      })

      renderWithRelay({
        Viewer: () => ({
          notificationPreferences: [
            {
              name: "recommendedByArtsy",
              status: "SUBSCRIBED",
            },
            {
              name: "artWorldInsights",
              status: "UNSUBSCRIBED",
            },
            {
              name: "productUpdates",
              status: "UNSUBSCRIBED",
            },
          ],
        }),
      })

      fireEvent.click(screen.getByLabelText("Recommended for You"))
      fireEvent.click(screen.getByLabelText("Art World Insights"))
      fireEvent.click(screen.getByText("Save"))

      const expectedInput = {
        subscriptionGroups: [
          {
            name: "recommendedByArtsy",
            status: "UNSUBSCRIBED",
          },
          {
            name: "artWorldInsights",
            status: "SUBSCRIBED",
          },
        ],
      }

      await waitFor(() => {
        expect(submitMutationMock).toHaveBeenCalledWith(expectedInput)
      })
    })
  })

  describe("parseTokenFromRouter", () => {
    it("returns an empty string without a query", () => {
      const router = {}
      const authenticationToken = parseTokenFromRouter(router)
      expect(authenticationToken).toEqual("")
    })

    it("returns the token from the query", () => {
      const token = "abcd1234"
      const query = { authentication_token: token }
      const router = { match: { location: { query } } }
      const authenticationToken = parseTokenFromRouter(router)
      expect(authenticationToken).toEqual(token)
    })

    it("returns the token from the query and cleans up any malformed values", () => {
      const token = "abcd1234"
      const query = { authentication_token: `${token}?foo=bar` }
      const router = { match: { location: { query } } }
      const authenticationToken = parseTokenFromRouter(router)
      expect(authenticationToken).toEqual(token)
    })
  })
})
