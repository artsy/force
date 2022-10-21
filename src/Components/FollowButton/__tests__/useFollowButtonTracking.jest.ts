import { ContextModule, OwnerType } from "@artsy/cohesion"
import { act, renderHook } from "@testing-library/react-hooks"
import { useTracking } from "react-tracking"
import { useFollowButtonTracking } from "Components/FollowButton/useFollowButtonTracking"

jest.mock("react-tracking")

const mockuseTracking = useTracking as jest.Mock
const trackingSpy = jest.fn()

beforeAll(() => {
  mockuseTracking.mockImplementation(() => ({
    trackEvent: trackingSpy,
  }))
})

const OWNER_IS_ALREADY_FOLLOWED = true
const OWNER_IS_NOT_ALREADY_FOLLOWED = false

describe("trackEvent", () => {
  it("sends correct FollowArtist payloads", () => {
    const { result } = renderHook(() =>
      useFollowButtonTracking({
        ownerType: OwnerType.artist,
        ownerId: "artistId",
        ownerSlug: "artistSlug",
        contextModule: ContextModule.artistHeader,
      })
    )

    act(() => {
      result.current.trackFollow(OWNER_IS_NOT_ALREADY_FOLLOWED)
    })

    expect(trackingSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        action: "followedArtist",
        owner_id: "artistId",
        owner_slug: "artistSlug",
        owner_type: "artist",
      })
    )

    act(() => {
      result.current.trackFollow(OWNER_IS_ALREADY_FOLLOWED)
    })

    expect(trackingSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        action: "unfollowedArtist",
        owner_id: "artistId",
        owner_slug: "artistSlug",
        owner_type: "artist",
      })
    )
  })

  it("sends correct FollowGene payloads", () => {
    const { result } = renderHook(() =>
      useFollowButtonTracking({
        ownerType: OwnerType.gene,
        ownerId: "geneId",
        ownerSlug: "geneSlug",
        contextModule: ContextModule.geneHeader,
      })
    )

    act(() => {
      result.current.trackFollow(OWNER_IS_NOT_ALREADY_FOLLOWED)
    })

    expect(trackingSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        action: "followedGene",
        owner_id: "geneId",
        owner_slug: "geneSlug",
        owner_type: "gene",
      })
    )

    act(() => {
      result.current.trackFollow(OWNER_IS_ALREADY_FOLLOWED)
    })

    expect(trackingSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        action: "unfollowedGene",
        owner_id: "geneId",
        owner_slug: "geneSlug",
        owner_type: "gene",
      })
    )
  })

  it("sends correct FollowProfile payloads", () => {
    const { result } = renderHook(() =>
      useFollowButtonTracking({
        ownerType: OwnerType.profile,
        ownerId: "profileId",
        ownerSlug: "profileSlug",
        contextModule: ContextModule.partnerHeader,
      })
    )

    act(() => {
      result.current.trackFollow(OWNER_IS_NOT_ALREADY_FOLLOWED)
    })

    expect(trackingSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        action: "followedPartner",
        owner_id: "profileId",
        owner_slug: "profileSlug",
        owner_type: "partner",
      })
    )

    act(() => {
      result.current.trackFollow(OWNER_IS_ALREADY_FOLLOWED)
    })

    expect(trackingSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        action: "unfollowedPartner",
        owner_id: "profileId",
        owner_slug: "profileSlug",
        owner_type: "partner",
      })
    )
  })
})
