import { setBrazeCustomAttributes } from "Server/analytics/setBrazeCustomAttributes"

describe("setBrazeCustomAttributes", () => {
  const setCustomUserAttribute = jest.fn()
  const requestImmediateDataFlush = jest.fn()
  const getUser = jest.fn()

  const setBrazeReady = () => {
    getUser.mockReturnValue({ setCustomUserAttribute })
    ;(window as any).braze = { getUser, requestImmediateDataFlush }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    delete (window as any).braze
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("writes each attribute to the Braze user and flushes immediately", () => {
    setBrazeReady()

    setBrazeCustomAttributes({
      onboarding_interests: ["Buying art"],
      onboarding_source: "Search engine (Google, etc.)",
    })

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

  it("omits empty string and empty array values", () => {
    setBrazeReady()

    setBrazeCustomAttributes({
      onboarding_interests: [],
      onboarding_source: "",
    })

    expect(setCustomUserAttribute).not.toHaveBeenCalled()
    expect(requestImmediateDataFlush).not.toHaveBeenCalled()
  })

  it("does nothing when there are no attributes to write", () => {
    setBrazeReady()

    setBrazeCustomAttributes({})

    expect(getUser).not.toHaveBeenCalled()
  })

  it("waits for the Braze SDK to load before writing", () => {
    setBrazeCustomAttributes({ onboarding_source: "Friend or family" })

    expect(setCustomUserAttribute).not.toHaveBeenCalled()

    setBrazeReady()
    jest.advanceTimersByTime(100)

    expect(setCustomUserAttribute).toHaveBeenCalledWith(
      "onboarding_source",
      "Friend or family",
    )
  })

  it("gives up after the maximum number of attempts", () => {
    setBrazeCustomAttributes({ onboarding_source: "Friend or family" })

    jest.advanceTimersByTime(100 * 25)

    expect(setCustomUserAttribute).not.toHaveBeenCalled()
  })
})
