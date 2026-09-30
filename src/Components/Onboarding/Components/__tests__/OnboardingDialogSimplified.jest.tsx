import { fireEvent, render, screen } from "@testing-library/react"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { OnboardingDialogSimplified } from "Components/Onboarding/Components/OnboardingDialogSimplified"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { peekOneTapEmailOptInPending } from "Utils/oneTapEmailOptIn"
import { markOnboardingInterestsPending } from "Utils/onboardingInterestsPending"
import { useTracking } from "react-tracking"

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
jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")

const mockUseCountryCode = useCountryCode as jest.Mock
const mockUseUpdateMyUserProfile = useUpdateMyUserProfile as jest.Mock
const mockUseSystemContext = useSystemContext as jest.Mock
const mockSubmit = jest.fn().mockResolvedValue({})
const mockPeek = peekOneTapEmailOptInPending as jest.Mock
const mockMarkInterestsPending = markOnboardingInterestsPending as jest.Mock
const mockUseTracking = useTracking as jest.Mock
const trackingSpy = jest.fn()
const setCustomUserAttribute = jest.fn()
const requestImmediateDataFlush = jest.fn()

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
    mockUseTracking.mockImplementation(() => ({ trackEvent: trackingSpy }))
    mockUseSystemContext.mockReturnValue({ user: { id: "user-123" } })
    ;(window as any).braze = {
      getUser: () => ({ setCustomUserAttribute }),
      requestImmediateDataFlush,
    }
  })

  it("opens directly on the interests step for non One Tap sign-ups", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    expect(
      screen.getByText("What do you want to do on Artsy?"),
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
    fireEvent.click(screen.getByText("Buy art"))
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

    fireEvent.click(screen.getByText("Buy art"))
    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Search engine (Google, etc.)"))
    fireEvent.click(screen.getByText("Continue"))

    expect(mockMarkInterestsPending).toHaveBeenCalledWith(["Buy art"])
    expect(mockOnHide).toHaveBeenCalled()
  })

  describe("the “Other” source option", () => {
    const goToSourceStep = () => {
      mockPeek.mockReturnValue(false)

      render(
        <OnboardingDialogSimplified
          onClose={mockOnClose}
          onHide={mockOnHide}
        />,
      )

      fireEvent.click(screen.getByText("Buy art"))
      fireEvent.click(screen.getByText("Next"))
    }

    it("does not render the text input until Other is selected", () => {
      goToSourceStep()

      expect(screen.queryByPlaceholderText("Tell us more")).toBeNull()

      fireEvent.click(screen.getByText("Other"))

      expect(screen.getByPlaceholderText("Tell us more")).toBeInTheDocument()
    })

    it("keeps Continue disabled while the text input is empty", () => {
      goToSourceStep()

      fireEvent.click(screen.getByText("Other"))

      expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled()
    })

    it("enables Continue once text is entered", () => {
      goToSourceStep()

      fireEvent.click(screen.getByText("Other"))
      fireEvent.change(screen.getByPlaceholderText("Tell us more"), {
        target: { value: "The grapevine" },
      })

      expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled()
    })

    it("ignores whitespace-only text", () => {
      goToSourceStep()

      fireEvent.click(screen.getByText("Other"))
      fireEvent.change(screen.getByPlaceholderText("Tell us more"), {
        target: { value: "   " },
      })

      expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled()
    })

    it("retains the text when switching away and back to 'Other'", () => {
      goToSourceStep()

      fireEvent.click(screen.getByText("Other"))
      fireEvent.change(screen.getByPlaceholderText("Tell us more"), {
        target: { value: "The grapevine" },
      })

      fireEvent.click(screen.getByText("Friend or family"))
      fireEvent.click(screen.getByText("Other"))

      expect(screen.getByPlaceholderText("Tell us more")).toHaveValue(
        "The grapevine",
      )
    })

    it("tracks the typed text rather than the Other label", () => {
      goToSourceStep()

      fireEvent.click(screen.getByText("Other"))
      fireEvent.change(screen.getByPlaceholderText("Tell us more"), {
        target: { value: "  The grapevine  " },
      })
      fireEvent.click(screen.getByText("Continue"))

      expect(trackingSpy).toHaveBeenCalledWith({
        action: "onboardingUserInputData",
        context_module: "onboardingAttribution",
        data_input: "The grapevine",
      })
    })
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
    fireEvent.click(screen.getByText("Buy art"))
    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Search engine (Google, etc.)"))
    fireEvent.click(screen.getByText("Continue"))

    expect(mockSubmit).toHaveBeenCalledWith({ agreedToReceiveEmails: true })
  })

  it("fires startedOnboarding once when the modal opens, not on re-render", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByText("Buy art"))
    fireEvent.click(screen.getByText("Read about art and artists"))

    const startedEvents = trackingSpy.mock.calls.filter(([event]) => {
      return event.action === "startedOnboarding"
    })

    expect(startedEvents).toHaveLength(1)
  })

  it("writes onboarding answers as Braze custom attributes when finished", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByText("Buying art"))
    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Search engine (Google, etc.)"))
    fireEvent.click(screen.getByText("Continue"))

    expect(setCustomUserAttribute).toHaveBeenCalledWith(
      "onboarding_interests",
      ["Buying art"],
    )
    expect(setCustomUserAttribute).toHaveBeenCalledWith(
      "onboarding_source",
      "Search engine (Google, etc.)",
    )
    expect(requestImmediateDataFlush).toHaveBeenCalled()
  })

  it("does not write Braze attributes when the modal is closed", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByLabelText("Close"))

    expect(setCustomUserAttribute).not.toHaveBeenCalled()
  })

  it("fires completedOnboarding when the flow is finished", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByText("Buy art"))
    fireEvent.click(screen.getByText("Next"))
    fireEvent.click(screen.getByText("Search engine (Google, etc.)"))
    fireEvent.click(screen.getByText("Continue"))

    expect(trackingSpy).toHaveBeenCalledWith({ action: "completedOnboarding" })
  })

  it("does not fire completedOnboarding when the modal is closed", () => {
    mockPeek.mockReturnValue(false)

    render(
      <OnboardingDialogSimplified onClose={mockOnClose} onHide={mockOnHide} />,
    )

    fireEvent.click(screen.getByLabelText("Close"))

    expect(trackingSpy).not.toHaveBeenCalledWith({
      action: "completedOnboarding",
    })
  })
})
