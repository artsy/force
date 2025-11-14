import { renderHook } from "@testing-library/react-hooks"
import { useEditProfileTracking } from "Apps/Settings/Routes/EditProfile/Hooks/useEditProfileTracking"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("useEditProfileTracking", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  const setupHook = () => {
    const { result } = renderHook(() => useEditProfileTracking())

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

  it("#editedUserProfile", () => {
    setupHook().editedUserProfile()

    expect(trackingSpy).toBeCalledWith({
      action: "editedUserProfile",
      context_screen: "collectorProfile",
      context_screen_owner_type: "editProfile",
      platform: "web",
    })
  })
})
