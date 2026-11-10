import {
  UNLEASH_API_URL,
  UNLEASH_APP_NAME,
  UNLEASH_ENVIRONMENT,
  UNLEASH_SERVER_KEY,
} from "Server/config"
import {
  type FeatureFlagsContext,
  getUnleashConfig,
  toFeatureFlagsContext,
} from "System/FeatureFlags/unleashClient"
import type { UnleashContext } from "System/FeatureFlags/unleashContext"
import { Unleash } from "unleash-client"
import {
  type IConfig,
  type IToggle,
  type IVariant,
  UnleashClient,
} from "unleash-proxy-client"

let unleashServer: Unleash | null = null

export function getOrInitUnleashServer(): Unleash {
  if (unleashServer) {
    return unleashServer
  }

  const config = {
    refreshInterval: 30000, // How often (in ms) the client should poll for updates
    url: UNLEASH_API_URL,
    appName: UNLEASH_APP_NAME,
    environment: UNLEASH_ENVIRONMENT,
    customHeaders: {
      Authorization: UNLEASH_SERVER_KEY,
    },
  }

  unleashServer = new Unleash(config)

  return unleashServer
}

const DISABLED_VARIANT: IVariant = {
  name: "disabled",
  enabled: false,
  feature_enabled: false,
}

/**
 * A proxy client for server rendering that evaluates each flag with the Node
 * SDK the first time it's read, then remembers the answer for the rest of the
 * request. Only flags the render reads are evaluated, so usage metrics reflect
 * real usage, and only those are serialized for the browser to hydrate with.
 */
class SSRUnleashClient extends UnleashClient {
  private evaluatedToggles = new Map<string, IToggle | null>()
  private evaluationContext: UnleashContext

  constructor(config: IConfig, evaluationContext: UnleashContext) {
    super(config)
    this.evaluationContext = evaluationContext
  }

  isEnabled(name: string): boolean {
    return !!this.evaluate(name)
  }

  getVariant(name: string): IVariant {
    return this.evaluate(name)?.variant ?? DISABLED_VARIANT
  }

  getAllToggles(): IToggle[] {
    return this.getEvaluatedToggles()
  }

  /** Enabled toggles read so far, in the shape the Frontend API returns */
  getEvaluatedToggles(): IToggle[] {
    return [...this.evaluatedToggles.values()].filter(
      (toggle): toggle is IToggle => !!toggle,
    )
  }

  private evaluate(name: string): IToggle | null {
    const cached = this.evaluatedToggles.get(name)
    if (cached !== undefined) return cached

    const unleash = getOrInitUnleashServer()
    const variant = unleash.getVariant(name, this.evaluationContext)

    const toggle: IToggle | null = variant.feature_enabled
      ? {
          name,
          enabled: true,
          impressionData:
            !!unleash.getFeatureToggleDefinition(name)?.impressionData,
          variant: {
            name: variant.name,
            enabled: variant.enabled,
            feature_enabled: true,
            ...(variant.payload ? { payload: variant.payload } : {}),
          },
        }
      : null

    this.evaluatedToggles.set(name, toggle)

    return toggle
  }
}

interface SSRFeatureFlags {
  context: FeatureFlagsContext
  /**
   * Toggles to bootstrap the browser with. Call only after rendering: flags are
   * evaluated as they're read, so anything read afterwards will be missing.
   * (This is why it doesn't work with `ENABLE_SSR_STREAMING`, which sends
   * sharify in the head before the body renders.)
   */
  getEvaluatedToggles: () => IToggle[]
}

export const createSSRFeatureFlags = (
  context: UnleashContext,
): SSRFeatureFlags => {
  const config = getUnleashConfig({ toggles: [], context })
  const client = new SSRUnleashClient(config, context)

  return {
    context: toFeatureFlagsContext({ client, config }),
    getEvaluatedToggles: () => client.getEvaluatedToggles(),
  }
}
