import { fireEvent, screen, waitFor } from "@testing-library/react"
import { ConsignmentInquiryFragmentContainer } from "Apps/Sell/Routes/ConsignmentInquiry/ConsignmentInquiry"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()

jest.mock("System/Hooks/useRouter")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: {
      push: mockRouterPush,
      replace: mockRouterReplace,
    },
    match: { params: { artworkId: undefined, recipientEmail: null } },
  })),
}))

const mockSendToast = jest.fn()

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    useToasts: () => ({ sendToast: mockSendToast }),
  }
})

jest.mock("sharify", () => ({
  data: { RECAPTCHA_KEY: "recaptcha-api-key" },
}))

const mockTracking = useTracking as jest.Mock
const mockTrackEvent = jest.fn()

jest.mock("Utils/Hooks/useMutation")
const submitMutation = jest.fn()

const getWrapper = () =>
  setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <SystemContextProvider>
          <ConsignmentInquiryFragmentContainer {...props} />
        </SystemContextProvider>
      )
    },
    query: graphql`
      query ConsignmentInquiry_Test_Query @relay_test_operation {
        me {
          ...ConsignmentInquiry_me
        }
        viewer {
          ...ConsignmentInquiry_viewer
        }
      }
    `,
    variables: {},
  })

const simulateTyping = async (field: string, text: string) => {
  const input = getInput(field)
  input && fireEvent.change(input, { target: { name: field, value: text } })
}

const getSubmitButton = async () => {
  let btn
  await waitFor(() => {
    btn = screen.getByTestId("consignment-inquiry-send-button")
  })

  return btn
}

const getInput = (name: string) =>
  screen.getAllByRole("textbox").find(c => c.getAttribute("name") === name)

describe("ConsignmentInquiry", () => {
  const mockUseRouter = useRouter as jest.Mock

  afterEach(() => {
    mockUseRouter.mockReset()
  })

  beforeEach(() => {
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })
    mockUseRouter.mockImplementation(() => ({
      router: {
        push: mockRouterPush,
        replace: mockRouterReplace,
      },
      match: { params: { artworkId: undefined, recipientEmail: null } },
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", async () => {
    getWrapper().renderWithRelay({
      Me: () => mockMe,
    })

    expect(screen.getByText("Contact a specialist")).toBeInTheDocument()

    expect(
      screen.getAllByRole("button").find(c => c.textContent?.includes("Back")),
    ).toBeInTheDocument()

    expect(await getSubmitButton()).toBeInTheDocument()
  })

  it("renders correctly with selected specialist", async () => {
    mockUseRouter.mockImplementation(() => ({
      router: {
        push: mockRouterPush,
        replace: mockRouterReplace,
      },
      match: {
        params: {
          artworkId: undefined,
          recipientEmail: "jessica@artsymail.com",
        },
      },
    }))

    getWrapper().renderWithRelay({
      Viewer: () => mockViewer,
    })

    expect(screen.getByText("Contact Jessica")).toBeInTheDocument()

    expect(
      screen.getAllByRole("button").find(c => c.textContent?.includes("Back")),
    ).toBeInTheDocument()

    expect(await getSubmitButton()).toBeInTheDocument()
  })

  it("submitting a valid form", async () => {
    mockTracking.mockImplementationOnce(() => ({
      trackEvent: mockTrackEvent,
    }))

    getWrapper().renderWithRelay({
      Me: () => mockMe,
    })

    submitMutation.mockResolvedValueOnce({
      createConsignmentInquiry: {
        consignmentInquiryOrError: {
          consignmentInquiry: {
            internalID: 9,
          },
        },
      },
    })

    await waitFor(() => {
      simulateTyping("message", "This is my message to you")
    })

    fireEvent.click(await getSubmitButton())

    await waitFor(() => {
      expect(window.grecaptcha.execute).toBeCalledWith("recaptcha-api-key", {
        action: "consignment_inquiry",
      })
      expect(submitMutation).toHaveBeenCalled()
      expect(submitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              name: mockMe.name,
              email: mockMe.email,
              phoneNumber: mockMe.phone,
              message: "This is my message to you",
              userId: mockMe.internalID,
            },
          },
        }),
      )
      expect(mockRouterPush).toHaveBeenCalledWith("/sell/inquiry/sent")
      expect(mockTrackEvent).toBeCalledWith(
        expect.objectContaining({ consignment_inquiry_id: 9 }),
      )
    })
  })

  describe("For Unauthenticated Users", () => {
    it("fields are not pre-populated with user information", async () => {
      getWrapper().renderWithRelay({
        Me: () => mockEmptyMe,
      })

      expect(getInput("name")).not.toHaveValue()
      expect(getInput("email")).not.toHaveValue()
      expect(getInput("phoneNumber")).not.toHaveValue()
      expect(getInput("message")).not.toHaveValue()
      expect(await getSubmitButton()).toBeDisabled()
    })
  })
})

const mockMe = {
  internalID: "123",
  name: "User Test",
  email: "user@test.test",
  phone: "+49 17654321",
  phoneNumber: {
    isValid: true,
    international: "+49 176-54321",
    national: "17654321",
    regionCode: "de",
  },
}

const mockEmptyMe = {
  internalID: null,
  name: null,
  email: null,
  phone: null,
  phoneNumber: null,
}

const mockViewer = {
  staticContent: {
    specialistBios: [
      {
        email: "jessica@artsymail.com",
        firstName: "Jessica",
      },
      {
        email: "rachel.hagopian@artsy.net",
        firstName: "Rachel",
      },
    ],
  },
}
