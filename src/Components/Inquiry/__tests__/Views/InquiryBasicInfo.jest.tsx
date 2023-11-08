import { InquiryBasicInfoFragmentContainer } from "Components/Inquiry/Views/InquiryBasicInfo"
import { useUpdateMyUserProfile } from "Components/Inquiry/Hooks/useUpdateMyUserProfile"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { fill } from "Components/Inquiry/__tests__/util"

jest.unmock("react-relay")
jest.mock("../../Hooks/useUpdateMyUserProfile")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("Components/LocationAutocompleteInput", () => ({
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
    const { wrapper } = getWrapper({
      Partner: () => ({ name: "Example Partner" }),
    })

    expect(wrapper.html()).toContain(
      "Tell Example Partner a little bit about yourself."
    )
    expect(wrapper.html()).toContain(
      "Galleries are more likely to respond to collectors who share their profile."
    )
  })

  it("updates the collector profile when the form is submitted", async () => {
    const { wrapper } = getWrapper()

    expect(mockSubmitUpdateMyUserProfile).not.toBeCalled()
    expect(mockNext).not.toBeCalled()

    fill(wrapper, "otherRelevantPositions", "Collector")

    wrapper.find("form").simulate("submit")

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      otherRelevantPositions: "Collector",
      shareFollows: true,
    })

    expect(mockNext).toBeCalled()
  })

  it("updates the collector profile when the form is submitted with more information", async () => {
    const { wrapper } = getWrapper()

    expect(mockSubmitUpdateMyUserProfile).not.toBeCalled()
    expect(mockNext).not.toBeCalled()

    fill(wrapper, "profession", "Carpenter")
    fill(wrapper, "otherRelevantPositions", "Artist")

    wrapper.find("form").simulate("submit")

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      profession: "Carpenter",
      otherRelevantPositions: "Artist",
      shareFollows: true,
    })

    expect(mockNext).toBeCalled()
  })
})
