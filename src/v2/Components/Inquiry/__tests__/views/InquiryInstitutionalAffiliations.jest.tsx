import React from "react"
import { InquiryInstitutionalAffiliations } from "../../views/InquiryInstitutionalAffiliations"
import { useUpdateCollectorProfile } from "../../useUpdateCollectorProfile"
import { useInquiryContext } from "../../InquiryContext"
import { flushPromiseQueue } from "v2/DevTools"
import { fill } from "../util"
import { mount } from "enzyme"

jest.unmock("react-relay")
jest.mock("../../useUpdateCollectorProfile")
jest.mock("../../InquiryContext")

describe("InquiryBasicInfo", () => {
  const mockSubmitUpdateCollectorProfile = jest
    .fn()
    .mockReturnValue(Promise.resolve())

  const mockNext = jest.fn()

  beforeEach(() => {
    ;(useUpdateCollectorProfile as jest.Mock).mockImplementation(() => ({
      submitUpdateCollectorProfile: mockSubmitUpdateCollectorProfile,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next: mockNext,
    }))
  })

  afterEach(() => {
    mockSubmitUpdateCollectorProfile.mockReset()
    mockNext.mockReset()
  })

  it("renders correctly", () => {
    const wrapper = mount(<InquiryInstitutionalAffiliations />)

    expect(wrapper.html()).toContain("Any institutional affiliations?")
  })

  it("updates the collector profile when the form is submitted", async () => {
    const wrapper = mount(<InquiryInstitutionalAffiliations />)

    expect(mockSubmitUpdateCollectorProfile).not.toBeCalled()
    expect(mockNext).not.toBeCalled()

    fill(wrapper, "institutionalAffiliations", "NADA")

    wrapper.find("button").simulate("click")

    await flushPromiseQueue()

    expect(mockSubmitUpdateCollectorProfile).toBeCalledWith({
      institutionalAffiliations: "NADA",
    })

    expect(mockNext).toBeCalled()
  })
})
