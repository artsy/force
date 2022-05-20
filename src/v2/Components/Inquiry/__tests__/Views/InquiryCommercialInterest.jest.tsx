import { mount } from "enzyme"
import { InquiryCommercialInterest } from "../../Views/InquiryCommercialInterest"
import { useUpdateMyUserProfile } from "../../Hooks/useUpdateMyUserProfile"
import { useInquiryContext } from "../../Hooks/useInquiryContext"
import { flushPromiseQueue } from "v2/DevTools"

jest.mock("../../Hooks/useUpdateMyUserProfile")
jest.mock("../../Hooks/useInquiryContext")

describe("InquiryCommercialInterest", () => {
  const mockSubmitUpdateMyUserProfile = jest
    .fn()
    .mockReturnValue(Promise.resolve())

  const mockNext = jest.fn()

  beforeAll(() => {
    ;(useUpdateMyUserProfile as jest.Mock).mockImplementation(() => ({
      submitUpdateMyUserProfile: mockSubmitUpdateMyUserProfile,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next: mockNext,
      setContext: () => {},
      relayEnvironment: { current: null },
    }))
  })

  afterEach(() => {
    mockSubmitUpdateMyUserProfile.mockReset()
    mockNext.mockReset()
  })

  it("renders correctly", () => {
    const wrapper = mount(<InquiryCommercialInterest />)

    expect(wrapper.html()).toContain(
      "Have you bought art from a gallery or auction house before?"
    )
    expect(wrapper.find("button")).toHaveLength(2)
  })

  it("updates the collector profile when clicked", () => {
    const wrapper = mount(<InquiryCommercialInterest />)

    expect(mockSubmitUpdateMyUserProfile).not.toBeCalled()

    wrapper.find("button").first().simulate("click")

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({ collectorLevel: 3 })
  })

  it("moves to the next step when any option is clicked", async () => {
    const wrapper = mount(<InquiryCommercialInterest />)

    expect(mockSubmitUpdateMyUserProfile).not.toBeCalled()
    expect(mockNext).not.toBeCalled()

    wrapper.find("button").last().simulate("click")

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({ collectorLevel: 2 })
    expect(mockNext).toBeCalled()
  })
})
