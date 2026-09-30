import { renderHook } from "@testing-library/react-hooks"
import { setBrazeCustomAttributes } from "Server/analytics/setBrazeCustomAttributes"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { useOnboardingTracking } from "../useOnboardingTracking"

jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")
jest.mock("Server/analytics/setBrazeCustomAttributes")

describe("useOnboardingTracking", () => {
  const mockUseTracking = useTracking as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock
  const mockSetBrazeCustomAttributes = setBrazeCustomAttributes as jest.Mock
  const trackingSpy = jest.fn()

  const setupHook = () => {
    const { result } = renderHook(() => useOnboardingTracking())

    if (result.error) {
      throw result.error
    }

    const tracking = result.current
    return tracking
  }

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  beforeEach(() => {
    mockUseSystemContext.mockReturnValue({ user: { id: "user-123" } })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("tracks userStartedOnboarding", () => {
    setupHook().userStartedOnboarding()

    expect(trackingSpy).toBeCalledWith({ action: "startedOnboarding" })
  })

  it("trackQuestionOne", () => {
    setupHook().trackQuestionOne("No, I'm just starting out")

    expect(trackingSpy).toBeCalledWith({
      action: "onboardingUserInputData",
      context_module: "onboardingCollectorLevel",
      data_input: "No, I'm just starting out",
    })
  })

  it("trackQuestionTwo", () => {
    setupHook().trackQuestionTwo([
      "Developing my art tastes",
      "Finding my next great investment",
    ])

    expect(trackingSpy).toBeCalledWith({
      action: "onboardingUserInputData",
      context_module: "onboardingInterests",
      data_input: [
        "Developing my art tastes",
        "Finding my next great investment",
      ],
    })
  })

  it("trackQuestionThree", () => {
    setupHook().trackQuestionThree("Artists I want to collect")

    expect(trackingSpy).toBeCalledWith({
      action: "onboardingUserInputData",
      context_module: "onboardingActivity",
      data_input: "Artists I want to collect",
    })
  })

  it("trackInterests", () => {
    setupHook().trackInterests(["Buy art", "Browse art for inspiration"])

    expect(trackingSpy).toBeCalledWith({
      action: "onboardingUserInputData",
      context_module: "onboardingInterests",
      data_input: '["Buy art","Browse art for inspiration"]',
    })
  })

  it("trackSource", () => {
    setupHook().trackSource("Search engine (Google, etc.)")

    expect(trackingSpy).toBeCalledWith({
      action: "onboardingUserInputData",
      context_module: "onboardingAttribution",
      data_input: "Search engine (Google, etc.)",
    })
  })

  it("tracks subscribedToEmail", () => {
    setupHook().trackSubscribedToEmail()

    expect(trackingSpy).toBeCalledWith({ action: "subscribedToEmail" })
  })

  it("tracks userCompletedOnboarding", () => {
    setupHook().userCompletedOnboarding()

    expect(trackingSpy).toBeCalledWith({ action: "completedOnboarding" })
  })

  describe("setBrazeOnboardingAttributes", () => {
    it("writes interests and source as Braze custom attributes", () => {
      setupHook().setBrazeOnboardingAttributes({
        interests: ["Buying art", "Reading about art and artists"],
        source: "Search engine (Google, etc.)",
      })

      expect(mockSetBrazeCustomAttributes).toBeCalledWith({
        onboarding_interests: ["Buying art", "Reading about art and artists"],
        onboarding_source: "Search engine (Google, etc.)",
      })
    })

    it("does not write attributes when there is no logged-in user", () => {
      mockUseSystemContext.mockReturnValue({ user: null })

      setupHook().setBrazeOnboardingAttributes({
        interests: ["Buying art"],
        source: "Search engine (Google, etc.)",
      })

      expect(mockSetBrazeCustomAttributes).not.toBeCalled()
    })
  })
})
