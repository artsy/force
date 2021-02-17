import React from "react"
import { mount } from "enzyme"
import CollectorIntent from "./CollectorIntent"

describe("CollectorIntent", () => {
  const mockRelay = {}
  const mockHistory = {
    push: jest.fn(),
  }
  const mockUpdateProfile = jest.fn()
  const props = {
    history: mockHistory,
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
    it("skips the update and advances to next step", () => {
      const wrapper = mount(<CollectorIntent {...props} />)
      wrapper.find("NextButton").simulate("click")
      expect(mockUpdateProfile).not.toHaveBeenCalled()
      expect(mockHistory.push).toHaveBeenCalledWith("/personalize/artists")
    })
  })

  describe("with some selected intents", () => {
    it("sends the update and advances to next step", () => {
      const wrapper = mount(<CollectorIntent {...props} />)
      wrapper.find("Link").first().simulate("click")
      wrapper.find("Link").last().simulate("click")
      wrapper.find("NextButton").simulate("click")
      const expectedIntents = ["BUY_ART_AND_DESIGN", "READ_ART_MARKET_NEWS"]
      expect(mockUpdateProfile).toHaveBeenCalledWith(expectedIntents, mockRelay)
      expect(mockHistory.push).toHaveBeenCalledWith("/personalize/artists")
    })
  })
})
