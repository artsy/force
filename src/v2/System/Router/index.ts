import { RelaySSREnvironment } from "v2/System/Relay/createRelaySSREnvironment"
import { FarceCreateRouterArgs } from "found"
import { SystemContextProps } from "../SystemContext"
import { AppRouteConfig } from "./Route"

export { Link } from "found"
export { Boot } from "../Boot"
export { SystemContextProvider, SystemContextConsumer } from "v2/System"

export interface RouterConfig {
  /** Context values to be passed to SystemContext */
  context?: SystemContextProps & { relayEnvironment?: RelaySSREnvironment }

  /** Configuration options to be passed to Found router */
  history?: {
    protocol?: "browser" | "hash" | "memory"
    options?: FarceCreateRouterArgs["historyOptions"]
  }

  initialRoute?: string
  routes: AppRouteConfig[]
  url?: string
}
