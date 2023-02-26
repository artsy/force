import { ActionType } from "@artsy/cohesion"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { useSubmissionFlowSteps } from "Apps/Consign/Hooks/useSubmissionFlowSteps"
import { ContactInformationFragmentContainer } from "Apps/Consign/Routes/SubmissionFlow/ContactInformation/ContactInformation"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import { flushPromiseQueue } from "DevTools"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { SystemContextProvider } from "System/SystemContext"
import { useRouter } from "System/Router/useRouter"

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

const mockSubmission = {
  externalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
}

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: { push: mockRouterPush, replace: mockRouterReplace },
    match: { params: { artworkId: undefined } },
  })),
}))

jest.mock("Apps/Consign/Hooks/useSubmissionFlowSteps", () => ({
  useSubmissionFlowSteps: jest.fn(() => [
    "Artwork Details",
    "Upload Photos",
    "Contact Information",
  ]),
}))

const mockSendToast = jest.fn()

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    useToasts: () => ({ sendToast: mockSendToast }),
  }
})

jest.mock("sharify", () => ({
  data: { SESSION_ID: "SessionID", RECAPTCHA_KEY: "recaptcha-api-key" },
}))

jest.mock("../../Utils/createOrUpdateConsignSubmission", () => ({
  ...jest.requireActual("../../Utils/createOrUpdateConsignSubmission"),
  createOrUpdateConsignSubmission: jest.fn(),
}))

const mockCreateOrUpdateConsignSubmission = createOrUpdateConsignSubmission as jest.Mock
const mockTracking = useTracking as jest.Mock
const mockTrackEvent = jest.fn()

const getWrapper = (user?: User) =>
  setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <SystemContextProvider user={user} isLoggedIn={!!user}>
          <ContactInformationFragmentContainer {...props} />
        </SystemContextProvider>
      )
    },
    query: graphql`
      query ContactInformation_SubmissionFlowTest_Query($externalId: ID)
        @relay_test_operation {
        me {
          ...ContactInformation_me
        }
        submission(externalId: $externalId) {
          ...ContactInformation_submission
        }
      }
    `,
    variables: {
      externalId: mockSubmission.externalId,
    },
  })

const simulateTyping = async (field: string, text: string) => {
  const input = getInput(field)
  input && fireEvent.change(input, { target: { name: field, value: text } })
}

const getSubmitButton = () => screen.getByTestId("save-button")
const getInput = name =>
  screen.getAllByRole("textbox").find(c => c.getAttribute("name") === name)

describe("Save and Continue button", () => {
  describe("with valid phone number", () => {
    beforeAll(() => {
      mockTracking.mockImplementation(() => ({
        trackEvent: mockTrackEvent,
      }))
    })

    it("is enabled if all fields are received valid", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      expect(getSubmitButton()).toBeEnabled()
    })

    it("is enabled if all fields are typed valid", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockEmptyMe,
        ConsignmentSubmission: () => mockSubmission,
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
  })

  describe("without phone number", () => {
    beforeAll(() => {
      mockTracking.mockImplementation(() => ({
        trackEvent: mockTrackEvent,
      }))
    })

    it("is disabled when number is not valid", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      simulateTyping("name", "Banksy")
      simulateTyping("email", "banksy@test.test")
      simulateTyping("phoneNumber", "")

      await waitFor(() => {
        expect(getSubmitButton()).toBeDisabled()
      })
    })
  })

  // TODO: Bring back this test when we have a better way to validate the phone number
  describe.skip("with an invalid phone number", () => {
    beforeAll(() => {
      mockTracking.mockImplementation(() => ({
        trackEvent: mockTrackEvent,
      }))
    })

    it("is disabled when number is not valid", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      simulateTyping("name", "Banksy")
      simulateTyping("email", "banksy@test.test")
      simulateTyping("phoneNumber", "123")

      await waitFor(() => {
        expect(getSubmitButton()).toBeDisabled()
      })
    })

    it("is disabled when a valid number is removed by user", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      simulateTyping("name", "Banksy")
      simulateTyping("email", "banksy@test.test")
      simulateTyping("phoneNumber", "415-555-0132")

      await waitFor(() => {
        expect(getSubmitButton()).toBeEnabled()
      })

      simulateTyping("phoneNumber", "")

      await waitFor(() => {
        expect(getSubmitButton()).toBeDisabled()
      })
    })
  })
})

describe("Contact Information step", () => {
  beforeAll(() => {
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
        ConsignmentSubmission: () => mockSubmission,
      })

      expect(
        screen.getByText("Let us know how to reach you")
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          "We will only use these details to contact you regarding your submission."
        )
      ).toBeInTheDocument()
      expect(screen.getByText("Back")).toBeInTheDocument()
      expect(
        screen.getAllByRole("link").find(c => c.textContent?.includes("Back"))
      ).toHaveAttribute(
        "href",
        `/sell/submission/${mockSubmission.externalId}/upload-photos`
      )

      expect(getSubmitButton()).toBeInTheDocument()
    })
  })

  describe("If not logged in", () => {
    it("fields are not pre-populating from user profile", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockEmptyMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      expect(getInput("name")).not.toHaveValue()
      expect(getInput("email")).not.toHaveValue()
      expect(getInput("phoneNumber")).not.toHaveValue()
    })

    it("submitting a valid form", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      simulateTyping("name", "Banksy")
      simulateTyping("email", "banksy@test.test")
      simulateTyping("phoneNumber", "415-555-0132")

      mockCreateOrUpdateConsignSubmission.mockResolvedValueOnce(
        mockSubmission.externalId
      )

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
          action: "submission_submit",
        })
        expect(mockCreateOrUpdateConsignSubmission).toHaveBeenCalled()
        expect(mockCreateOrUpdateConsignSubmission.mock.calls[0][1]).toEqual({
          externalId: mockSubmission.externalId,
          userName: "Banksy",
          userEmail: "banksy@test.test",
          userPhone: "+1 415-555-0132",
          state: "SUBMITTED",
          sessionID: "SessionID",
        })
        expect(mockRouterReplace).toHaveBeenCalledWith("/sell")
        expect(mockRouterPush).toHaveBeenCalledWith(
          `/sell/submission/${mockSubmission.externalId}/thank-you`
        )
      })
    })
  })

  describe("If logged in", () => {
    it("fields are pre-populating from user profile", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      expect(getInput("name")).toHaveValue(mockMe.name)
      expect(getInput("email")).toHaveValue(mockMe.email)
      expect(getInput("phoneNumber")).toHaveValue(" 415-555-0132")
    })

    it("submiting a valid form", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      mockCreateOrUpdateConsignSubmission.mockResolvedValueOnce(
        mockSubmission.externalId
      )

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
          action: "submission_submit",
        })
        expect(mockCreateOrUpdateConsignSubmission).toHaveBeenCalled()
        expect(mockCreateOrUpdateConsignSubmission.mock.calls[0][1]).toEqual({
          externalId: mockSubmission.externalId,
          userName: "Serge",
          userEmail: "serge@test.test",
          userPhone: "+1 415-555-0132",
          state: "SUBMITTED",
          sessionID: "SessionID",
        })
        expect(mockRouterReplace).toHaveBeenCalledWith("/sell")
        expect(mockRouterPush).toHaveBeenCalledWith(
          `/sell/submission/${mockSubmission.externalId}/thank-you`
        )
      })
    })
  })

  describe("When ContactInformation is the first step in MyCollection Submission", () => {
    const mockUseRouter = useRouter as jest.Mock
    const mockUseSubmissionFlowSteps = useSubmissionFlowSteps as jest.Mock
    beforeEach(() => {
      mockUseSubmissionFlowSteps.mockImplementationOnce(() => [
        "Contact Information",
        "Artwork Details",
        "Upload Photos",
      ])
    })

    it("includes myCollectionArtworkID and source in params", async () => {
      mockUseRouter.mockImplementationOnce(() => ({
        match: {
          params: {
            artworkId: "artwork-id-1234",
          },
        },
        router: { push: mockRouterPush, replace: mockRouterReplace },
      }))

      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => null,
      })

      await flushPromiseQueue()

      fireEvent.click(getSubmitButton())

      await flushPromiseQueue()

      expect(mockCreateOrUpdateConsignSubmission.mock.calls[0][1]).toEqual(
        expect.objectContaining({
          myCollectionArtworkID: "artwork-id-1234",
          source: "MY_COLLECTION",
        })
      )
    })
  })

  it("values are trimmed before any actions", async () => {
    getWrapper().renderWithRelay({
      Me: () => mockEmptyMe,
      ConsignmentSubmission: () => mockSubmission,
    })

    simulateTyping("name", " Banksy  ")
    simulateTyping("email", "  banksy@test.test  ")
    simulateTyping("phoneNumber", "  415-555-0132  ")

    await waitFor(() => {
      expect(getSubmitButton()).toBeEnabled()
    })

    fireEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(mockCreateOrUpdateConsignSubmission).toHaveBeenCalled()
      expect(mockCreateOrUpdateConsignSubmission.mock.calls[0][1]).toEqual({
        externalId: mockSubmission.externalId,
        userName: "Banksy",
        userEmail: "banksy@test.test",
        userPhone: "+1 415-555-0132",
        state: "SUBMITTED",
        sessionID: "SessionID",
      })
    })
  })

  it("show error modal if consingment submission fails", async () => {
    mockCreateOrUpdateConsignSubmission.mockRejectedValueOnce("rejected")
    getWrapper().renderWithRelay({
      Me: () => mockMe,
      ConsignmentSubmission: () => mockSubmission,
    })

    fireEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(mockSendToast).toBeCalled()
    })
  })

  it("tracks consignment submitted event with user email when logged in", async () => {
    getWrapper().renderWithRelay({
      Me: () => mockMe,
      ConsignmentSubmission: () => mockSubmission,
    })

    fireEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalled()
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: ActionType.consignmentSubmitted,
        submission_id: mockSubmission.externalId,
        user_id: "123",
        user_email: "serge@test.test",
      })
    })
  })

  it("tracks consignment submitted event with submission email when not logged in", async () => {
    getWrapper().renderWithRelay({
      Me: () => mockEmptyMe,
      ConsignmentSubmission: () => mockSubmission,
    })

    simulateTyping("name", "Banksy")

    simulateTyping("email", "banksy@test.test")

    simulateTyping("phoneNumber", "(415) 555-0132")

    await waitFor(() => {
      expect(getSubmitButton()).toBeEnabled()
    })

    fireEvent.click(getSubmitButton())

    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalled()
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: ActionType.consignmentSubmitted,
        submission_id: mockSubmission.externalId,
        user_id: null,
        user_email: "banksy@test.test",
      })
    })
  })
})
