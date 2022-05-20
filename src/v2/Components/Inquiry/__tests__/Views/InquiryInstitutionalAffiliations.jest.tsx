import { InquiryInstitutionalAffiliations } from "../../Views/InquiryInstitutionalAffiliations"
import { useUpdateCollectorProfile } from "../../Hooks/useUpdateCollectorProfile"
import { useInquiryContext } from "../../Hooks/useInquiryContext"
import { flushPromiseQueue } from "v2/DevTools"
import { fill } from "../util"
import { mount } from "enzyme"

jest.unmock("react-relay")
jest.mock("../../Hooks/useUpdateCollectorProfile")
jest.mock("../../Hooks/useInquiryContext")

describe("InquiryBasicInfo", () => {
  const mockSubmitUpdateCollectorProfile = jest
    .fn()
    .mockReturnValue(Promise.resolve())

  const mockNext = jest.fn()

  beforeAll(() => {
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
