import { OwnerType } from "@artsy/cohesion"
import { renderHook } from "@testing-library/react-hooks"
import { useTracking } from "react-tracking"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"

jest.mock("react-tracking")

describe("useMyCollectionTracking", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  const setupHook = () => {
    const { result } = renderHook(() => useMyCollectionTracking())

    if (result.error) {
      throw result.error
    }

    const tracking = result.current
    return tracking
  }

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent: trackingSpy }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("#addCollectedArtwork", () => {
    it("tracks without specifying owner type", () => {
      setupHook().addCollectedArtwork()

      expect(trackingSpy).toBeCalledWith({
        action: "addCollectedArtwork",
        context_module: "myCollectionHome",
        context_owner_type: "myCollection",
        platform: "web",
      })
    })

    it("track with specific owner type", () => {
      setupHook().addCollectedArtwork(OwnerType.myCollectionInsights)

      expect(trackingSpy).toBeCalledWith({
        action: "addCollectedArtwork",
        context_module: "myCollectionHome",
        context_owner_type: "myCollectionInsights",
        platform: "web",
      })
    })
  })

  it("#deleteCollectedArtwork", () => {
    setupHook().deleteCollectedArtwork("artwork-id", "artwork-slug")

    expect(trackingSpy).toBeCalledWith({
      action: "deleteCollectedArtwork",
      context_module: "myCollectionArtwork",
      context_owner_type: "myCollectionArtwork",
      context_owner_id: "artwork-id",
      context_owner_slug: "artwork-slug",
      platform: "web",
    })
  })

  it("#editCollectedArtwork", () => {
    setupHook().editCollectedArtwork("artwork-id", "artwork-slug")

    expect(trackingSpy).toBeCalledWith({
      action: "editCollectedArtwork",
      context_module: "myCollectionArtwork",
      context_owner_id: "artwork-id",
      context_owner_slug: "artwork-slug",
      context_owner_type: "myCollectionArtwork",
      platform: "web",
    })
  })

  it("#saveCollectedArtwork", () => {
    setupHook().saveCollectedArtwork("artist-id", true)

    expect(trackingSpy).toBeCalledWith({
      action: "saveCollectedArtwork",
      context_module: "myCollectionHome",
      context_owner_type: "myCollection",
      artist_id: "artist-id",
      is_p1_artist: true,
      platform: "web",
    })
  })
})
