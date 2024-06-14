import { FlashBannerFragmentContainer } from "Components/FlashBanner"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useRouter } from "System/Hooks/useRouter"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen, fireEvent, act } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter")

const { renderWithRelay } = setupTestWrapperTL({
  Component: FlashBannerFragmentContainer,
  query: graphql`
    query FlashBanner_Test_Query @relay_test_operation {
      me {
        ...FlashBanner_me
      }
    }
  `,
})

describe("FlashBanner", () => {
  const trackEvent = jest.fn()
  const mockUseTracking = useTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
    mockUseRouter.mockImplementation(() => ({
      match: { location: { query: {} } },
    }))
  })

  afterAll(() => {
    mockUseTracking.mockReset()
    mockUseRouter.mockReset()
    trackEvent.mockReset()
  })

  it("renders nothing if no content is applicable", () => {
    renderWithRelay()

    expect(screen.queryByTestId("flashMessage")).not.toBeInTheDocument()
  })

  it("renders a confirmation message if the `confirmed` code is present in the query string", () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: { location: { query: { flash_message: "confirmed" } } },
    }))

    renderWithRelay()

    expect(
      screen.getByText("Your email has been confirmed.")
    ).toBeInTheDocument()
  })

  it("renders an already confirmed message if the `already_confirmed` code is present in the query string", () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: { location: { query: { flash_message: "already_confirmed" } } },
    }))

    renderWithRelay()

    expect(
      screen.getByText("You have already confirmed your email.")
    ).toBeInTheDocument()
  })

  it("renders an invalid token message if the `invalid_token` code is present in the query string", () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: { location: { query: { flash_message: "invalid_token" } } },
    }))

    renderWithRelay()

    expect(
      screen.getByText(
        "An error has occurred. Please contact support@artsy.net."
      )
    ).toBeInTheDocument()
  })

  it("renders a blank token message if the `blank_token` code is present in the query string", () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: { location: { query: { flash_message: "blank_token" } } },
    }))

    renderWithRelay()

    expect(
      screen.getByText(
        "An error has occurred. Please contact support@artsy.net."
      )
    ).toBeInTheDocument()
  })

  it("renders an expired token message if the `expired_token` code is present in the query string", () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: { location: { query: { flash_message: "expired_token" } } },
    }))

    renderWithRelay()

    expect(screen.getByText("Link expired.")).toBeInTheDocument()
  })

  it("renders a request confirmation message if the `canRequestEmailConfirmation` flag is true on the logged in user", () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: { location: { query: {} } },
    }))

    renderWithRelay({
      Me: () => ({ canRequestEmailConfirmation: true }),
    })

    expect(
      screen.getByText("Please verify your email address")
    ).toBeInTheDocument()
  })

  // TODO: Move these specs into component specific specs
  describe("Email confirmation link expired", () => {
    it("allows the user to click to re-trigger the email confirmation message", () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        match: { location: { query: { flash_message: "expired_token" } } },
      }))

      renderWithRelay()

      expect(screen.queryByText("Link expired.")).toBeInTheDocument()

      act(() => {
        fireEvent.click(screen.getByText("Resend verification email"))
      })

      expect(trackEvent).toHaveBeenLastCalledWith({
        action_type: "Click",
        subject: "Email Confirmation Link Expired",
      })

      // TODO: Requires mocking of the mutation
      // expect(screen.getByText("An email has been sent to example@example.com")).toBeInTheDocument()
    })

    it.skip("displays an error message if the mutation fails", () => {
      // TODO: Requires mocking of the mutation
    })
  })

  // TODO: Move these specs into component specific specs
  describe("Email Confirmation CTA", () => {
    it("allows the user to request email confirmation", () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        match: { location: { query: {} } },
      }))

      renderWithRelay({
        Me: () => ({ canRequestEmailConfirmation: true }),
      })

      expect(
        screen.getByText("Please verify your email address")
      ).toBeInTheDocument()

      act(() => {
        fireEvent.click(screen.getByText("Send email"))
      })

      expect(trackEvent).toHaveBeenLastCalledWith({
        action_type: "Click",
        subject: "Email Confirmation CTA",
      })

      // TODO: Requires mocking of the mutation
      // expect(screen.getByText("An email has been sent to example@example.com")).toBeInTheDocument()
    })

    it.skip("displays an error message if the mutation fails", () => {
      // TODO: Requires mocking of the mutation
    })
  })
})
