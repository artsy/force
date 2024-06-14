import { screen, fireEvent, waitFor } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { SettingsEditProfileFieldsFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileFields"
import { useTracking } from "react-tracking"
import { useVerifyID } from "Apps/Settings/Routes/EditProfile/Mutations/useVerifyID"
import { useVerifyEmail } from "Apps/Settings/Routes/EditProfile/Mutations/useVerifyEmail"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/Mutations/useUpdateMyUserProfile")
jest.mock("Apps/Settings/Routes/EditProfile/Mutations/useVerifyID")
jest.mock("Apps/Settings/Routes/EditProfile/Mutations/useVerifyEmail")

const mockSendToast = jest.fn()

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    useToasts: () => ({ sendToast: mockSendToast }),
  }
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditProfileFieldsFragmentContainer,
  query: graphql`
    query SettingsEditProfileFields_Test_Query @relay_test_operation {
      me {
        ...SettingsEditProfileFields_me
      }
    }
  `,
})

describe("SettingsEditProfileFields", () => {
  const mockUseUpdateMyUserProfile = useUpdateMyUserProfile as jest.Mock
  const mockUseVerifyID = useVerifyID as jest.Mock
  const mockUseVerifyEmail = useVerifyEmail as jest.Mock
  const mockSubmitUpdateMyUserProfile = jest.fn()
  const mockSubmitVerifyIDMutation = jest.fn()
  const mockSubmitVerifyEmailMutation = jest.fn()
  const mockUseTracking = useTracking as jest.Mock

  beforeEach(() => {
    mockUseUpdateMyUserProfile.mockImplementation(() => ({
      submitUpdateMyUserProfile: mockSubmitUpdateMyUserProfile,
    }))
    mockUseVerifyID.mockImplementation(() => ({
      submitMutation: mockSubmitVerifyIDMutation,
    }))
    mockUseVerifyEmail.mockImplementation(() => ({
      submitMutation: mockSubmitVerifyEmailMutation,
    }))
  })

  afterEach(() => {
    mockUseUpdateMyUserProfile.mockReset()
    mockUseVerifyID.mockReset()
    mockUseVerifyEmail.mockReset()
    mockSendToast.mockClear()
  })

  it("renders the image sectio", () => {
    renderWithRelay()

    expect(screen.getByText("Choose an Image")).toBeInTheDocument()
  })

  it("renders the form", () => {
    renderWithRelay()

    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Primary Location")).toBeInTheDocument()
    expect(screen.getByText("Profession")).toBeInTheDocument()
    expect(screen.getByText("Other relevant positions")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })

  it("submits the form", async () => {
    const trackingSpy = jest.fn()

    mockUseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))

    renderWithRelay()

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { name: "name", value: "Collector Name" },
    })
    fireEvent.change(screen.getByPlaceholderText("City name"), {
      target: { name: "location", value: "A" },
    })
    fireEvent.change(screen.getByPlaceholderText("Profession or job title"), {
      target: { name: "profession", value: "Artist and Collector" },
    })
    fireEvent.change(screen.getByPlaceholderText("Other relevant positions"), {
      target: { name: "otherRelevantPositions", value: "Positions" },
    })
    fireEvent.change(
      screen.getByPlaceholderText(
        "Add a brief bio, so galleries know which artists or genres you collect."
      ),
      {
        target: { name: "bio", value: "I collect" },
      }
    )

    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(mockSubmitUpdateMyUserProfile).toHaveBeenCalledWith({
        name: "Collector Name",
        location: {
          city: "A",
          country: null,
          countryCode: null,
          state: null,
        },
        profession: "Artist and Collector",
        otherRelevantPositions: "Positions",
        bio: "I collect",
      })
    })

    await waitFor(() => {
      expect(trackingSpy).toHaveBeenCalledWith({
        action: "editedUserProfile",
        context_screen: "collectorProfile",
        context_screen_owner_type: "editProfile",
        platform: "web",
      })
    })
  })

  describe("ID verification", () => {
    it("renders the component with correct links", async () => {
      renderWithRelay()

      expect(screen.getByText("Verify Your ID")).toBeInTheDocument()
      const faqLink = screen.getByText("FAQs")
      expect(faqLink).toHaveAttribute(
        "href",
        expect.stringContaining("/identity-verification-faq")
      )
      const mailLink = screen.getByText("verification@artsy.net")
      expect(mailLink).toHaveAttribute(
        "href",
        expect.stringContaining("mailto:verification@artsy.net")
      )
    })

    it("when clicked tracks and submits mutation", async () => {
      const trackingSpy = jest.fn()

      mockUseTracking.mockImplementation(() => ({
        trackEvent: trackingSpy,
      }))

      renderWithRelay()

      fireEvent.click(screen.getByText("Verify Your ID"))

      await waitFor(() => {
        expect(mockSubmitVerifyIDMutation).toHaveBeenCalled()
        expect(trackingSpy).toHaveBeenCalledWith({
          action: "clickedVerifyIdentity",
          context_module: "collectorProfile",
          context_page_owner_type: "editProfile",
          subject: "Clicked ID Verification Link",
        })
      })
    })

    it("displays success", async () => {
      renderWithRelay({
        Me: () => ({
          email: "success@example.com",
          canRequestEmailConfirmation: true,
          internalID: "1234",
        }),
      })

      fireEvent.click(screen.getByText("Verify Your ID"))

      await waitFor(() => {
        expect(mockSubmitVerifyIDMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: { initiatorID: "1234" },
            },
            rejectIf: expect.any(Function),
          })
        )
      })

      await waitFor(() => {
        expect(mockSendToast).toHaveBeenCalledWith({
          variant: "success",
          message: "ID verification link sent to success@example.com.",
          ttl: 6000,
        })
      })
    })

    it("displays error", async () => {
      mockSubmitVerifyIDMutation.mockRejectedValueOnce({
        message: "Retry later",
      })

      renderWithRelay({
        Me: () => ({
          internalID: "1234",
        }),
      })

      fireEvent.click(screen.getByText("Verify Your ID"))

      await waitFor(() => {
        expect(mockSubmitVerifyIDMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: { initiatorID: "1234" },
            },
            rejectIf: expect.any(Function),
          })
        )
      })

      await waitFor(() => {
        expect(mockSendToast).toBeCalledWith({
          variant: "error",
          message: "There was a problem",
          description: "Retry later",
        })
      })
    })
  })

  describe("Email verification", () => {
    it("renders the component", () => {
      renderWithRelay()

      expect(screen.getByText("Verify Your Email")).toBeInTheDocument()
      expect(
        screen.getByText(
          "Secure your account and receive updates about your transactions on Artsy."
        )
      ).toBeInTheDocument()
    })

    it("when clicked submits mutation", async () => {
      renderWithRelay({
        Me: () => ({
          canRequestEmailConfirmation: true,
        }),
      })

      fireEvent.click(screen.getByText("Verify Your Email"))

      await waitFor(() => {
        expect(mockSubmitVerifyEmailMutation).toHaveBeenCalled()
      })
    })

    it("displays success", async () => {
      renderWithRelay({
        Me: () => ({
          email: "success@example.com",
          canRequestEmailConfirmation: true,
        }),
      })

      fireEvent.click(screen.getByText("Verify Your Email"))

      await waitFor(() => {
        expect(mockSubmitVerifyEmailMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {},
            },
            rejectIf: expect.any(Function),
          })
        )
      })

      await waitFor(() => {
        expect(mockSendToast).toHaveBeenCalledWith({
          variant: "success",
          message: "Email verification link sent to success@example.com.",
          ttl: 6000,
        })
      })
    })

    it("displays error", async () => {
      mockSubmitVerifyEmailMutation.mockRejectedValueOnce({
        message: "Too many email re-confirmations. Please try again later.",
      })

      renderWithRelay({
        Me: () => ({
          canRequestEmailConfirmation: true,
        }),
      })

      fireEvent.click(screen.getByText("Verify Your Email"))

      await waitFor(() => {
        expect(mockSubmitVerifyEmailMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {},
            },
            rejectIf: expect.any(Function),
          })
        )
      })

      await waitFor(() => {
        expect(mockSendToast).toBeCalledWith({
          variant: "error",
          message: "There was a problem",
          description:
            "Too many email re-confirmations. Please try again later.",
        })
      })
    })
  })
})
