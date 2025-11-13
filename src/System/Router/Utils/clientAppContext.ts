// biome-ignore lint/style/noRestrictedImports: Client context initialization
import { data as sd } from "sharify"

export interface ClientContext {
  user: User
}

export const getClientAppContext = (
  context: { injectedData?: object } = {}
): ClientContext => {
  return {
    user: sd.CURRENT_USER,
    ...context,
  }
}
