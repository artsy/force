import { artAssistantRoutes } from "Apps/ArtAssistant/artAssistantRoutes"
import {
  ART_ASSISTANT_FLAG,
  useEnableArtAssistant,
} from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useFlag } from "@unleash/proxy-client-react"
import { renderHook } from "@testing-library/react"

jest.mock("System/Hooks/useSystemContext")
jest.mock("Apps/ArtAssistant/ArtAssistantApp", () => ({
  ArtAssistantApp: () => null,
}))

describe("Art Assistant access", () => {
  it("uses the fullscreen layout without site navigation", () => {
    expect(artAssistantRoutes[0].layout).toBe("Blank")
  })
  it.each([
    { user: null, enabled: true },
    { user: { id: "user", accessToken: "token" }, enabled: false },
  ])("denies a direct URL when access is unavailable", ({ user, enabled }) => {
    expect(() =>
      artAssistantRoutes[0].render?.({
        Component: () => null,
        props: {},
        match: {
          context: { user, featureFlags: { isEnabled: () => enabled } },
        },
      } as any),
    ).toThrow()
  })
  it("checks the named flag for an authenticated direct URL", () => {
    const isEnabled = jest.fn(() => true)
    artAssistantRoutes[0].render?.({
      Component: () => null,
      props: {},
      match: {
        context: {
          user: { id: "user", accessToken: "token" },
          featureFlags: { isEnabled },
        },
      },
    } as any)
    expect(isEnabled).toHaveBeenCalledWith(ART_ASSISTANT_FLAG)
  })
  it("requires an authenticated user and the enabled flag", () => {
    ;(useSystemContext as jest.Mock).mockReturnValue({
      user: { id: "user", accessToken: "token" },
    })
    ;(useFlag as jest.Mock).mockReturnValue(true)
    const { result, rerender } = renderHook(useEnableArtAssistant)
    expect(result.current).toBe(true)
    ;(useFlag as jest.Mock).mockReturnValue(false)
    rerender()
    expect(result.current).toBe(false)
    ;(useFlag as jest.Mock).mockReturnValue(true)
    ;(useSystemContext as jest.Mock).mockReturnValue({ user: null })
    rerender()
    expect(result.current).toBe(false)
  })
})
