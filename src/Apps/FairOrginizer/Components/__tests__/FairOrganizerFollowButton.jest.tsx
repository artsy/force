import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { FairOrganizerFollowButton_Test_Query } from "__generated__/FairOrganizerFollowButton_Test_Query.graphql"
import { FairOrganizerFollowButtonFragmentContainer } from "Apps/FairOrginizer/Components/FairOrganizerFollowButton"
import { openAuthToSatisfyIntent } from "Utils/openAuthModal"
import { useSystemContext } from "System/useSystemContext"
import { fairOrganizerFollowMutation } from "Apps/FairOrginizer/Mutations/FairOrganizerFollowMutation"

jest.unmock("react-relay")
jest.mock("Utils/openAuthModal")
jest.mock("System/useSystemContext")
jest.mock("Apps/FairOrginizer/Mutations/FairOrganizerFollowMutation.ts")

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
  const mockOpenAuthToSatisfyIntent = openAuthToSatisfyIntent as jest.Mock
  const mockFairOrganizerFollowMutation = fairOrganizerFollowMutation as jest.Mock

  beforeAll(() => {
    mockUseSystemContext.mockImplementation(() => ({
      mediator: jest.fn(),
      user: jest.fn(),
    }))
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Profile: () => ({
        isFollowed: false,
      }),
    })

    expect(wrapper.text()).toContain("Follow")
  })

  it("toggles following label", () => {
    const wrapper = getWrapper({
      Profile: () => ({
        isFollowed: true,
      }),
    })

    expect(wrapper.text()).toContain("Following")
  })

  it("unauthenticated users trigger auth modal on click", () => {
    mockUseSystemContext.mockImplementation(() => ({
      mediator: "mediator",
      user: null,
    }))

    const wrapper = getWrapper({
      FairOrganizer: () => ({
        internalID: "fairOrganizerInternalID",
        name: "fairOrganizerName",
        slug: "faiOrganizerSlug",
      }),
    })
    wrapper.simulate("click")

    expect(mockOpenAuthToSatisfyIntent).toHaveBeenCalledWith("mediator", {
      contextModule: "fairOrganizerHeader",
      entity: { name: "fairOrganizerName", slug: "faiOrganizerSlug" },
      intent: "followPartner",
    })
  })

  it("authenticated users trigger follow mutation on click", () => {
    mockUseSystemContext.mockImplementation(() => ({
      mediator: "mediator",
      relayEnvironment: "relayEnvironment",
      user: "user",
    }))

    const wrapper = getWrapper({
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
