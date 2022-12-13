import { screen, fireEvent, waitFor } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { SettingsEditProfileFieldsFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileFields"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/Mutations/useUpdateMyUserProfile")

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
  const mockSubmitUpdateMyUserProfile = jest.fn()

  beforeEach(() => {
    mockUseUpdateMyUserProfile.mockImplementation(() => ({
      submitUpdateMyUserProfile: mockSubmitUpdateMyUserProfile,
    }))
  })

  afterEach(() => {
    mockUseUpdateMyUserProfile.mockReset()
  })

  it("renders the image sectio", () => {
    renderWithRelay()

    expect(screen.getByText("Choose an Image")).toBeInTheDocument()
  })

  it("renders the form", () => {
    renderWithRelay()

    expect(screen.getByText("Full name")).toBeInTheDocument()
    expect(screen.getByText("Primary Location")).toBeInTheDocument()
    expect(screen.getByText("Profession")).toBeInTheDocument()
    expect(screen.getByText("Other relevant positions")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })

  it("submits the form", async () => {
    renderWithRelay()

    fireEvent.change(screen.getByPlaceholderText("Full name"), {
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

    await waitFor(() => {
      screen.getByText("Save").click()
    })

    expect(mockSubmitUpdateMyUserProfile).toHaveBeenCalledWith({
      name: "Collector Name",
      location: {},
      profession: "Artist and Collector",
      otherRelevantPositions: "Positions",
      bio: "I collect",
    })
  })
})
