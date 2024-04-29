import { SystemContextProps } from "System/SystemContext"
import { AppRouteConfig } from "./Route"
import { FeatureFlags } from "Server/featureFlags/featureFlagService"
import { Environment } from "react-relay"
import { HistoryEnhancerOptions } from "farce"

/**
 * Configuration used when creating a new Router app
 */
export interface RouterConfig {
  /**
   * Context values to be passed to ArtsyContext
   */
  context?: SystemContextProps & { relayEnvironment?: Environment }

  /**
   * Configuration options to be passed to Found router
   */
  history?: {
    /**
     * Defines the type of history to use, depending on router environment.
     */
    protocol?: "browser" | "hash" | "memory"

    options?: HistoryEnhancerOptions
  }

  /**
   * Initial route for router on boot
   */
  initialRoute?: string

  /**
   * Array of routes to be passed to Found
   */
  routes: AppRouteConfig[]

  /**
   * Feature flags
   */
  featureFlags?: FeatureFlags

  /**
   * URL passed from server
   */
  url?: string
}
