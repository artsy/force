import { ActionType } from "@artsy/cohesion"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { getPhoneNumberInformation } from "Apps/Consign/Routes/SubmissionFlow/Utils/phoneNumberUtils"
import { PriceEstimateContactInformationFragmentContainer } from "Apps/MyCollection/Routes/PriceEstimate/PriceEstimateContactInformation"
import { MockBoot } from "DevTools"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { SystemContextProvider } from "System"

jest.unmock("react-relay")
jest.mock("react-tracking")

const mockMe = {
  internalID: "123",
  name: "Serge",
  email: "serge@test.test",
  phone: "+1 415-555-0132",
  phoneNumber: {
    isValid: true,
    international: "+1 415-555-0132",
    national: "(415) 555-0132",
    regionCode: "us",
  },
}

const mockEmptyMe = {
  internalID: null,
  name: null,
  email: null,
  phone: null,
  phoneNumber: null,
}

const mockArtwork = {
  internalID: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
  slug: "an-artwork",
}

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: { push: mockRouterPush, replace: mockRouterReplace },
  })),
}))

jest.mock("Apps/Consign/Routes/SubmissionFlow/Utils/phoneNumberUtils", () => ({
  ...jest.requireActual(
    "Apps/Consign/Routes/SubmissionFlow/Utils/phoneNumberUtils"
  ),
  getPhoneNumberInformation: jest.fn(),
}))

jest.mock("../Mutations/useRequestPriceEstimate", () => ({
  ...jest.requireActual("../Mutations/useRequestPriceEstimate"),
  useRequestPriceEstimate: jest.fn(() => ({
    submitMutation: mockRequestPriceEstimate,
  })),
}))

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    useToasts: () => ({ sendToast: mockSendToast }),
  }
})

const mockRequestPriceEstimate = jest.fn()
const mockTracking = useTracking as jest.Mock
const mockTrackEvent = jest.fn()
const mockGetPhoneNumberInformation = getPhoneNumberInformation as jest.Mock
const mockSendToast = jest.fn()

const getWrapper = (user?: User) =>
  setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <MockBoot>
          <SystemContextProvider user={user}>
            <PriceEstimateContactInformationFragmentContainer {...props} />
          </SystemContextProvider>
        </MockBoot>
      )
    },
    query: graphql`
      query PriceEstimateContactInformation_ArtworkFlowTest_Query(
        $artworkID: String!
      ) @relay_test_operation {
        artwork(id: $artworkID) @principalField {
          ...PriceEstimateContactInformation_artwork
        }
        me {
          ...PriceEstimateContactInformation_me
        }
      }
    `,
    variables: {
      artworkID: mockArtwork.internalID,
    },
  })

const simulateTyping = async (field: string, text: string) => {
  const input = getInput(field)
  input && fireEvent.change(input, { target: { name: field, value: text } })
}

const getSubmitButton = () => screen.getByTestId("submit-button")
const getInput = name =>
  screen.getAllByRole("textbox").find(c => c.getAttribute("name") === name)

describe("Price Estimate Contact Information", () => {
  beforeAll(() => {
    mockGetPhoneNumberInformation.mockResolvedValue(mockMe.phoneNumber)
    mockTracking.mockImplementation(() => ({
      trackEvent: mockTrackEvent,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Initial render", () => {
    it("renders correctly", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        Artwork: () => mockArtwork,
      })

      expect(
        screen.getByText("Let us know how to reach you")
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          "We wil only use these details to contact you about this price estimate."
        )
      ).toBeInTheDocument()
      expect(screen.getByText("Back")).toBeInTheDocument()
      expect(
        screen.getAllByRole("link").find(c => c.textContent?.includes("Back"))
      ).toHaveAttribute(
        "href",
        `/my-collection/artwork/${mockArtwork.internalID}`
      )

      expect(screen.getByTestId("submit-button")).toBeInTheDocument()
    })
  })
})

describe("Save and Continue button", () => {
  it("is disabled if at least one field is not valid", async () => {
    getWrapper().renderWithRelay({
      Me: () => mockEmptyMe,
      Artwork: () => mockArtwork,
    })

    expect(getSubmitButton()).toBeDisabled()

    simulateTyping("name", "Banksy")

    await waitFor(() => {
      expect(getSubmitButton()).toBeDisabled()
    })

    simulateTyping("email", "banksy@test.test")

    await waitFor(() => {
      expect(getSubmitButton()).toBeDisabled()
    })

    simulateTyping("phone", "(415) 555-0132")

    await waitFor(() => {
      expect(getSubmitButton()).toBeEnabled()
    })
  })

  it("is enabled if  all fields is valid", async () => {
    getWrapper().renderWithRelay({
      Me: () => mockMe,
      Artwork: () => mockArtwork,
    })

    expect(getSubmitButton()).toBeEnabled()
  })

  it("is disabled when number is removed by user", async () => {
    getWrapper().renderWithRelay({
      Me: () => mockEmptyMe,
      Artwork: () => mockArtwork,
    })

    simulateTyping("name", "Banksy")
    simulateTyping("email", "banksy@test.test")
    simulateTyping("phone", "+1 415-555-0132")

    await waitFor(() => {
      expect(getSubmitButton()).toBeEnabled()
    })

    simulateTyping("phone", "")

    await waitFor(() => {
      expect(getSubmitButton()).toBeDisabled()
    })
  })

  it("show error modal if consingment artwork fails", async () => {
    mockRequestPriceEstimate.mockRejectedValueOnce("rejected")
    getWrapper().renderWithRelay({
      Me: () => mockMe,
      Artwork: () => mockArtwork,
    })

    fireEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(mockSendToast).toBeCalled()
    })
  })
})

it("fields are pre-populating from user profile", async () => {
  getWrapper().renderWithRelay({
    Me: () => mockMe,
    Artwork: () => mockArtwork,
  })

  expect(getInput("name")).toHaveValue(mockMe.name)
  expect(getInput("email")).toHaveValue(mockMe.email)
  expect(getInput("phone")).toHaveValue(mockMe.phoneNumber.national)
})

it("submiting a valid form", async () => {
  getWrapper().renderWithRelay({
    Me: () => mockMe,
    Artwork: () => mockArtwork,
  })

  fireEvent.click(getSubmitButton())

  await waitFor(() => {
    expect(mockRequestPriceEstimate).toHaveBeenCalled()
    expect(mockRequestPriceEstimate.mock.calls[0][0]).toEqual({
      variables: {
        input: {
          artworkId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
          requesterEmail: "serge@test.test",
          requesterName: "Serge",
          requesterPhoneNumber: "+1 415-555-0132",
        },
      },
    })
    expect(mockRouterReplace).toHaveBeenCalledWith(
      `/my-collection/artwork/${mockArtwork.internalID}`
    )
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/my-collection/artwork/${mockArtwork.internalID}/price-estimate/success`
    )
  })
})

it("tracks send request price estimate", async () => {
  getWrapper().renderWithRelay({
    Me: () => mockMe,
    Artwork: () => mockArtwork,
  })

  fireEvent.click(getSubmitButton())

  await waitFor(() => {
    expect(mockTrackEvent).toHaveBeenCalled()
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: ActionType.sentRequestPriceEstimate,
      artwork_id: mockArtwork.internalID,
      artwork_slug: "an-artwork",
      user_id: "123",
      user_email: "serge@test.test",
    })
  })
})
