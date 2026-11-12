import { getUnleashContext } from "System/FeatureFlags/unleashContext"
import { getENV } from "Utils/getENV"
import {
  EVENTS,
  type IConfig,
  type IMutableContext,
  type IToggle,
  type IVariant,
  InMemoryStorageProvider,
  UnleashClient,
} from "unleash-proxy-client"

export interface FeatureFlags {
  isEnabled: (flag: string) => boolean
  getVariant: (flag: string) => IVariant
}

export interface UnleashBootstrap {
  client: UnleashClient
  config: IConfig
}

export interface FeatureFlagsContext {
  featureFlags: FeatureFlags
  unleash: UnleashBootstrap
}

interface GetUnleashConfigParams {
  toggles: IToggle[]
  context: IMutableContext
}

export const getUnleashConfig = ({
  toggles,
  context,
}: GetUnleashConfigParams): IConfig => {
  const isServer = typeof window === "undefined"

  return {
    url: `${getENV("UNLEASH_API_URL")}/frontend`,
    clientKey: getENV("UNLEASH_FRONTEND_KEY"),
    appName: getENV("UNLEASH_APP_NAME"),
    environment: getENV("UNLEASH_ENVIRONMENT"),
    refreshInterval: 30, // How often (in seconds) the client should poll for updates
    context,
    bootstrap: toggles,
    bootstrapOverride: true,
    // With the default local storage, an empty bootstrap lets toggles cached by
    // an earlier visit win over the server's answer during hydration.
    storageProvider: new InMemoryStorageProvider(),
    ...(isServer
      ? {
          // The server-side client is never started. These stop the SDK from
          // complaining when `fetch` isn't available (production disables it).
          disableRefresh: true,
          disableMetrics: true,
          fetch: () =>
            Promise.reject(new Error("Unleash should not fetch on the server")),
          createAbortController: () => null,
        }
      : {}),
  }
}

/**
 * The same client backs both the router (`featureFlags`, for route-level
 * decisions) and the React hooks (`FeatureFlagProvider`), so that route
 * resolution and rendering always agree.
 */
export const toFeatureFlagsContext = ({
  client,
  config,
}: UnleashBootstrap): FeatureFlagsContext => {
  return {
    featureFlags: {
      isEnabled: flag => client.isEnabled(flag),
      getVariant: flag => client.getVariant(flag),
    },
    unleash: { client, config },
  }
}

/**
 * Creates a proxy client seeded with toggles the server evaluated while
 * rendering, so that during hydration every flag read returns the server's
 * answer. The browser client starts polling the Frontend API only after
 * hydration (the provider starts it in an effect), so updates arrive as
 * ordinary re-renders.
 */
export const createFeatureFlagsContext = (
  params: GetUnleashConfigParams,
): FeatureFlagsContext => {
  const config = getUnleashConfig(params)

  return toFeatureFlagsContext({ client: new UnleashClient(config), config })
}

/**
 * Resolves once the client has finished its async startup (`init`).
 *
 * The SDK starts `init` in its constructor. Partway through, it replaces the
 * bootstrapped toggles with whatever is in storage (nothing, with in-memory
 * storage) and only restores the bootstrap a few microtasks later. Reading a
 * flag in that window returns `false`. Call this in the same tick the client
 * is created, so the listener is attached before `init` finishes.
 */
const onceInitialized = (client: UnleashClient): Promise<void> => {
  return new Promise(resolve => {
    const done = () => {
      client.off(EVENTS.INIT, done)
      client.off(EVENTS.ERROR, done)
      resolve()
    }

    client.on(EVENTS.INIT, done)
    // `init` emits ERROR instead of INIT when it fails
    client.on(EVENTS.ERROR, done)
  })
}

let browserFeatureFlagsContext: Promise<FeatureFlagsContext> | null = null

/**
 * The browser's single feature flag client, bootstrapped from the toggles the
 * server serialized into sharify. Resolves once the client has started up, so
 * the router never reads flags during the SDK's startup window.
 */
export const initBrowserFeatureFlagsContext =
  (): Promise<FeatureFlagsContext> => {
    if (browserFeatureFlagsContext) {
      return browserFeatureFlagsContext
    }

    const context = createFeatureFlagsContext({
      toggles: getENV("UNLEASH_TOGGLES") ?? [],
      context: getUnleashContext({
        user: getENV("CURRENT_USER"),
        sessionId: getENV("SESSION_ID"),
      }),
    })

    browserFeatureFlagsContext = onceInitialized(context.unleash.client).then(
      () => {
        return context
      },
    )

    return browserFeatureFlagsContext
  }
