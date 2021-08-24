import { InquiryBasicInfoFragmentContainer } from "../../views/InquiryBasicInfo"
import { useUpdateMyUserProfile } from "../../useUpdateMyUserProfile"
import { useInquiryContext } from "../../InquiryContext"
import { flushPromiseQueue } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { fill } from "../util"

jest.unmock("react-relay")
jest.mock("../../useUpdateMyUserProfile")
jest.mock("../../InquiryContext")
jest.mock("v2/Components/LocationAutocompleteInput", () => ({
  LocationAutocompleteInput: () => null,
}))

const { getWrapper } = setupTestWrapper({
  Component: InquiryBasicInfoFragmentContainer,
  query: graphql`
    query InquiryBasicInfo_Test_Query {
      artwork(id: "example") {
        ...InquiryBasicInfo_artwork
      }
    }
  `,
})

describe("InquiryBasicInfo", () => {
  const mockSubmitUpdateMyUserProfile = jest
    .fn()
    .mockReturnValue(Promise.resolve())

  const mockNext = jest.fn()

  beforeEach(() => {
    ;(useUpdateMyUserProfile as jest.Mock).mockImplementation(() => ({
      submitUpdateMyUserProfile: mockSubmitUpdateMyUserProfile,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      next: mockNext,
    }))
  })

  afterEach(() => {
    mockSubmitUpdateMyUserProfile.mockReset()
    mockNext.mockReset()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Partner: () => ({ name: "Example Partner" }),
    })

    expect(wrapper.html()).toContain(
      "Tell Example Partner a little bit about yourself."
    )
  })

  it("updates the collector profile when the form is submitted", async () => {
    const wrapper = getWrapper()

    expect(mockSubmitUpdateMyUserProfile).not.toBeCalled()
    expect(mockNext).not.toBeCalled()

    fill(wrapper, "phoneNumber", "555-555-5555")

    wrapper.find("form").simulate("submit")

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      phone: "555-555-5555",
    })

    expect(mockNext).toBeCalled()
  })
})
