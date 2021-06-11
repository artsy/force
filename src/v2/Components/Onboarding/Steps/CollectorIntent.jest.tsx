import React from "react"
import { mount } from "enzyme"
import CollectorIntent from "./CollectorIntent"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.mock("v2/System/Analytics/useTracking")

describe("CollectorIntent", () => {
  const mockRelay = {}
  const mockRouter = {
    push: jest.fn(),
  }
  const mockUpdateProfile = jest.fn()
  const mockTrackEvent = jest.fn()
  const mockTracking = useTracking as jest.Mock
  mockTracking.mockImplementation(() => ({ trackEvent: mockTrackEvent }))
  const props = {
    router: mockRouter,
    relayEnvironment: mockRelay,
    updateProfile: mockUpdateProfile,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("can render", () => {
    const wrapper = mount(<CollectorIntent {...props} />)
    expect(wrapper.find("ProgressIndicator")).toHaveLength(1)
    expect(wrapper.find("Layout")).toHaveLength(1)
  })

  describe("with no selected intents", () => {
    it("skips the update and tracking but does advance to next step", () => {
      const wrapper = mount(<CollectorIntent {...props} />)
      wrapper.find("NextButton").simulate("click")
      expect(mockTrackEvent).not.toHaveBeenCalled()
      expect(mockUpdateProfile).not.toHaveBeenCalled()
      expect(mockRouter.push).toHaveBeenCalledWith("/personalize/artists")
    })
  })

  describe("with some selected intents", () => {
    it("sends the update and tracks and also advances to next step", () => {
      const wrapper = mount(<CollectorIntent {...props} />)
      wrapper.find("Link").first().simulate("click")
      wrapper.find("Link").last().simulate("click")
      wrapper.find("NextButton").simulate("click")
      const expectedIntents = ["BUY_ART_AND_DESIGN", "READ_ART_MARKET_NEWS"]
      expect(mockTrackEvent).toHaveBeenCalled()
      expect(mockUpdateProfile).toHaveBeenCalledWith(expectedIntents, mockRelay)
      expect(mockRouter.push).toHaveBeenCalledWith("/personalize/artists")
    })
  })

  describe("button state", () => {
    it("starts out with default state", () => {
      const wrapper = mount(<CollectorIntent {...props} />)
      const buttonState = wrapper.find("Layout").prop("buttonState")
      expect(buttonState).toEqual(MultiButtonState.Default)
    })

    it("uses highlighted state after an option is selected", () => {
      const wrapper = mount(<CollectorIntent {...props} />)
      wrapper.find("Link").first().simulate("click")
      const buttonState = wrapper.find("Layout").prop("buttonState")
      expect(buttonState).toEqual(MultiButtonState.Highlighted)
    })
  })
})
