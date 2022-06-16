import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SystemContextProvider, useTracking } from "v2/System"
import { createOrUpdateConsignSubmission } from "../../Utils/createOrUpdateConsignSubmission"
import { useErrorModal } from "../../Utils/useErrorModal"
import { getPhoneNumberInformation } from "../../Utils/phoneNumberUtils"
import { ContactInformationFragmentContainer } from "../ContactInformation"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { ActionType } from "@artsy/cohesion"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

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

const mockSubmission = {
  externalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
}

const mockRouterPush = jest.fn()

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: { push: mockRouterPush },
  })),
}))

const mockOpenErrorModal = jest.fn()
jest.mock("../../Utils/useErrorModal", () => ({
  useErrorModal: jest.fn(),
}))

jest.mock("sharify", () => ({
  data: { SESSION_ID: "SessionID", RECAPTCHA_KEY: "recaptcha-api-key" },
}))

jest.mock("../../Utils/createOrUpdateConsignSubmission", () => ({
  ...jest.requireActual("../../Utils/createOrUpdateConsignSubmission"),
  createOrUpdateConsignSubmission: jest.fn(),
}))

jest.mock("../../Utils/phoneNumberUtils", () => ({
  ...jest.requireActual("../../Utils/phoneNumberUtils"),
  getPhoneNumberInformation: jest.fn(),
}))

const mockCreateOrUpdateConsignSubmission = createOrUpdateConsignSubmission as jest.Mock
const mockGetPhoneNumberInformation = getPhoneNumberInformation as jest.Mock
const mockUseErrorModal = useErrorModal as jest.Mock
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

describe("Contact Information step", () => {
  beforeAll(() => {
    mockUseErrorModal.mockImplementation(() => ({
      openErrorModal: mockOpenErrorModal,
    }))
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

  describe("Save and Continue button", () => {
    it("is disabled if at least one field is not valid", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockEmptyMe,
        ConsignmentSubmission: () => mockSubmission,
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
        ConsignmentSubmission: () => mockSubmission,
      })

      expect(getSubmitButton()).toBeEnabled()
    })

    it("is disabled when number is removed by user", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockEmptyMe,
        ConsignmentSubmission: () => mockSubmission,
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

    it("show error modal if consingment submission fails", async () => {
      mockCreateOrUpdateConsignSubmission.mockRejectedValueOnce("rejected")
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      fireEvent.click(getSubmitButton())

      await waitFor(() => {
        expect(mockOpenErrorModal).toBeCalled()
      })
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
      expect(getInput("phone")).not.toHaveValue()
    })

    it("submiting a valid form", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

      simulateTyping("name", "Banksy")
      simulateTyping("email", "banksy@test.test")
      simulateTyping("phone", "333")

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
      expect(getInput("phone")).toHaveValue(mockMe.phoneNumber.national)
    })

    it("submiting a valid form", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockMe,
        ConsignmentSubmission: () => mockSubmission,
      })

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
        expect(mockRouterPush).toHaveBeenCalledWith(
          `/sell/submission/${mockSubmission.externalId}/thank-you`
        )
      })
    })
  })

  it("values are trimmed before any actions", async () => {
    getWrapper().renderWithRelay({
      Me: () => mockEmptyMe,
      ConsignmentSubmission: () => mockSubmission,
    })

    simulateTyping("name", " Banksy  ")
    simulateTyping("email", "  banksy@test.test  ")
    simulateTyping("phone", "  +1 415-555-0132  ")

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

    simulateTyping("phone", "(415) 555-0132")

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
