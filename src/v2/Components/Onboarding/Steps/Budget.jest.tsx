import React from "react"
import { mount } from "enzyme"
import Budget from "./Budget"
import { useTracking } from "v2/Artsy/Analytics/useTracking"

jest.mock("v2/Artsy/Analytics/useTracking")

jest.useFakeTimers()

describe("Budget", () => {
  const mockRelay = {}
  const mockTrackEvent = jest.fn()
  const mockTracking = useTracking as jest.Mock
  mockTracking.mockImplementation(() => ({ trackEvent: mockTrackEvent }))
  const mockUpdateProfile = jest.fn()

  const defaultProps = {
    relayEnvironment: mockRelay,
    updateUserProfile: mockUpdateProfile,
  }

  beforeEach(() => {
    window.location.assign = jest.fn()
    jest.clearAllMocks()
  })

  it("can render", () => {
    const wrapper = mount(<Budget {...defaultProps} />)

    expect(wrapper.find("ProgressIndicator")).toHaveLength(1)
    expect(wrapper.find("Layout")).toHaveLength(1)
  })

  describe("with no budget selected", () => {
    it("ignores the button click", () => {
      const wrapper = mount(<Budget {...defaultProps} />)
      wrapper.find("NextButton").simulate("click")
      jest.runAllTimers()
      expect(mockUpdateProfile).not.toHaveBeenCalled()
      expect(mockTrackEvent).not.toHaveBeenCalled()
      expect(window.location.assign).not.toHaveBeenCalled()
    })
  })

  describe("with a budget selected", () => {
    it("sends the update, tracks twice and redirects", () => {
      const wrapper = mount(<Budget {...defaultProps} />)
      wrapper.find("Link").first().simulate("click")
      wrapper.find("NextButton").simulate("click")
      jest.runAllTimers()
      expect(mockUpdateProfile).toHaveBeenCalledWith(500, mockRelay)
      expect(mockTrackEvent.mock.calls.length).toEqual(2)
      expect(window.location.assign).toHaveBeenCalledWith("/")
    })
  })

  describe("with a budget selected and redirect location", () => {
    it("redirects to that location", () => {
      const redirectTo = "/some/other/path"
      const props = {
        ...defaultProps,
        redirectTo,
      }
      const wrapper = mount(<Budget {...props} />)
      wrapper.find("Link").first().simulate("click")
      wrapper.find("NextButton").simulate("click")
      jest.runAllTimers()
      expect(window.location.assign).toHaveBeenCalledWith(redirectTo)
    })
  })
})
