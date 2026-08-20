import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { OnboardingWelcome } from "Components/Onboarding/Views/OnboardingWelcome"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import {
  clearOneTapEmailOptInPending,
  peekOneTapEmailOptInPending,
} from "Utils/oneTapEmailOptIn"

const mockNext = jest.fn()
const mockOnClose = jest.fn()
const mockHandleNext = jest.fn()

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({ user: { name: "Ada" } }),
}))
jest.mock("Components/Onboarding/Hooks/useOnboardingContext", () => ({
  useOnboardingContext: () => ({ next: mockNext, onClose: mockOnClose }),
}))
jest.mock("Components/Onboarding/Hooks/useOnboardingFadeTransition", () => ({
  useOnboardingFadeTransition: () => ({
    register: () => undefined,
    handleNext: mockHandleNext,
    loading: false,
  }),
}))
jest.mock("Components/Onboarding/Hooks/useOnboardingTracking", () => ({
  useOnboardingTracking: () => ({ userStartedOnboarding: jest.fn() }),
}))
jest.mock(
  "Components/Onboarding/Components/OnboardingWelcomeAnimatedPanel",
  () => ({
    OnboardingWelcomeAnimatedPanel: () => null,
  }),
)
jest.mock("Components/SplitLayout", () => ({
  SplitLayout: ({ right }: { right: React.ReactNode }) => <div>{right}</div>,
}))
jest.mock("System/Components/RouterLink", () => ({
  RouterLink: "a",
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

const mockUseCountryCode = useCountryCode as jest.Mock
const mockUseUpdateMyUserProfile = useUpdateMyUserProfile as jest.Mock
const mockPeek = peekOneTapEmailOptInPending as jest.Mock
const mockClear = clearOneTapEmailOptInPending as jest.Mock
const mockSubmit = jest.fn().mockResolvedValue({})

describe("OnboardingWelcome email opt-in", () => {
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

  const checkbox = () =>
    screen.getByTestId("onboarding-email-optin") as HTMLInputElement

  it("does not show the checkbox for non One Tap sign-ups", () => {
    mockPeek.mockReturnValue(false)
    render(<OnboardingWelcome />)
    expect(screen.queryByTestId("onboarding-email-optin")).toBeNull()
  })

  it("shows the checkbox for a pending One Tap sign-up", () => {
    mockPeek.mockReturnValue(true)
    render(<OnboardingWelcome />)
    expect(screen.getByTestId("onboarding-email-optin")).toBeInTheDocument()
  })

  it("preselects for non-GDPR and leaves unchecked for GDPR", () => {
    mockPeek.mockReturnValue(true)

    const { unmount } = render(<OnboardingWelcome />)
    expect(checkbox()).toBeChecked()
    unmount()

    mockUseCountryCode.mockReturnValue({
      isAutomaticallySubscribed: false,
      loading: false,
    })
    render(<OnboardingWelcome />)
    expect(checkbox()).not.toBeChecked()
  })

  it("writes consent and clears the flag on Get Started when checked", async () => {
    mockPeek.mockReturnValue(true)
    render(<OnboardingWelcome />)

    fireEvent.click(screen.getByText("Get Started"))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ agreedToReceiveEmails: true })
    })
    expect(mockClear).toHaveBeenCalled()
    expect(mockHandleNext).toHaveBeenCalled()
  })

  it("clears the flag and skips the write on Skip when unchecked", async () => {
    mockPeek.mockReturnValue(true)
    mockUseCountryCode.mockReturnValue({
      isAutomaticallySubscribed: false,
      loading: false,
    })
    render(<OnboardingWelcome />)

    fireEvent.click(screen.getByText("Skip"))

    expect(mockSubmit).not.toHaveBeenCalled()
    expect(mockClear).toHaveBeenCalled()
    expect(mockOnClose).toHaveBeenCalled()
  })
})
