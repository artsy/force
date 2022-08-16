import { useOnboardingTracking } from "../useOnboardingTracking"
import { renderHook } from "@testing-library/react-hooks"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("useOnboardingTracking", () => {
  const mockUseTracking = useTracking as jest.Mock
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

  it("tracks userCompletedOnboarding", () => {
    setupHook().userCompletedOnboarding()

    expect(trackingSpy).toBeCalledWith({ action: "completedOnboarding" })
  })
})
