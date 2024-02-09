import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { PreferencesApp } from "Apps/Preferences/PreferencesApp"
import { useEditNotificationPreferences } from "Apps/Preferences/useEditNotificationPreferences"
import { parseTokenFromRouter } from "Apps/Preferences/PreferencesApp"

jest.mock("Utils/Hooks/useMutation", () => ({
  useMutation: jest.fn(),
}))

describe("PreferencesApp", () => {
  describe("authentication", () => {
    // correct view is rendered based on auth status
    // initial preferences are fetched and set correctly
  })

  describe("form rendering", () => {
    // all form elements render correctly (checkboxes, labels, buttons, etc)
  })

  describe("user interactions", () => {
    // form UI w/ individual checkboxes
    // "subscribe to all" and "unsubscribe from all" work as expected
  })

  describe("checkboxes", () => {
    // checking/unchecking each checkbox updates form state correctly
  })

  describe("form submission", () => {
    // submitting form saves preferences correctly
    // save button click event and form submit event both work
  })

  describe("toasts", () => {
    // success toasts displayed correctly on form submit
    // depending on success or error state
  })

  describe("error handling", () => {
    // sad path error states are handled correctly
    // disabled buttons, error toasts, etc
  })

  describe("useEditNotificationPreferences", () => {
    it("calls the mutation with the correct variables on form submission", async () => {
      const submitMutationMock = jest.fn(() => Promise.resolve())
      ;(useEditNotificationPreferences as jest.Mock).mockReturnValue({
        submitMutation: submitMutationMock,
      })

      const viewerMock = {
        notificationPreferences: [
          {
            name: "recommendedByArtsy",
            status: "SUBSCRIBED",
          },
          {
            name: "artWorldInsights",
            status: "SUBSCRIBED",
          },
          {
            name: "productUpdates",
            status: "UNSUBSCRIBED",
          },
        ],
      }

      // render(<PreferencesApp viewer={viewerMock} />)

      fireEvent.click(screen.getByLabelText("Recommended for You"))
      fireEvent.click(screen.getByText("Save"))

      const input = {
        // input data
      }

      await waitFor(() => {
        expect(submitMutationMock).toHaveBeenCalledWith({
          input,
        })
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
