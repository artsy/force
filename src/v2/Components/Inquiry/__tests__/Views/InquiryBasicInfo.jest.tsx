import { InquiryBasicInfoFragmentContainer } from "../../Views/InquiryBasicInfo"
import { useUpdateMyUserProfile } from "../../Hooks/useUpdateMyUserProfile"
import { useInquiryContext } from "../../Hooks/useInquiryContext"
import { flushPromiseQueue } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"
import { fill } from "../util"

jest.unmock("react-relay")
jest.mock("../../Hooks/useUpdateMyUserProfile")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("v2/Components/LocationAutocompleteInput", () => ({
  LocationAutocompleteInput: () => null,
}))

const { getWrapper } = setupTestWrapper({
  Component: InquiryBasicInfoFragmentContainer,
  query: graphql`
    query InquiryBasicInfo_Test_Query @relay_test_operation {
      artwork(id: "example") {
        ...InquiryBasicInfo_artwork
      }
      me {
        ...InquiryBasicInfo_me
      }
    }
  `,
})

describe("InquiryBasicInfo", () => {
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

    fill(wrapper, "phone", "555-555-5555")

    wrapper.find("form").simulate("submit")

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      phone: "555-555-5555",
      shareFollows: true,
    })

    expect(mockNext).toBeCalled()
  })

  it("updates the collector profile when the form is submitted with more information", async () => {
    const wrapper = getWrapper()

    expect(mockSubmitUpdateMyUserProfile).not.toBeCalled()
    expect(mockNext).not.toBeCalled()

    fill(wrapper, "profession", "Carpenter")
    fill(wrapper, "phone", "555-555-5555")

    wrapper.find('[role="checkbox"]').first().simulate("click")

    wrapper.find("form").simulate("submit")

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      profession: "Carpenter",
      phone: "555-555-5555",
      shareFollows: false,
    })

    expect(mockNext).toBeCalled()
  })
})
