import { act } from "@testing-library/react"
import {
  useFlag,
  useFlagsStatus,
  useVariant,
} from "@unleash/proxy-client-react"
import { FeatureFlagProvider } from "System/FeatureFlags/FeatureFlagContext"
import {
  type FeatureFlagsContext,
  createFeatureFlagsContext,
  initBrowserFeatureFlagsContext,
} from "System/FeatureFlags/unleashClient"
import { createSSRFeatureFlags } from "System/FeatureFlags/unleashServer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"
import type { IToggle } from "unleash-proxy-client"

jest.unmock("@unleash/proxy-client-react")
jest.unmock("System/FeatureFlags/FeatureFlagContext.tsx")
jest.mock("System/Hooks/useSystemContext")
jest.mock("Server/config", () => ({}))

const mockGetVariant = jest.fn()
const mockGetFeatureToggleDefinition = jest.fn()

jest.mock("unleash-client", () => ({
  Unleash: jest.fn(() => ({
    getVariant: mockGetVariant,
    getFeatureToggleDefinition: mockGetFeatureToggleDefinition,
  })),
}))
jest.mock("Utils/getENV", () => ({
  getENV: (key: string) => {
    if (key === "UNLEASH_TOGGLES") return mockBrowserToggles()

    return {
      UNLEASH_API_URL: "https://unleash.example.test/api",
      UNLEASH_FRONTEND_KEY: "test-frontend-key",
      UNLEASH_APP_NAME: "force-test",
      UNLEASH_ENVIRONMENT: "test",
    }[key]
  },
}))

// Read lazily, since `jest.mock` factories are hoisted above `TOGGLES`
const mockBrowserToggles = () => {
  return TOGGLES
}

const TOGGLES: IToggle[] = [
  {
    name: "example-enabled-flag",
    enabled: true,
    impressionData: false,
    variant: { name: "experiment", enabled: true, feature_enabled: true },
  },
]

const Flags = () => {
  const isEnabled = useFlag("example-enabled-flag")
  const isMissingEnabled = useFlag("example-missing-flag")
  const variant = useVariant("example-enabled-flag")
  const { flagsReady } = useFlagsStatus()

  return (
    <div>
      enabled:{String(isEnabled)} missing:{String(isMissingEnabled)} variant:
      {variant.name} ready:{String(flagsReady)}
    </div>
  )
}

const renderWithContext = (context: FeatureFlagsContext) => {
  ;(useSystemContext as jest.Mock).mockReturnValue(context)

  return (
    <FeatureFlagProvider>
      <Flags />
    </FeatureFlagProvider>
  )
}

describe("FeatureFlagProvider", () => {
  beforeEach(() => {
    mockGetVariant.mockReset().mockImplementation((name: string) => {
      if (name === "example-enabled-flag") {
        return { name: "experiment", enabled: true, feature_enabled: true }
      }
      return { name: "disabled", enabled: false, feature_enabled: false }
    })
    mockGetFeatureToggleDefinition.mockReturnValue({ impressionData: false })
    // The browser client starts polling after hydration; keep it pending.
    global.fetch = jest.fn(() => new Promise(() => {})) as any
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it("evaluates only the flags a server render reads", () => {
    const ssr = createSSRFeatureFlags({ userId: "example-user" })
    const html = renderToString(renderWithContext(ssr.context))

    expect(html).toContain("enabled:<!-- -->true")
    expect(html).toContain("missing:<!-- -->false")
    expect(html).toContain("experiment")
    expect(html).toContain("ready:<!-- -->true")

    // Each flag is evaluated (and counted in usage metrics) once per request,
    // however many times it's read.
    expect(mockGetVariant.mock.calls.map(([name]) => name).sort()).toEqual([
      "example-enabled-flag",
      "example-missing-flag",
    ])
    expect(mockGetVariant).toHaveBeenCalledWith("example-enabled-flag", {
      userId: "example-user",
    })

    expect(ssr.getEvaluatedToggles()).toEqual(TOGGLES)
  })

  it("hydrates without mismatches, ignoring flags cached by an earlier visit", async () => {
    window.localStorage.setItem(
      "unleash:repository:repo",
      JSON.stringify([{ ...TOGGLES[0], enabled: false }]),
    )

    const ssr = createSSRFeatureFlags({})
    const container = document.createElement("div")
    container.innerHTML = renderToString(renderWithContext(ssr.context))
    const serverHTML = container.innerHTML

    const browserContext = createFeatureFlagsContext({
      toggles: ssr.getEvaluatedToggles(),
      context: {},
    })
    // Let the client finish its async init before hydrating, as it would
    // while the page's bundles load.
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    const onRecoverableError = jest.fn()

    await act(async () => {
      hydrateRoot(container, renderWithContext(browserContext), {
        onRecoverableError,
      })
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(container.innerHTML).toEqual(serverHTML)
  })

  it("ignores flags cached by an earlier visit when the server enabled none", async () => {
    window.localStorage.setItem(
      "unleash:repository:repo",
      JSON.stringify(TOGGLES),
    )

    const { featureFlags } = createFeatureFlagsContext({
      toggles: [],
      context: {},
    })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(featureFlags.isEnabled("example-enabled-flag")).toBe(false)
  })

  it("serves the bootstrap to the router as soon as the browser context is ready", async () => {
    const { featureFlags } = await initBrowserFeatureFlagsContext()

    // The SDK's async startup briefly drops the bootstrap. The router starts
    // immediately after this resolves, so every read from here on must see it.
    const reads = await Promise.all(
      Array.from({ length: 10 }, async (_, microtasks) => {
        await Array.from({ length: microtasks }).reduce<Promise<void>>(
          promise => {
            return promise.then(() => {})
          },
          Promise.resolve(),
        )

        return featureFlags.isEnabled("example-enabled-flag")
      }),
    )

    expect(reads).toEqual(Array(10).fill(true))
  })

  it("keeps the router context and hooks in agreement", () => {
    const context = createFeatureFlagsContext({
      toggles: TOGGLES,
      context: {},
    })
    const { featureFlags } = context

    const html = renderToString(renderWithContext(context))

    expect(featureFlags.isEnabled("example-enabled-flag")).toBe(true)
    expect(html).toContain("enabled:<!-- -->true")
    expect(featureFlags.getVariant("example-enabled-flag").name).toBe(
      "experiment",
    )
    expect(html).toContain("experiment")
    expect(featureFlags.isEnabled("example-missing-flag")).toBe(false)
    expect(html).toContain("missing:<!-- -->false")
  })
})
