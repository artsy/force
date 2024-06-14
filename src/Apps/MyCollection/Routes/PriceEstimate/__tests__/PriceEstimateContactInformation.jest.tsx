import { ActionType } from "@artsy/cohesion"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { PriceEstimateContactInformationFragmentContainer } from "Apps/MyCollection/Routes/PriceEstimate/PriceEstimateContactInformation"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { SystemContextProvider } from "System/Contexts/SystemContext"

jest.unmock("react-relay")
jest.mock("react-tracking")

const mockMe = {
  internalID: "123",
  name: "Serge",
  email: "serge@test.test",
  phone: "+1 415-555-0132",
  phoneNumber: {
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

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: { push: mockRouterPush, replace: mockRouterReplace },
  })),
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
  beforeEach(() => {
    mockTracking.mockImplementation(() => ({
      trackEvent: mockTrackEvent,
    }))
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
      expect(screen.getByText("Back")).toBeInTheDocument()
      expect(
        screen.getAllByRole("link").find(c => c.textContent?.includes("Back"))
      ).toHaveAttribute(
        "href",
        `/collector-profile/my-collection/artwork/${mockArtwork.internalID}`
      )

      expect(screen.getByTestId("submit-button")).toBeInTheDocument()
    })

    it("fields are pre-populating from user profile", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        Artwork: () => mockArtwork,
      })

      expect(getInput("name")).toHaveValue(mockMe.name)
      expect(getInput("email")).toHaveValue(mockMe.email)
      expect(getInput("phoneNumber")).toHaveValue(" 415-555-0132")
    })
  })

  describe("Initial render with ff enabled", () => {
    it("renders correctly", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        Artwork: () => mockArtwork,
      })

      expect(
        screen.getByText("Let us know how to reach you")
      ).toBeInTheDocument()
      expect(screen.getByText("Back")).toBeInTheDocument()
      expect(
        screen.getAllByRole("link").find(c => c.textContent?.includes("Back"))
      ).toHaveAttribute(
        "href",
        `/collector-profile/my-collection/artwork/${mockArtwork.internalID}`
      )

      expect(screen.getByTestId("submit-button")).toBeInTheDocument()
    })
  })

  describe("Tracking", () => {
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
  })

  describe("Form submission", () => {
    it("submitting a valid form", async () => {
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
          `/collector-profile/my-collection/artwork/${mockArtwork.internalID}`
        )
        expect(mockRouterPush).toHaveBeenCalledWith(
          `/collector-profile/my-collection/artwork/${mockArtwork.internalID}/price-estimate/success`
        )
      })
    })

    it("submitting a valid form with ff enabled", async () => {
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
          `/collector-profile/my-collection/artwork/${mockArtwork.internalID}`
        )
        expect(mockRouterPush).toHaveBeenCalledWith(
          `/collector-profile/my-collection/artwork/${mockArtwork.internalID}/price-estimate/success`
        )
      })
    })
  })

  describe("Save and Continue button", () => {
    it("is disabled if at least one field is not valid", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockEmptyMe,
        Artwork: () => mockArtwork,
      })

      await waitFor(() => {
        expect(getSubmitButton()).toBeDisabled()
      })

      simulateTyping("name", "Banksy")

      await waitFor(() => {
        expect(getSubmitButton()).toBeDisabled()
      })

      simulateTyping("email", "banksy@test.test")

      await waitFor(() => {
        expect(getSubmitButton()).toBeDisabled()
      })

      simulateTyping("phoneNumber", "(415) 555-0132")

      await waitFor(() => {
        expect(getSubmitButton()).toBeEnabled()
      })
    })

    it("is enabled if  all fields is valid", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        Artwork: () => mockArtwork,
      })

      await waitFor(() => {
        expect(getSubmitButton()).toBeEnabled()
      })
    })

    it("is disabled when phone number is not valid", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockEmptyMe,
        Artwork: () => mockArtwork,
      })

      simulateTyping("name", "Banksy")
      simulateTyping("email", "banksy@test.test")
      simulateTyping("phoneNumber", "123")

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
})
