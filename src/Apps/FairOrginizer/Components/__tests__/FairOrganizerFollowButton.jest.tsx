import { FairOrganizerFollowButtonFragmentContainer } from "Apps/FairOrginizer/Components/FairOrganizerFollowButton"
import { fairOrganizerFollowMutation } from "Apps/FairOrginizer/Mutations/FairOrganizerFollowMutation"
import { useAuthDialog } from "Components/AuthDialog"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { FairOrganizerFollowButtonTestQuery } from "__generated__/FairOrganizerFollowButtonTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
jest.mock("Apps/FairOrginizer/Mutations/FairOrganizerFollowMutation")
jest.mock("Components/AuthDialog/useAuthDialog")

describe("FairOrganizerFollowButton", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<FairOrganizerFollowButtonTestQuery>({
      Component: ({ fairOrganizer }) => (
        <FairOrganizerFollowButtonFragmentContainer
          fairOrganizer={fairOrganizer!}
        />
      ),
      query: graphql`
        query FairOrganizerFollowButtonTestQuery($id: String!)
        @relay_test_operation {
          fairOrganizer(id: $id) {
            ...FairOrganizerFollowButton_fairOrganizer
          }
        }
      `,
      variables: { id: "fair" },
    })

  const mockUseSystemContext = useSystemContext as jest.Mock
  const mockFairOrganizerFollowMutation =
    fairOrganizerFollowMutation as jest.Mock
  const mockUseAuthDialog = useAuthDialog as jest.Mock

  beforeAll(() => {
    mockUseSystemContext.mockImplementation(() => ({
      user: jest.fn(),
    }))

    mockUseAuthDialog.mockImplementation(() => ({
      showAuthDialog: jest.fn(),
    }))
  })

  it("renders correctly", () => {
    renderWithRelay({
      Profile: () => ({
        isFollowed: false,
      }),
    })

    expect(screen.getByText("Follow")).toBeInTheDocument()
  })

  it("toggles following label", () => {
    renderWithRelay({
      Profile: () => ({
        isFollowed: true,
      }),
    })

    expect(screen.getByText("Following")).toBeInTheDocument()
  })

  it("unauthenticated users trigger auth modal on click", () => {
    mockUseSystemContext.mockImplementation(() => ({ user: null }))

    const showAuthDialog = jest.fn()

    mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

    renderWithRelay({
      FairOrganizer: () => ({
        internalID: "fairOrganizerInternalID",
        name: "fairOrganizerName",
        slug: "faiOrganizerSlug",
      }),
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(showAuthDialog).toHaveBeenCalledWith({
      analytics: {
        contextModule: "fairOrganizerHeader",
        intent: "followPartner",
      },
      options: {
        afterAuthAction: {
          action: "follow",
          kind: "profile",
          objectId: "faiOrganizerSlug",
        },
        title: expect.any(String),
      },
    })
  })

  it("authenticated users trigger follow mutation on click", () => {
    mockUseSystemContext.mockImplementation(() => ({
      relayEnvironment: "relayEnvironment",
      user: "user",
    }))

    renderWithRelay({
      Profile: () => ({
        id: "profileId",
        internalID: "profileInternalID",
        isFollowed: false,
      }),
    })

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(mockFairOrganizerFollowMutation).toHaveBeenCalledWith(
      "relayEnvironment",
      {
        id: "profileId",
        profileID: "profileInternalID",
        isFollowed: false,
      },
    )
  })
})
