import { screen, fireEvent, waitFor } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { SettingsEditProfileAboutYouFragmentContainer } from "../SettingsEditProfileAboutYou"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/Mutations/useUpdateMyUserProfile")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditProfileAboutYouFragmentContainer,
  query: graphql`
    query SettingsEditProfileAboutYou_Test_Query @relay_test_operation {
      me {
        ...SettingsEditProfileAboutYou_me
      }
    }
  `,
})

describe("SettingsEditProfileAboutYou", () => {
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

  it("renders the form", () => {
    renderWithRelay()

    expect(screen.getByText("Primary Location")).toBeInTheDocument()
    expect(screen.getByText("Profession")).toBeInTheDocument()
    expect(screen.getByText("Price Range")).toBeInTheDocument()
  })

  it("submits the form", async () => {
    renderWithRelay()

    fireEvent.change(screen.getByPlaceholderText("Profession"), {
      target: { name: "profession", value: "Artist" },
    })

    await waitFor(() => {
      screen.getByText("Save Changes").click()
    })

    expect(mockSubmitUpdateMyUserProfile).toHaveBeenCalledWith({
      priceRangeMax: 4.2,
      priceRangeMin: 4.2,
      profession: "Artist",
      shareFollows: false,
    })
  })
})
