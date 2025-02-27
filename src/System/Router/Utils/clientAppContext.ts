// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

export interface ClientContext {
  user: User
}

export const getClientAppContext = (
  context: { injectedData?: object } = {},
): ClientContext => {
  return {
    user: sd.CURRENT_USER,
    ...context,
  }
}
