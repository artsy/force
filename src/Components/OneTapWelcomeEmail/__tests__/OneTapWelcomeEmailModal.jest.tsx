import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { OneTapWelcomeEmailModal } from "Components/OneTapWelcomeEmail/OneTapWelcomeEmailModal"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"

jest.mock("Components/AuthDialog/Hooks/useCountryCode", () => ({
  useCountryCode: jest.fn(),
}))

jest.mock("Utils/Hooks/Mutations/useUpdateMyUserProfile", () => ({
  useUpdateMyUserProfile: jest.fn(),
}))

const mockUseCountryCode = useCountryCode as jest.Mock
const mockUseUpdateMyUserProfile = useUpdateMyUserProfile as jest.Mock

describe("OneTapWelcomeEmailModal", () => {
  const mockSubmit = jest.fn().mockResolvedValue({})
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseUpdateMyUserProfile.mockReturnValue({
      submitUpdateMyUserProfile: mockSubmit,
    })
    mockUseCountryCode.mockReturnValue({
      isAutomaticallySubscribed: true,
      loading: false,
    })
  })

  const checkbox = () =>
    screen.getByTestId("one-tap-welcome-email-checkbox") as HTMLInputElement

  it("renders the welcome copy and checkbox label", () => {
    render(<OneTapWelcomeEmailModal onClose={mockOnClose} />)

    expect(screen.getByText("Welcome to Artsy")).toBeInTheDocument()
    expect(
      screen.getByText(/Subscribe to email to hear about our products/),
    ).toBeInTheDocument()
  })

  it("preselects the checkbox for non-GDPR countries (opt-out)", () => {
    mockUseCountryCode.mockReturnValue({
      isAutomaticallySubscribed: true,
      loading: false,
    })

    render(<OneTapWelcomeEmailModal onClose={mockOnClose} />)

    expect(checkbox()).toBeChecked()
  })

  it("leaves the checkbox unselected for GDPR countries (opt-in)", () => {
    mockUseCountryCode.mockReturnValue({
      isAutomaticallySubscribed: false,
      loading: false,
    })

    render(<OneTapWelcomeEmailModal onClose={mockOnClose} />)

    expect(checkbox()).not.toBeChecked()
  })

  it("opts the user in when Continue is clicked with the box checked", async () => {
    render(<OneTapWelcomeEmailModal onClose={mockOnClose} />)

    fireEvent.click(screen.getByTestId("one-tap-welcome-email-continue"))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ agreedToReceiveEmails: true })
    })
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  it("does not write consent when the box is unchecked, but still closes", async () => {
    mockUseCountryCode.mockReturnValue({
      isAutomaticallySubscribed: false,
      loading: false,
    })

    render(<OneTapWelcomeEmailModal onClose={mockOnClose} />)

    fireEvent.click(screen.getByTestId("one-tap-welcome-email-continue"))

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it("closes even if the consent write fails", async () => {
    mockSubmit.mockRejectedValueOnce(new Error("network"))
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {})

    render(<OneTapWelcomeEmailModal onClose={mockOnClose} />)

    fireEvent.click(screen.getByTestId("one-tap-welcome-email-continue"))

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })

    consoleError.mockRestore()
  })
})
