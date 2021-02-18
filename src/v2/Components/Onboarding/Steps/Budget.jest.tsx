import React from "react"
import { mount } from "enzyme"
import Budget from "./Budget"

jest.useFakeTimers()

describe("Budget", () => {
  const mockRelay = {}
  const mockTracking = { trackEvent: jest.fn() }
  const mockUpdateProfile = jest.fn()

  const defaultProps = {
    relayEnvironment: mockRelay,
    tracking: mockTracking,
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
      expect(mockTracking.trackEvent).not.toHaveBeenCalled()
      expect(window.location.assign).not.toHaveBeenCalled()
    })
  })

  describe("with a budget selected", () => {
    it("sends the update, tracks and redirects", () => {
      const wrapper = mount(<Budget {...defaultProps} />)
      wrapper.find("Link").first().simulate("click")
      wrapper.find("NextButton").simulate("click")
      jest.runAllTimers()
      expect(mockUpdateProfile).toHaveBeenCalledWith(500, mockRelay)
      expect(mockTracking.trackEvent).toHaveBeenCalled()
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
