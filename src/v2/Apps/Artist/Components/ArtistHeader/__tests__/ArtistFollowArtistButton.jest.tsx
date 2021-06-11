import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistFollowArtistButton_Test_Query } from "v2/__generated__/ArtistFollowArtistButton_Test_Query.graphql"
import { useTracking } from "react-tracking"
import { ArtistFollowArtistButtonFragmentContainer } from "../ArtistFollowArtistButton"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { useSystemContext } from "v2/System/useSystemContext"
import { followArtistMutation } from "../Mutations/FollowArtistMutation"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/Utils/openAuthModal")
jest.mock("v2/System/useSystemContext")
jest.mock(
  "v2/Apps/Artist/Components/ArtistHeader/Mutations/FollowArtistMutation"
)

describe("ArtistFollowArtist", () => {
  const { getWrapper } = setupTestWrapper<ArtistFollowArtistButton_Test_Query>({
    Component: ArtistFollowArtistButtonFragmentContainer,
    query: graphql`
      query ArtistFollowArtistButton_Test_Query {
        artist(id: "example") {
          ...ArtistFollowArtistButton_artist
        }
      }
    `,
  })

  const mockuseSystemContext = useSystemContext as jest.Mock
  const mockopenAuthToFollowSave = openAuthToFollowSave as jest.Mock
  const mockfollowArtistMutation = followArtistMutation as jest.Mock
  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeEach(() => {
    mockuseSystemContext.mockImplementation(() => ({
      mediator: jest.fn(),
      user: jest.fn(),
    }))
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        isFollowed: false,
      }),
    })

    expect(wrapper.text()).toContain("Follow")
  })

  it("toggles following label", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        isFollowed: true,
      }),
    })

    expect(wrapper.text()).toContain("Following")
  })

  it("unauthenticated users trigger auth modal on click", () => {
    mockuseSystemContext.mockImplementation(() => ({
      mediator: "mediator",
      user: null,
    }))

    const wrapper = getWrapper({
      Artist: () => ({
        internalID: "artistInternalID",
        name: "artistName",
        slug: "artistSlug",
        isFollowed: true,
      }),
    })
    wrapper.simulate("click")
    expect(mockopenAuthToFollowSave).toHaveBeenCalledWith("mediator", {
      contextModule: "artistHeader",
      entity: { name: "artistName", slug: "artistSlug" },
      intent: "followArtist",
    })
  })

  it("authenticated users trigger follow mutation on click", () => {
    mockuseSystemContext.mockImplementation(() => ({
      mediator: "mediator",
      relayEnvironment: "relayEnvironment",
      user: "user",
    }))

    const wrapper = getWrapper({
      Artist: () => ({
        internalID: "artistInternalID",
        name: "artistName",
        slug: "artistSlug",
        isFollowed: true,
      }),
    })
    wrapper.simulate("click")
    expect(mockfollowArtistMutation).toHaveBeenCalledWith(
      "relayEnvironment",
      "artistInternalID",
      true
    )
  })

  it("tracks correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        internalID: "artistInternalID",
        name: "artistName",
        slug: "artistSlug",
        isFollowed: true,
      }),
    })
    wrapper.simulate("click")
    expect(trackingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "unfollowedArtist",
        context_module: "artistHeader",
        owner_id: "artistInternalID",
        owner_slug: "artistSlug",
        owner_type: "artist",
      })
    )
  })
})
