import { fireEvent, render, screen } from "@testing-library/react"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { OnboardingDialogSimplified } from "Components/Onboarding/Components/OnboardingDialogSimplified"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { peekOneTapEmailOptInPending } from "Utils/oneTapEmailOptIn"
import { markOnboardingInterestsPending } from "Utils/onboardingInterestsPending"

const mockOnClose = jest.fn()
const mockOnHide = jest.fn()

jest.mock("Components/AuthDialog/Hooks/useCountryCode", () => ({
  useCountryCode: jest.fn(),
}))
jest.mock("Utils/Hooks/Mutations/useUpdateMyUserProfile", () => ({
  useUpdateMyUserProfile: jest.fn(),
}))
jest.mock("Utils/oneTapEmailOptIn", () => ({
  peekOneTapEmailOptInPending: jest.fn(),
  clearOneTapEmailOptInPending: jest.fn(),
}))
jest.mock("Utils/onboardingInterestsPending", () => ({
  ...jest.requireActual("Utils/onboardingInterestsPending"),
  markOnboardingInterestsPending: jest.fn(),
}))

const mockUseCountryCode = useCountryCode as jest.Mock
const mockUseUpdateMyUserProfile = useUpdateMyUserProfile as jest.Mock
const mockSubmit = jest.fn().mockResolvedValue({})
const mockPeek = peekOneTapEmailOptInPending as jest.Mock
const mockMarkInterestsPending = markOnboardingInterestsPending as jest.Mock

describe("OnboardingDialogSimplified", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSubmit.mockResolvedValue({})
    mockUseUpdateMyUserProfile.mockReturnValue({
      submitUpdateMyUserProfile: mockSubmit,
    })
    mockUseCountryCode.mockReturnValue({
      isAutomaticallySubscribed: true,
      loading: false,
    })
  })

  it("opens directly on the interests step for non One Tap sign-ups", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    expect(
      screen.getByText("What are you most interested in?"),
    ).toBeInTheDocument()
  })

  it("opens on the welcome step for a pending One Tap sign-up", () => {
    mockPeek.mockReturnValue(true)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    expect(screen.getByText("Welcome to Artsy!")).toBeInTheDocument()
  })

  it("advances welcome -> interests -> source for a One Tap sign-up", () => {
    mockPeek.mockReturnValue(true)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Buying art"))
    fireEvent.click(screen.getByText("Next"))

    expect(
      screen.getByText("How did you hear about Artsy?"),
    ).toBeInTheDocument()
  })

  it("calls markOnboardingInterestsPending and onHide when Continue is clicked", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByText("Buying art"))
    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Search engine (Google, etc.)"))
    fireEvent.click(screen.getByText("Continue"))

    expect(mockMarkInterestsPending).toHaveBeenCalledWith(["Buying art"])
    expect(mockOnHide).toHaveBeenCalled()
  })

  it("does not persist the email opt-in when advancing past the welcome step", () => {
    mockPeek.mockReturnValue(true)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByText("Next"))

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it("persists the email opt-in only when the flow is finished", () => {
    mockPeek.mockReturnValue(true)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Buying art"))
    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Search engine (Google, etc.)"))
    fireEvent.click(screen.getByText("Continue"))

    expect(mockSubmit).toHaveBeenCalledWith({ agreedToReceiveEmails: true })
  })
})
