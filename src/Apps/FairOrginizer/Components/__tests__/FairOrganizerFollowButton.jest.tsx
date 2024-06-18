import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { FairOrganizerFollowButton_Test_Query } from "__generated__/FairOrganizerFollowButton_Test_Query.graphql"
import { FairOrganizerFollowButtonFragmentContainer } from "Apps/FairOrginizer/Components/FairOrganizerFollowButton"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { fairOrganizerFollowMutation } from "Apps/FairOrginizer/Mutations/FairOrganizerFollowMutation"
import { useAuthDialog } from "Components/AuthDialog"

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext")
jest.mock("Apps/FairOrginizer/Mutations/FairOrganizerFollowMutation")
jest.mock("Components/AuthDialog/useAuthDialog")

describe("FairOrganizerFollowButton", () => {
  const { getWrapper } = setupTestWrapper<FairOrganizerFollowButton_Test_Query>(
    {
      Component: FairOrganizerFollowButtonFragmentContainer,
      query: graphql`
        query FairOrganizerFollowButton_Test_Query($id: String!)
          @relay_test_operation {
          fairOrganizer(id: $id) {
            ...FairOrganizerFollowButton_fairOrganizer
          }
        }
      `,
      variables: { id: "fair" },
    }
  )

  const mockUseSystemContext = useSystemContext as jest.Mock
  const mockFairOrganizerFollowMutation = fairOrganizerFollowMutation as jest.Mock
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
    const { wrapper } = getWrapper({
      Profile: () => ({
        isFollowed: false,
      }),
    })

    expect(wrapper.text()).toContain("Follow")
  })

  it("toggles following label", () => {
    const { wrapper } = getWrapper({
      Profile: () => ({
        isFollowed: true,
      }),
    })

    expect(wrapper.text()).toContain("Following")
  })

  it("unauthenticated users trigger auth modal on click", () => {
    mockUseSystemContext.mockImplementation(() => ({ user: null }))

    const showAuthDialog = jest.fn()

    mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

    const { wrapper } = getWrapper({
      FairOrganizer: () => ({
        internalID: "fairOrganizerInternalID",
        name: "fairOrganizerName",
        slug: "faiOrganizerSlug",
      }),
    })
    wrapper.simulate("click")

    expect(showAuthDialog).toHaveBeenCalledWith({
      analytics: {
        contextModule: "fairOrganizerHeader",
        intent: "followPartner",
      },
      mode: "SignUp",
      options: {
        afterAuthAction: {
          action: "follow",
          kind: "profile",
          objectId: "faiOrganizerSlug",
        },
        title: expect.any(Function),
      },
    })
  })

  it("authenticated users trigger follow mutation on click", () => {
    mockUseSystemContext.mockImplementation(() => ({
      relayEnvironment: "relayEnvironment",
      user: "user",
    }))

    const { wrapper } = getWrapper({
      Profile: () => ({
        id: "profileId",
        internalID: "profileInternalID",
        isFollowed: false,
      }),
    })

    wrapper.simulate("click")

    expect(mockFairOrganizerFollowMutation).toHaveBeenCalledWith(
      "relayEnvironment",
      {
        id: "profileId",
        profileID: "profileInternalID",
        isFollowed: false,
      }
    )
  })
})
