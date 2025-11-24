import { fireEvent, screen, waitFor } from "@testing-library/react"
import { SettingsEditProfileFieldsFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileFields"
import { useVerifyEmail } from "Apps/Settings/Routes/EditProfile/Mutations/useVerifyEmail"
import { useVerifyID } from "Apps/Settings/Routes/EditProfile/Mutations/useVerifyID"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useFlag } from "@unleash/proxy-client-react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/Mutations/useUpdateMyUserProfile")
jest.mock("Apps/Settings/Routes/EditProfile/Mutations/useVerifyID")
jest.mock("Apps/Settings/Routes/EditProfile/Mutations/useVerifyEmail")
jest.mock("@unleash/proxy-client-react")
jest.mock("Components/LocationAutocompleteInput", () => ({
  LocationAutocompleteInput: ({ title }: { title: string }) => (
    <div>{title}</div>
  ),
  normalizePlace: jest.fn(),
}))

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
  const mockUseFlag = useFlag as jest.Mock
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
    // Default: feature flag is disabled
    mockUseFlag.mockReturnValue(false)
  })

  afterEach(() => {
    mockUseUpdateMyUserProfile.mockReset()
    mockUseVerifyID.mockReset()
    mockUseVerifyEmail.mockReset()
    mockUseFlag.mockReset()
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
    expect(screen.queryByText("LinkedIn")).not.toBeInTheDocument()
    expect(screen.queryByText("Instagram")).not.toBeInTheDocument()
    expect(screen.getByText("Other relevant positions")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })

  it("submits the form", async () => {
    const trackingSpy = jest.fn()

    mockUseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))

    renderWithRelay({
      Me: () => ({
        collectorProfile: {
          linkedIn: null,
          instagram: null,
        },
      }),
    })

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { name: "name", value: "Collector Name" },
    })
    fireEvent.change(screen.getByPlaceholderText("Profession or job title"), {
      target: { name: "profession", value: "Artist and Collector" },
    })
    fireEvent.change(screen.getByPlaceholderText("Other relevant positions"), {
      target: { name: "otherRelevantPositions", value: "Positions" },
    })
    fireEvent.change(
      screen.getByPlaceholderText(
        "Add a brief bio, so galleries know which artists or genres you collect.",
      ),
      {
        target: { name: "bio", value: "I collect" },
      },
    )

    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(mockSubmitUpdateMyUserProfile).toHaveBeenCalled()
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

  it("allows form submission when location field is empty", async () => {
    const trackingSpy = jest.fn()

    mockUseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))

    renderWithRelay({
      Me: () => ({
        name: "Test User",
        location: null,
        collectorProfile: {
          linkedIn: null,
          instagram: null,
        },
      }),
    })

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { name: "name", value: "Collector Name" },
    })

    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(mockSubmitUpdateMyUserProfile).toHaveBeenCalled()
    })
  })

  describe("with emerald_collector-social-accounts feature flag enabled", () => {
    beforeEach(() => {
      mockUseFlag.mockReturnValue(true)
    })

    it("renders LinkedIn and Instagram fields", () => {
      renderWithRelay()

      expect(screen.getByText("LinkedIn")).toBeInTheDocument()
      expect(screen.getByText("Instagram")).toBeInTheDocument()
      expect(screen.getByPlaceholderText("LinkedIn handle")).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText("Instagram handle"),
      ).toBeInTheDocument()
    })

    it("submits linkedin and instagram fields", async () => {
      const trackingSpy = jest.fn()

      mockUseTracking.mockImplementation(() => ({
        trackEvent: trackingSpy,
      }))

      renderWithRelay({
        Me: () => ({
          collectorProfile: {
            linkedIn: null,
            instagram: null,
          },
        }),
      })

      fireEvent.change(screen.getByPlaceholderText("Name"), {
        target: { name: "name", value: "Collector Name" },
      })
      fireEvent.change(screen.getByPlaceholderText("LinkedIn handle"), {
        target: { name: "linkedIn", value: "collector-linkedin" },
      })
      fireEvent.change(screen.getByPlaceholderText("Instagram handle"), {
        target: { name: "instagram", value: "collector_insta" },
      })

      fireEvent.click(screen.getByText("Save"))

      await waitFor(() => {
        expect(mockSubmitUpdateMyUserProfile).toHaveBeenCalledWith(
          expect.objectContaining({
            name: "Collector Name",
            linkedIn: "collector-linkedin",
            instagram: "collector_insta",
          }),
        )
      })
    })

    it("loads initial values from collectorProfile", () => {
      renderWithRelay({
        Me: () => ({
          name: "Test User",
          collectorProfile: {
            linkedIn: "test-linkedin",
            instagram: "@test_instagram",
          },
        }),
      })

      const linkedInInput = screen.getByPlaceholderText(
        "LinkedIn handle",
      ) as HTMLInputElement
      const instagramInput = screen.getByPlaceholderText(
        "Instagram handle",
      ) as HTMLInputElement

      expect(linkedInInput.value).toBe("test-linkedin")
      expect(instagramInput.value).toBe("@test_instagram")
    })

    it("shows inline error for invalid instagram handle", async () => {
      renderWithRelay({
        Me: () => ({
          collectorProfile: {
            linkedIn: null,
            instagram: null,
          },
        }),
      })

      const instagramInput = screen.getByPlaceholderText("Instagram handle")

      fireEvent.change(instagramInput, {
        target: { value: "invalid@handle" },
      })
      fireEvent.blur(instagramInput)

      await waitFor(() => {
        expect(
          screen.getByText(
            "Instagram handle can only contain letters, numbers, underscores, and periods",
          ),
        ).toBeInTheDocument()
      })
    })

    it("accepts instagram handle with @ prefix", async () => {
      const trackingSpy = jest.fn()

      mockUseTracking.mockImplementation(() => ({
        trackEvent: trackingSpy,
      }))

      renderWithRelay({
        Me: () => ({
          collectorProfile: {
            linkedIn: null,
            instagram: null,
          },
        }),
      })

      fireEvent.change(screen.getByPlaceholderText("Name"), {
        target: { name: "name", value: "Collector Name" },
      })
      fireEvent.change(screen.getByPlaceholderText("Instagram handle"), {
        target: { name: "instagram", value: "@valid_instagram" },
      })

      fireEvent.click(screen.getByText("Save"))

      await waitFor(() => {
        expect(mockSubmitUpdateMyUserProfile).toHaveBeenCalledWith(
          expect.objectContaining({
            instagram: "@valid_instagram",
          }),
        )
      })
    })

    it("shows inline error for invalid linkedin handle", async () => {
      renderWithRelay({
        Me: () => ({
          collectorProfile: {
            linkedIn: null,
            instagram: null,
          },
        }),
      })

      const linkedInInput = screen.getByPlaceholderText("LinkedIn handle")

      fireEvent.change(linkedInInput, {
        target: { value: "invalid_handle" },
      })
      fireEvent.blur(linkedInInput)

      await waitFor(() => {
        expect(
          screen.getByText(
            "LinkedIn handle can only contain letters, numbers, and hyphens",
          ),
        ).toBeInTheDocument()
      })
    })

    it("shows toast when submitting with validation errors", async () => {
      mockSubmitUpdateMyUserProfile.mockClear()

      renderWithRelay({
        Me: () => ({
          collectorProfile: {
            linkedIn: null,
            instagram: null,
          },
        }),
      })

      const instagramInput = screen.getByPlaceholderText("Instagram handle")

      fireEvent.change(instagramInput, {
        target: { value: "invalid@handle" },
      })
      fireEvent.blur(instagramInput)

      await waitFor(() => {
        expect(
          screen.getByText(
            "Instagram handle can only contain letters, numbers, underscores, and periods",
          ),
        ).toBeInTheDocument()
      })

      const saveButton = screen.getByText("Save")
      fireEvent.click(saveButton)

      await waitFor(() => {
        expect(mockSendToast).toHaveBeenCalledWith({
          variant: "error",
          message: "Please fix the errors in the form",
          description:
            "Instagram handle can only contain letters, numbers, underscores, and periods",
        })
      })

      // Should not call the mutation when there are validation errors
      expect(mockSubmitUpdateMyUserProfile).not.toHaveBeenCalled()
    })
  })

  describe("ID verification", () => {
    it("renders the component with correct links", async () => {
      renderWithRelay()

      expect(screen.getByText("Verify Your ID")).toBeInTheDocument()
      const faqLink = screen.getByText("FAQs")
      expect(faqLink).toHaveAttribute(
        "href",
        expect.stringContaining("/identity-verification-faq"),
      )
      const mailLink = screen.getByText("verification@artsy.net")
      expect(mailLink).toHaveAttribute(
        "href",
        expect.stringContaining("mailto:verification@artsy.net"),
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
          }),
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
          }),
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
          "Secure your account and receive updates about your transactions on Artsy.",
        ),
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
          }),
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
          }),
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
