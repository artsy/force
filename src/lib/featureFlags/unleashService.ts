import { startUnleash, Unleash } from "unleash-client"
import { UNLEASH_API, UNLEASH_APP_NAME, UNLEASH_SERVER_KEY } from "../../config"
import { FeatureFlagService } from "./featureFlagService"

// Pass in as argument to registerFeatureFlagProvideder() when using unleash as feature flag service
export const UnleashService = Symbol("UnleashService")

// Class to instantiate Unleash client and set useful helper methods.
export class UnleashFeatureFlagService implements FeatureFlagService {
  private _unleash: Unleash | null = null

  constructor(
    private url = UNLEASH_API,
    private appName = UNLEASH_APP_NAME,
    private serverKey = UNLEASH_SERVER_KEY
  ) {}

  async init(): Promise<void> {
    if (this._unleash !== null) {
      throw new Error("UnleashFlagService has already been initialized.")
    }

    this._unleash = await startUnleash({
      url: this.url,
      appName: this.appName,
      refreshInterval: 60000,
      customHeaders: {
        Authorization: this.serverKey,
      },
    })
  }

  getFeatures() {
    return this.unleash.getFeatureToggleDefinitions().map(flag => flag.name)
  }

  enabled(name: string, context?: any) {
    return this.unleash.isEnabled(name, context)
  }

  private get unleash() {
    if (this._unleash === null) {
      throw new Error("UnleashFlagService has not been initialized.")
    }
    return this._unleash
  }
}
