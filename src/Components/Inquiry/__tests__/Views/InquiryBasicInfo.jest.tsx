import { fireEvent, screen } from "@testing-library/react"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { useUpdateMyUserProfile } from "Components/Inquiry/Hooks/useUpdateMyUserProfile"
import { InquiryBasicInfoFragmentContainer } from "Components/Inquiry/Views/InquiryBasicInfo"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("../../Hooks/useUpdateMyUserProfile")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("Components/LocationAutocompleteInput", () => ({
  LocationAutocompleteInput: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL({
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
      context: { current: null },
    }))
  })

  afterEach(() => {
    mockSubmitUpdateMyUserProfile.mockReset()
    mockNext.mockReset()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Partner: () => ({ name: "Example Partner" }),
    })

    expect(
      screen.getByText(
        "Stand out and save time by sharing details with the gallery.",
      ),
    ).toBeInTheDocument()
  })

  it("updates the collector profile when the form is submitted", async () => {
    renderWithRelay({
      Me: () => ({
        location: null,
        name: "Example User",
        profession: null,
      }),
    })

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      promptedForUpdate: true,
    })
    expect(mockNext).not.toBeCalled()

    const input = screen.getByPlaceholderText(
      "Memberships, institutions, positions",
    )
    fireEvent.change(input, { target: { value: "Collector" } })

    screen.getByText("Save Profile Details").click()

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      name: "Example User",
      location: {
        city: null,
        country: null,
        countryCode: null,
        postalCode: null,
        state: null,
      },
      profession: "",
      otherRelevantPositions: "Collector",
    })

    expect(mockNext).toBeCalled()
  })

  it("updates the collector profile when the form is submitted with more information", async () => {
    renderWithRelay({
      Me: () => ({
        location: {
          city: "New York",
          country: "United States",
          state: "NY",
        },
        name: "Example User",
      }),
    })

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      promptedForUpdate: true,
    })
    expect(mockNext).not.toBeCalled()

    const professionInput = screen.getByPlaceholderText("Profession")
    fireEvent.change(professionInput, { target: { value: "Carpenter" } })

    const otherRelevantPositionsInput = screen.getByPlaceholderText(
      "Memberships, institutions, positions",
    )
    fireEvent.change(otherRelevantPositionsInput, {
      target: { value: "Artist" },
    })

    screen.getByText("Save Profile Details").click()

    await flushPromiseQueue()

    expect(mockSubmitUpdateMyUserProfile).toBeCalledWith({
      name: "Example User",
      location: {
        city: "New York",
        country: "United States",
        countryCode: null,
        postalCode: null,
        state: "NY",
      },
      profession: "Carpenter",
      otherRelevantPositions: "Artist",
    })

    expect(mockNext).toBeCalled()
  })
})
