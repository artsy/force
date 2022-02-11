import { startUnleash, Unleash } from "unleash-client"
import {
  UNLEASH_API,
  UNLEASH_APP_NAME,
  UNLEASH_INSTANCE_ID,
  UNLEASH_SERVER_KEY,
} from "../../config"
import {
  FeatureFlagConfig,
  FeatureFlagProvider,
} from "./featureFlagProviderShared"

// Pass in as argument to registerFeatureFlagProvideder() when using unleash as feature flag service
export const UnleashProvider = Symbol("UnleashProvider")

// Override the default config set in constructor of UnleashFeatureFlagProvider class
export class UnleashProviderConfig implements FeatureFlagConfig {
  constructor(
    private _url: string,
    private _appName: string,
    private _instanceId: string,
    private _serverKey: string
  ) {}

  [Symbol.iterator] = function* (): Iterator<string> {
    yield this.url
    yield this.appName
    yield this.instanceId
    yield this.serverKey
  }

  get url() {
    return this._url
  }

  get appname() {
    return this._appName
  }

  get instanceId() {
    return this._instanceId
  }

  get serverKey() {
    return this._serverKey
  }
}

// Class to instantiate Unleash client and set useful helper methods.
export class UnleashFeatureFlagProvider implements FeatureFlagProvider {
  private _unleash: Unleash | null = null

  constructor(
    private url = UNLEASH_API,
    private appName = UNLEASH_APP_NAME,
    private instanceId = UNLEASH_INSTANCE_ID,
    private serverKey = UNLEASH_SERVER_KEY
  ) {}

  async init(): Promise<void> {
    if (this._unleash !== null) {
      throw new Error("UnleashFlagProvider has already been initialized.")
    }

    this._unleash = await startUnleash({
      url: this.url,
      appName: this.appName,
      instanceId: this.instanceId,
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
      throw new Error("UnleashFlagProvider has not been initialized.")
    }
    return this._unleash
  }
}
