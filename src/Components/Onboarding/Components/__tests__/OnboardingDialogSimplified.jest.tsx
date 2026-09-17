import { fireEvent, render, screen } from "@testing-library/react"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { OnboardingDialogSimplified } from "Components/Onboarding/Components/OnboardingDialogSimplified"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import {
  clearOneTapEmailOptInPending,
  peekOneTapEmailOptInPending,
} from "Utils/oneTapEmailOptIn"
import { markOnboardingInterestsPending } from "Utils/onboardingInterestsPending"

const mockOnClose = jest.fn()
const mockOnHide = jest.fn()

jest.mock("Components/Onboarding/Components/OnboardingModal", () => ({
  OnboardingModal: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))
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
const mockPeek = peekOneTapEmailOptInPending as jest.Mock
const mockMarkInterestsPending = markOnboardingInterestsPending as jest.Mock

describe("OnboardingDialogSimplified", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseUpdateMyUserProfile.mockReturnValue({
      submitUpdateMyUserProfile: jest.fn().mockResolvedValue({}),
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

    expect(screen.getByText("Welcome to Artsy")).toBeInTheDocument()
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

  it("calls markOnboardingInterestsPending and onHide when Finish is clicked", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByText("Buying art"))
    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Search engine"))
    fireEvent.click(screen.getByText("Finish"))

    expect(mockMarkInterestsPending).toHaveBeenCalledWith(["Buying art"])
    expect(mockOnHide).toHaveBeenCalled()
  })
})
