import { artAssistantRoutes } from "Apps/ArtAssistant/artAssistantRoutes"
import {
  ART_ASSISTANT_FLAG,
  useEnableArtAssistant,
} from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useFlag, useFlagsStatus } from "@unleash/proxy-client-react"
import { renderHook } from "@testing-library/react"
import { getOrInitUnleashClient } from "System/FeatureFlags/unleashClient"

jest.mock("System/Hooks/useSystemContext")
jest.mock("System/FeatureFlags/unleashClient")
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
  it("waits for cold flags before deciding access during initial route resolution", async () => {
    let ready: () => void = () => {}
    let enabled = false
    const off = jest.fn()
    ;(getOrInitUnleashClient as jest.Mock).mockReturnValue({
      isReady: () => false,
      once: (_event: string, listener: () => void) => {
        ready = listener
      },
      off,
    })
    const match = {
      context: {
        user: { id: "employee", accessToken: "token" },
        featureFlags: { isEnabled: () => enabled },
      },
    }
    const component = artAssistantRoutes[0].getComponent?.({} as any)
    expect(
      artAssistantRoutes[0].render?.({
        Component: null,
        props: {},
        match,
      } as any),
    ).toBeNull()
    enabled = true
    ready()
    expect(() =>
      artAssistantRoutes[0].render?.({
        Component: () => null,
        props: {},
        match,
      } as any),
    ).not.toThrow()
    await expect(component).resolves.toBeDefined()
    expect(off).toHaveBeenCalledWith("ready", ready)
  })
  it("does not grant access if flag loading times out", async () => {
    jest.useFakeTimers()
    const off = jest.fn()
    ;(getOrInitUnleashClient as jest.Mock).mockReturnValue({
      isReady: () => false,
      once: jest.fn(),
      off,
    })
    try {
      const component = artAssistantRoutes[0].getComponent?.({} as any)
      jest.advanceTimersByTime(3000)
      await expect(component).resolves.toBeDefined()
      expect(() =>
        artAssistantRoutes[0].render?.({
          Component: () => null,
          props: {},
          match: {
            context: {
              user: { id: "user", accessToken: "token" },
              featureFlags: { isEnabled: () => false },
            },
          },
        } as any),
      ).toThrow()
      expect(off).toHaveBeenCalled()
    } finally {
      jest.useRealTimers()
    }
  })
  it("uses the resolved router flag until the provider is ready", () => {
    ;(useSystemContext as jest.Mock).mockReturnValue({
      user: { id: "user", accessToken: "token" },
      featureFlags: { isEnabled: () => true },
    })
    ;(useFlag as jest.Mock).mockReturnValue(false)
    ;(useFlagsStatus as jest.Mock).mockReturnValue({ flagsReady: false })
    const { result, rerender } = renderHook(useEnableArtAssistant)
    expect(result.current).toBe(true)
    ;(useFlagsStatus as jest.Mock).mockReturnValue({ flagsReady: true })
    rerender()
    expect(result.current).toBe(false)
  })
})
